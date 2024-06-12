// 日志的封装
// 写入文件中 file-stream-rotator所有日志
const express = require('express');
const logger = require('morgan');
const fileStreamRotato = require('file-stream-rotator')
const app = express()
const accessLogStream = fileStreamRotato.getStream({
    filename: './log/access-%DATE%.log',
    frequency: 'daily',
    verbose: false,
    date_format: 'YYYYMMDD'
})

// 格式化日志输出格式  由于代码重复，对输出格式进行封装
function formatLog(tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        decodeURI(tokens.url(req, res)), // 获取get参数
        JSON.stringify(req.body),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')
}

const accessLog = (logger(function (tokens, req, res) {
    return formatLog(tokens, req, res)
}, { stream: accessLogStream }));
// 写入文件中 file-stream-rotator 错误日志
const accessLogStreamErr = fileStreamRotato.getStream({
    filename: './log/access-err-%DATE%.log',
    frequency: 'daily',
    verbose: false,
    date_format: 'YYYYMMDD'
})
const accessLogErr = (logger(function (tokens, req, res) {
    return formatLog(tokens, req, res)
}, {
    stream: accessLogStreamErr,
    skip: function (req, res) {
        return res.statusCode < 400
    }
}));
// 导出代码
module.exports = { accessLog, accessLogErr, logger }
