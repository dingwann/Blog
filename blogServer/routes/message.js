const express = require('express');
const router = express.Router();
const { Message } = require('../models/Database')

/* 提交留言 */

router.post('/', function (req, res, next) {
    Message.create({ ...req.body, user: req.auth.uid })
        .then(r => {
            res.json({
                code: 1,
                msg: "提交留言成功",
                data: r
            })
        })
        .catch(err => {
            res.json({
                code: 0,
                msg: "提交留言失败",
                err: err
            })
        })
});


/* 获取留言列表 */

router.get('/getmessagelist', (req, res, next) => {
    Message.find({}).sort({ createdAt: -1 })
        .populate('user', { password: 0, identity: 0, createdAt: 0, updatedAt: 0, __v: 0 })
        .populate('mgcoms')
        .then(r => {
            res.json({
                code: 1,
                msg: "获取留言列表成功",
                data: r
            })
        })
        .catch(err => {
            res.json({
                code: 0,
                msg: "获取留言列表失败",
                data: err
            })
        })
});

/* 删除留言 */

router.delete('/:mgid', async (req, res) => {

    const Message_info = await Message.findById(req.params.mgid)
        .populate('user')

    if (Message_info.user._id == req.auth.uid || req.auth.rank == 'admin') {
        Message.findByIdAndDelete(req.params.mgid)
            .then(r => {
                if (r) {
                    res.json({
                        code: 1,
                        msg: '删除留言成功'
                    })
                } else {
                    res.json({
                        code: 0,
                        msg: '留言不存在或已删除'
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
    } else {
        res.json({
            code: 0,
            msg: '删除留言-无权限'
        })
    }

})


module.exports = router;