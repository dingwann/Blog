const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/artImgs')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage }).single('file')

router.post('/', upload, (req, res, next) => {
    const imgfile = req.file  // 图片对象
    const imgURL = '/images/artImgs/' + imgfile.filename
    res.json({
        code: 1,
        msg: 'upload img success',
        data: imgURL
    })
})

module.exports = router