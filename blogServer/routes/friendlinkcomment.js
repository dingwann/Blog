const express = require('express');
const router = express.Router();
const { FriendLinkComment, FriendLink } = require('../models/Database')


// 发布评论
router.post('/:flid', async (req, res) => {
    const FirndLink_info = await FriendLink.findById(req.params.flid)
        .populate('user')

    if (FirndLink_info.user._id == req.auth.uid || req.auth.rank == 'admin') {
        FriendLinkComment.create({
            reply_User_Id: req.auth.uid,
            FriendLink_Id: req.params.flid,
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
    } else {
        res.json({
            code: 0,
            msg: '发布评论-无权限'
        })
    }
})

// 根据评论ID删除评论
router.delete('/del/:cid', async (req, res) => {
    const comment = await FriendLinkComment.findById(req.params.cid)
        .populate('FriendLink_Id')
    // console.log(comment);
    // const author_Id = comment.FriendLink_Id.user // 仅友链作者能删除
    if (!comment) {
        res.json({
            code: 0,
            msg: '评论不存在或已删除'
        })
        return
    }
    const author_Id = comment.reply_User_Id  // 评论作者也能删除
    // console.log(author_Id);
    if (author_Id == req.auth.uid || req.auth.rank == 'admin') {

        FriendLinkComment.findByIdAndDelete(req.params.cid)
            .then(r => {
                res.json({
                    code: 1,
                    msg: '删除评论成功'
                })
            })
            .catch(err => {
                res.json({
                    code: 0,
                    msg: '评论不存在或已删除'
                })
            })


    } else {
        res.json({
            code: 0,
            msg: '删除评论-无权限'
        })
    }
}

)

// 根据ID获取友链的评论内容
router.get('/friendlink/:flid', (req, res) => {
    // req.params
    FriendLinkComment.find({ FriendLink_Id: req.params.flid })
        .populate('reply_User_Id', { password: 0, identity: 0, createdAt: 0, updatedAt: 0, __v: 0 })
        .then(r => {
            res.json({
                code: 1,
                msg: '查询友链评论列表成功',
                data: r
            })
        })
        .catch(err => {
            res.json({
                code: 0,
                msg: '查询友链评论列表失败',
                // data: err
            })
        })
})

module.exports = router