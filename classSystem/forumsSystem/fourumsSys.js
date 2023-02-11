const furomsDb = require("../../db/forumsDB")
const Users = require("../../db/userDB")
const followDb = require('../../db/followDB')
const nodemailer = require('nodemailer')
class menuForum {
    constructor(id, domain) {
        this.id = id
        this.domain = domain
    }

    async getMess() {

        let result = await furomsDb.findAll({
            include: [{
                model: Users,
                attributes: ['firstName', 'img']
                // where: { id: fileDb.userId },
                // // required: false,
            }],
            order: [['id', 'DESC']],
            attributes: ['id', 'title', 'message', 'userId', 'createdAt', 'rating'],
            where: { domain: this.domain, parent: null },
        });
        let arrForThem = []
        for (let i in result) {
            arrForThem.push(result[i].dataValues)
        }

        return arrForThem
    }

    async CreateNewTheard(title, text) {

        try {
            let createMess = await furomsDb.create({
                title: title,
                message: text,
                userId: this.id,
                domain: this.domain
            })

            const getNameForCreated = await Users.findOne({
                where: { id: this.id },
                attributes: ['firstName']
            });

            this.getMyFollowers(getNameForCreated.dataValues.firstName)
            return true
        } catch {
            return false
        }

    }

    async getMyFollowers(name) {

        const checkIdInDb = await followDb.findAll({
            include: [{
                model: Users,
                attributes: ['email', 'firstName'],
            }],
            where: { followers: this.id },
            attributes: ['userId']
        });
        if (checkIdInDb === null) {
            return false
        } else {
            for (let i in checkIdInDb) {
                this.sendEmailToFollowers(checkIdInDb[i].dataValues,name)
            }
        }
    }

    async sendEmailToFollowers(information,name) {
        // information.User.dataValues.email
        // console.log(email);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'izhakisak770@gmail.com',
                pass: 'bfhodpublahcqadp'
            }
        });

        let html = ` Your follower named ${name} published a new post`

        const mailOptions = {
            from: 'izhakisak770@gmail.com',
            to: information.User.dataValues.email,
            subject: `Hellow ${information.User.dataValues.firstName} Your follower has uploaded a new post`,
            html: html
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    async lastTheard() {

        try {
            let result = await furomsDb.findOne({
                include: [{
                    model: Users,
                    attributes: ['firstName', 'img']
                    // where: { id: fileDb.userId },
                    // // required: false,
                }],
                order: [['id', 'DESC']],
                attributes: ['id', 'title', 'message', 'userId', 'createdAt'],
                where: { domain: this.domain },
            });
            let arrForThem = []
            arrForThem.push(result.dataValues)

            return arrForThem
        } catch {
            return 404
        }

    }

    async commentList(idParent) {

        let result = await furomsDb.findAll({
            include: [{
                model: Users,
                attributes: ['firstName', 'img']
                // where: { id: fileDb.userId },
                // // required: false,
            }],
            order: [['id', 'DESC']],
            attributes: ['id', 'message', 'userId', 'createdAt', 'rating'],
            where: { parent: idParent },
        });
        if (result.length == 0) {
            return 404
        } else {

            console.log(result);
            return result
        }

    }


    async CreateComment(idParent, text) {

        let createMess = await furomsDb.create({
            message: text,
            userId: this.id,
            parent: idParent,
            domain: this.domain
        })

        return true
    }


    async lastComment(idParent) {

        try {
            let result = await furomsDb.findOne({
                include: [{
                    model: Users,
                    attributes: ['firstName', 'img']
                    // where: { id: fileDb.userId },
                    // // required: false,
                }],
                order: [['id', 'DESC']],
                attributes: ['id', 'title', 'message', 'userId', 'createdAt'],
                where: { parent: idParent },
            });
            let arrForThem = []
            arrForThem.push(result.dataValues)

            return arrForThem
        } catch {
            return 404
        }

    }


}

module.exports = menuForum