const express = require('express');
const router = express.Router();
const redis = require('redis');


const client = redis.createClient({
    host: 'localhost',
    port: 6379,
    password: '123456'
});

// 监听redis错误信息
client.on('err', err => {
    console.log('redis client error: ', err)
})


client.on('connect', () => {
    console.log('redis client connect success')
})

client.auth('123456', err => {
    if (err) {
        console.log('redis client auth error: ', err)
    }
})


// 获取PV、UV
router.get('/api/stats', function (req, res) {
    const date = new Date().toISOString().slice(0, 10); // 获取当天日期

    client.mget(['total_pv', 'pv:' + date, 'total_uv', 'uv:' + date], function (err, result) {
        if (err) {
            return console.error(err);
        }

        res.json({
            total_pv: parseInt(result[0], 10) || 0,
            today_pv: parseInt(result[1], 10) || 0,
            total_uv: parseInt(result[2], 10) || 0,
            today_uv: parseInt(result[3], 10) || 0
        });
    });
});

router.get('/api/count', (req, res) => {
    client.get('count', (err, count) => {
        if (err) {
            console.error('Redis error:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.send({
            code: 1,
            msg: '查询成功',
            count: count
        })
    })
})

router.get('/api/like', (req, res) => {
    const ip = req.ip;
    client.sismember('ips', ip, (err, reply) => {
        if (reply === 1) {
            // IP地址已经存在，不增加计数
            client.get('count', (err, count) => {
                res.send({
                    code: 0,
                    msg: '你今天已经点过了',
                    count: count
                });
            });
        } else {
            // IP地址不存在，添加到Set并增加计数
            client.sadd('ips', ip);
            client.incr('count', (err, count) => {
                res.send({
                    code: 1,
                    msg: '谢谢你的喜欢 ❤',
                    count: count
                });
            });

            // 设置过期时间到每天的晚上12点
            const now = new Date();
            const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
            const secondsUntilTomorrow = (tomorrow - now) / 1000;
            client.expireat('ips', Math.floor(tomorrow / 1000));
        }
    });
});

// 表情管理
router.post('/api/emoji', (req, res) => {
    const emoji = req.body.emoji;
    if (emoji) {
        client.hincrby('emojis', emoji, 1, (err, count) => {
            if (err) {
                console.error('Redis error:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.json({ [emoji]: count });
        });
    } else {
        res.status(400).json({ error: 'No emoji provided' });
    }
});

router.get('/api/reactions', (req, res) => {
    client.hgetall('emojis', (err, result) => {
        if (err) {
            console.error('Redis error:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(result);
    });
});

// 网站计时
client.get('start_time', function (err, start_time) {
    if (start_time) {
        return
    }
    client.set('start_time', Date.now()); // 存储启动时间
})

router.get('/api/running_time', function (req, res) {
    client.get('start_time', function (err, start_time) {
        if (err) {
            return console.error(err);
        }

        const running_time = Date.now() - start_time;
        const days = Math.floor(running_time / (24 * 60 * 60 * 1000));
        const hours = Math.floor((running_time % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
        const minutes = Math.floor((running_time % (60 * 60 * 1000)) / (60 * 1000));
        const seconds = Math.floor((running_time % (60 * 1000)) / 1000);

        res.json({
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        })
    });
});

// 中间件统计PV和UV
router.post('/api/track', (req, res) => {
    const date = new Date().toISOString().slice(0, 10); // 获取当天日期
    const ip = req.ip;
    const url = req.body.url;

    if (!url.startsWith('/api')) {
        // 统计总PV
        client.incr('total_pv', (err) => {
            if (err) {
                return console.error(err);
            }
        });

        // 统计当天PV
        client.incr(`pv:${date}`, (err) => {
            if (err) {
                return console.error(err);
            }
        });

        // 统计URL的PV
        client.incr(`pv:url:${url}`, (err) => {
            if (err) {
                return console.error(err);
            }
        });

        // 统计总UV
        client.sadd('total_uv_ips', ip, (err, add) => {
            if (err) {
                return console.error(err);
            }
            if (add === 1) {
                client.incr('total_uv', (err) => {
                    if (err) {
                        return console.error(err);
                    }
                });
            }
        });

        // 统计当天UV
        client.sadd(`uv:${date}_ips`, ip, (err, add) => {
            if (err) {
                return console.error(err);
            }
            if (add === 1) {
                client.incr(`uv:${date}`, (err) => {
                    if (err) {
                        return console.error(err);
                    }
                });
            }
        });
    }

    res.status(200).send('Tracked');
});


module.exports = router