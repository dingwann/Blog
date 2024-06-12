const express = require('express');
const router = express.Router();
const { Comment } = require('../models/Database')


// 发布评论
router.post('/', (req, res) => {
    Comment.create({
        reply_User_Id: req.auth.uid,
        Article_Id: req.body.Article_Id,
        content: req.body.content
    })
        .then(r => {
            res.json({
                code: 1,
                msg: '发送评论成功'
            })
        })
        .catch(err => {
            res.json({
                code: 0,
                msg: '发送评论失败'
            })
        })
})

// 根据评论ID删除评论
router.delete('/del/:cid', async (req, res) => {
    const comment = await Comment.findById(req.params.cid)
        .populate('Article_Id')
    // console.log(comment);
    const author_Id = comment.Article_Id.author
    // console.log(author_Id);
    if (author_Id == req.auth.uid) {
        const r = Comment.findByIdAndDelete(req.params.cid)
        if (r) {
            res.json({
                code: 1,
                msg: '评论删除成功'
            })
        } else {
            res.json({
                code: 0,
                msg: '评论不存在'
            })
        }
    } else {
        res.json({
            code: 0,
            msg: '删除评论-无权限'
        })
    }

})

// 根据ID获取文章的评论内容
router.get('/articles/:aid', (req, res) => {
    // req.params
    Comment.find({ Article_Id: req.params.aid })
        .populate('reply_User_Id', { password: 0 })
        .then(r => {
            res.json({
                code: 1,
                msg: '查询文章评论列表成功',
                data: r
            })
        })
        .catch(err => {
            res.json({
                code: 0,
                msg: '查询文章评论列表失败',
                // data: err
            })
        })
})

module.exports = router