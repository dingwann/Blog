const express = require('express');
const router = express.Router();
const { MessageComment, Message } = require('../models/Database')


// 发布评论
router.post('/:mgid', async (req, res) => {
    const Message_info = await Message.findById(req.params.mgid)
        .populate('user')

    if (Message_info.user._id == req.auth.uid || req.auth.rank == 'admin') {
        MessageComment.create({
            reply_User_Id: req.auth.uid,
            Message_Id: req.params.mgid,
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
    const comment = await MessageComment.findById(req.params.cid)
        .populate('Message_Id')
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

        MessageComment.findByIdAndDelete(req.params.cid)
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



// 根据ID获取留言的评论内容
router.get('/message/:mgid', (req, res) => {
    // req.params
    MessageComment.find({ Message_Id: req.params.mgid })
        .populate('reply_User_Id', { password: 0, identity: 0, createdAt: 0, updatedAt: 0, __v: 0 })
        .then(r => {
            res.json({
                code: 1,
                msg: '查询留言评论列表成功',
                data: r
            })
        })
        .catch(err => {
            res.json({
                code: 0,
                msg: '查询留言评论列表失败',
                // data: err
            })
        })
})

module.exports = router