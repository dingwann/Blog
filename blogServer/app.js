const createError = require('http-errors');
const logger = require('./utils/logger')
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { expressjwt: jwt } = require("express-jwt")
const uploadRouter = require('./routes/upload')
import secret from './secretkey'

// 路由接口
const usersRouter = require('./routes/users');
const articleRouter = require('./routes/articles')
const friendlinkRouter = require('./routes/friendlink')
const friendlinkcommentRouter = require('./routes/friendlinkcomment')
const messageRouter = require('./routes/message')
const messagecommentRouter = require('./routes/messagecomment')
const otherRouter = require('./routes/other')

const app = express();

if (process.env.NODE_ENV === 'development') {
  // 开发环境打印日志不保存
  app.use(logger.logger('dev'))
} else {
  // 生产环境
  app.use(logger.accessLog)
  app.use(logger.accessLogErr)
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 跨域访问
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 公共资源路径
app.use(express.static(path.join(__dirname, 'public')));

const jwtMiddleware = jwt({
  secret: secret, // 密钥或公钥  
  algorithms: ['HS256'], // 使用的算法  
}).unless({
  path: [
    '/api/track',
    '/api/like',
    '/api/count',
    '/api/emoji',
    '/api/running_time',
    '/api/reactions',
    '/api/stats',
    '/api/friendlink/getfriendlinklist',
    '/api/message/getmessagelist',
    '/api/users/reg',
    '/api/users/login',
    '/api/users/login/admin',
    {
      url: /^\/api\/friendlinkcomment\/friendlink/,
    },
    {
      url: /^\/api\/messagecomment\/message/,
    },
    {
      url: /^\/api\/articles\/getarticle/,
      method: ['GET']
    },
    // {
    //   url: '/api/upload',
    //   method: ['POST']
    // },
  ]
}); // 排除不需要 JWT 验证的路径  

// 解析jwt  
app.use(jwtMiddleware);

// 路由
app.use('/', otherRouter);
app.use('/api/users', usersRouter);
app.use('/api/articles', articleRouter);
app.use('/api/friendlink', friendlinkRouter);
app.use('/api/friendlinkcomment', friendlinkcommentRouter);
app.use('/api/message', messageRouter);
app.use('/api/messagecomment', messagecommentRouter);
app.use('/api/upload', uploadRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 打印生产环境
  console.log(process.env.NODE_ENV);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 监听服务
const port = 3000

app.listen(port, () => {
  console.log('Server is running at http://localhost:3000');
})


module.exports = app;
