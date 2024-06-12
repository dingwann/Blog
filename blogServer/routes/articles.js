const express = require('express');
const router = express.Router();
const { Article, User } = require('../models/Database')

/* 发布文章 */

router.post('/', function (req, res, next) {
  console.log(req.body);
  console.log(req.auth.uid);
  Article.create({ ...req.body, author: req.auth.uid })
    .then(r => {
      res.json({
        code: 1,
        msg: "发布文章成功",
        data: r
      })
    })
    .catch(err => {
      res.json({
        code: 0,
        msg: "发布文章失败",
        err: err
      })
    })
});


/* 获取文章列表 */
// 获取指定用户文章列表  /getarticlelist/:uid
router.get('/getarticlelist', (req, res, next) => {
  Article.find({}).sort({ createdAt: -1 })   //查找指定用户author: req.auth.uid
    .populate('author', { password: 0, identity: 0, createdAt: 0, updatedAt: 0, __v: 0 })
    .populate('coms')
    .then(r => {
      res.json({
        code: 1,
        msg: "获取文章列表成功",
        data: r
      })
    })
    .catch(err => {
      res.json({
        code: 0,
        msg: "获取文章列表失败",
        data: err
      })
    })
});

/* 根据文章ID获取文章详情 */

router.get('/getarticle/:aid', (req, res, next) => {
  // console.log(req.params)
  Article.findByIdAndUpdate(
    req.params.aid,
    { $inc: { views: 1 } },
    { new: true }  // 查询上面views后更新的新结果
  )
    .populate('author', { password: 0, identity: 0, createdAt: 0, updatedAt: 0, __v: 0 })
    .populate('coms')
    .then(r => {
      res.json({
        code: 1,
        msg: "根据文章ID查询文章详情成功",
        data: r
      })
    })
    .catch(err => {
      res.json({
        code: 0,
        msg: "根据文章ID查询文章详情失败"
      })
    })
});


/* 删除文章 */

router.delete('/:aid', (req, res) => {
  Article.findByIdAndDelete(req.params.aid)
    .then(r => {
      if (r) {
        res.json({
          code: 1,
          msg: '删除文章成功'
        })
      } else {
        res.json({
          code: 0,
          msg: '文章不存在或已删除'
        })
      }
    })
    .catch(err => {
      res.json({
        code: 0,
        msg: '删除出错啦',
        err: err
      })
    })
})


/* 根据文章ID修改文章 */

router.patch('/:aid', async (req, res) => {
  let r = await Article.findByIdAndUpdate(
    req.params.aid,
    { ...req.body },
    { new: true }
  )

  if (r) {
    res.json({
      code: 1,
      msg: '修改文章成功',
      data: r
    })
  } else {
    res.json({
      code: 0,
      msg: '修改文章出错'
    })
  }

})


module.exports = router;