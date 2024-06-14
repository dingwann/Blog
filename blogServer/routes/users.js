const express = require('express');
const router = express.Router();
const { User } = require('../models/Database')
const jwt = require('jsonwebtoken')
const secret = require('../secretkey')

/* 注册请求 */
router.post('/reg', function (req, res, next) {
  const { username, password, email, headImgUrl } = req.body
  if (username && password && headImgUrl) {
    // 插入数据库
    User.create(req.body)
      .then((r) => {
        res.json({
          code: 1,
          msg: "注册成功"
        })
      })
      .catch(err => {
        res.json({
          code: 0,
          msg: '注册失败',
          err: err
        })
      })
  } else {
    res.json({
      code: 0,
      msg: '缺少参数'
    })
  }
});

// 登录
router.get('/login', function (req, res, next) {
  // console.log(req.query)
  const { username, password } = req.query
  if (username && password) {
    User.findOne({ username, password })
      .then(r => {
        console.log(res);
        if (r == null || r.password !== password || r.username !== username) {
          res.json({
            code: 0,
            msg: '用户不存在或密码错误'
          })
        } else {
          const token = 'Bearer ' + jwt.sign(
            {
              rank: r.identity,
              uid: r._id,
              username: r.username
              // admin: User.role === 'admin'
            },
            secret,
            {
              expiresIn: '180 days',
              algorithm: 'HS256'
            }
          )

          res.json({
            code: 1,
            msg: '登录成功',
            token,
            uid: r._id,
            username: r.username,
            email: r.email,
            headImgUrl: r.headImgUrl
          })
        }
      })
  }
})

// 管理登录
router.get('/login/admin', function (req, res, next) {
  // console.log(req.query)
  const { username, password } = req.query
  if (username && password) {
    if (username !== 'dingwan') {
      res.json({
        code: 0,
        msg: '管理用户不存在'
      })
    } else {
      User.findOne({ username, password })
        .then(r => {
          console.log(res);
          if (r == null || r.password !== password || r.username !== username) {
            res.json({
              code: 0,
              msg: '用户不存在或密码错误'
            })
          } else {
            const token = 'Bearer ' + jwt.sign(
              {
                rank: r.identity,
                uid: r._id,
                username: r.username
                // admin: User.role === 'admin'
              },
              secret,
              {
                expiresIn: '7 days',
                algorithm: 'HS256'
              }
            )

            res.json({
              code: 1,
              msg: '登录成功',
              token,
              uid: r._id,
              username: r.username,
              email: r.email,
              headImgUrl: r.headImgUrl
            })
          }
        })
    }
  }


  // console.log(req.query);
  // res.json({
  //   code: 1,
  //   msg: "登录成功"
  // })
});

module.exports = router;