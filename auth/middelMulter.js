const multer = require("multer");


const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, `./public/files/`)
    },
    filename: (req, file, cd) => {
        cd(null, file.originalname)
    }
})



upLoadfile = multer({ storage: storage })

module.exports = upLoadfile