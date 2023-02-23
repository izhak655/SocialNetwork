const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require("http");
const app = express();


const cors = require('cors');



const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const friendsRouter = require('./routes/friends')
const followRouter = require('./routes/follow')
const filesRouter = require('./routes/files')
const chatsRouter = require('./routes/chats')
const forumsRouter = require('./routes/forums')

const server = require('http').createServer(app);

const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

// const io = require("socket.io")(server, {

//   allowRequest: (req, callback) => {
//     const noOriginHeader = req.headers.origin;
//     callback(null, noOriginHeader);
//   },
//   origin: "*",
//   allowedHeaders: ["my-custom-header"],
//   credentials: true
// });

const io = require("socket.io")(server, {
  cors: {
    origin: "https://specialsocialnetwork.netlify.app",
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

io.on("connection", event => {
  console.log("connection SOCKET.IO")
  event.on('disconnect', () => {
    console.log("A use disconnected")
  })
});


(async () => {

  const userDB = require('./db/userDB')
  const friendsDB = require('./db/friendsDB')
  const followDB = require('./db/followDB')
  const filesDB = require('./db/filesDB')
  const forumsDB = require('./db/forumsDB')
  const chatsDB = require('./db/chatsDB')
  const conDataBase = require('./db/sql')

  await conDataBase.sync()

  userDB.hasOne(filesDB, {
    foreignKey: {
      name: 'userId'
    }
  });
  filesDB.belongsTo(userDB);

  userDB.hasOne(followDB, {
    foreignKey: {
      name: ['userId'],
      name: ['followers']
    }
  });
  followDB.belongsTo(userDB);

  userDB.hasMany(friendsDB, {
    foreignKey: {
      name: ['friendOne'],
      name: ['friendTwo']
    }
  });
  friendsDB.belongsTo(userDB);

  userDB.hasOne(chatsDB, {
    foreignKey: {
      name: 'userId'
    }
  });
  chatsDB.belongsTo(userDB);

  userDB.hasOne(forumsDB, {
    foreignKey: {
      name: 'userId'
    }
  });
  forumsDB.belongsTo(userDB);

})()

app.use(cors(corsOptions))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('Access-Control-Allow-Credentials', true);
app.set('Access-Control-Allow-Origin', '*');
app.set('Access-Control-Expose-Headers', '*')
// app.use(express.static(path.join(__dirname, "js")));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/public/files')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/friends', friendsRouter)
app.use('/follow', followRouter)
app.use('/files', filesRouter)
app.use('/chats', chatsRouter)
app.use('/forums', forumsRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = { app: app, server: server, io: io };
