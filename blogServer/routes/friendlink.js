const express = require('express');
const router = express.Router();
const { FriendLink } = require('../models/Database')

/* 提交友链 */

router.post('/', function (req, res, next) {
    FriendLink.create({ ...req.body, user: req.auth.uid })
        .then(r => {
            res.json({
                code: 1,
                msg: "提交友链成功",
                data: r
            })
        })
        .catch(err => {
            res.json({
                code: 0,
                msg: "提交友链失败",
                err: err
            })
        })
});


/* 获取友链列表 */

router.get('/getfriendlinklist', (req, res, next) => {
    FriendLink.find({}).sort({ createdAt: -1 })
        .populate('user', { password: 0, identity: 0, createdAt: 0, updatedAt: 0, __v: 0 })
        .populate('flcoms')
        .then(r => {
            res.json({
                code: 1,
                msg: "获取友链列表成功",
                data: r
            })
        })
        .catch(err => {
            res.json({
                code: 0,
                msg: "获取友链列表失败",
                data: err
            })
        })
});

/* 删除友链 */

router.delete('/:flid', async (req, res) => {

    const FirndLink_info = await FriendLink.findById(req.params.flid)
        .populate('user')

    if (FirndLink_info.user._id == req.auth.uid || req.auth.rank == 'admin') {
        FriendLink.findByIdAndDelete(req.params.flid)
            .then(r => {
                if (r) {
                    res.json({
                        code: 1,
                        msg: '删除友链成功'
                    })
                } else {
                    res.json({
                        code: 0,
                        msg: '友链不存在或已删除'
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
            msg: '删除友链-无权限'
        })
    }

})


module.exports = router;