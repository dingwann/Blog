const mongoose = require('mongoose')
const mongoDB_USER_STR = require('./config')


mongoose.connect(mongoDB_USER_STR, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // dbName: 'blog'  指定连接的数据库
    // 端口默认27017
})
    .then(() => console.log('MongoDB connected...'))
    .catch((err) => {
        console.log(err)
        console.log('MongoDB connect failed')
    })

/* -------------------------------------------------------- */
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    identity: {
        type: String,
        default: 'user'
    },
    email: {
        type: String,
        required: false
    },
    // 头像链接
    headImgUrl: String,
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

// User.create({
//     username: 'dingwan',
//     password: '123456',
//     identity: 'admin',
//     headImgUrl: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.ZtrvDWpDrJNiyRQj6DwPvwAAAA?w=164&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
// })


/* -------------------------------------------------------- */

// 定义文章表结构
const ArticleSchema = new Schema({
    tag: Array,
    title: String,
    desc: String,
    content: String,
    auth: String,
    public: Boolean,
    // 文章表用User表的id关联
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    views: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true  // 记录时间，包含创建和修改
})

// 创建虚拟字段用于一对多的关联：文章---->>多评论
ArticleSchema.virtual('coms', {
    ref: 'Comment', // 关联到Comment表
    localField: '_id',  // Article模型的id字段
    foreignField: 'Article_Id',  // Comment模型的Article_Id字段
    justOne: false
})
// 只有这两条设置了虚拟字段才能显性看到
ArticleSchema.set('toObject', { virtuals: true })
ArticleSchema.set('toJSON', { virtuals: true })

// 创建数据模型，做映射
const Article = mongoose.model('Article', ArticleSchema)

// Article.create({
//     tag: ['Fluteer', 'Vue'],
//     title: '这是我的第2篇文章',
//     desc: '第二篇',
//     content: 'This is my second’ article',
// })

/* -------------------------------------------------------- */

// 定义友链表结构
const FriendLinkSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        unique: true,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    siteImgUrl: {
        type: String,
        required: true
    },

    // 友链表用User表的id关联
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true  // 记录时间，包含创建和修改
})

// 创建虚拟字段用于一对多的关联：友链---->>多评论
FriendLinkSchema.virtual('flcoms', {
    ref: 'FriendLinkComment', // 关联到Comment表
    localField: '_id',  // FriendLink模型的id字段
    foreignField: 'FriendLink_Id',  // FLComment模型的FriendLink_Id字段
    justOne: false
})
// 只有这两条设置了虚拟字段才能显性看到
FriendLinkSchema.set('toObject', { virtuals: true })
FriendLinkSchema.set('toJSON', { virtuals: true })

// 创建数据模型，做映射
const FriendLink = mongoose.model('FriendLink', FriendLinkSchema)

/* -------------------------------------------------------- */

// 定义留言板表结构
const MessageSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    // 留言板表用User表的id关联
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true  // 记录时间，包含创建和修改
})


// 创建虚拟字段用于一对多的关联：留言---->>多评论
MessageSchema.virtual('mgcoms', {
    ref: 'MessageComment', // 关联到Comment表
    localField: '_id',  // Message模型的id字段
    foreignField: 'Message_Id',  // Comment模型的Message_Id字段
    justOne: false
})
// 只有这两条设置了虚拟字段才能显性看到
MessageSchema.set('toObject', { virtuals: true })
MessageSchema.set('toJSON', { virtuals: true })

// 创建数据模型，做映射
const Message = mongoose.model('Message', MessageSchema)


/* -------------------------------------------------------- */

// 定义评论表结构
const CommentSchema = new Schema({
    content: String,
    // 评论所属文章的ID
    Article_Id: { type: Schema.Types.ObjectId, ref: 'Article' },
    // 评论人的ID
    reply_User_Id: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true  // 记录时间，包含创建和修改
})

// 创建数据模型，做映射
const Comment = mongoose.model('Comment', CommentSchema)

/* -------------------------------------------------------- */

// 定义友链评论表结构
const FriendLinkCommentSchema = new Schema({
    content: String,
    // 评论所属友链的ID
    FriendLink_Id: { type: Schema.Types.ObjectId, ref: 'FriendLink' },
    // 评论人的ID
    reply_User_Id: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true  // 记录时间，包含创建和修改
})

// 创建数据模型，做映射
const FriendLinkComment = mongoose.model('FriendLinkComment', FriendLinkCommentSchema)

/* -------------------------------------------------------- */

// 定义留言评论表结构
const MessageCommentSchema = new Schema({
    content: String,
    // 评论所属留言的ID
    Message_Id: { type: Schema.Types.ObjectId, ref: 'Message' },
    // 评论人的ID
    reply_User_Id: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true  // 记录时间，包含创建和修改
})

// 创建数据模型，做映射
const MessageComment = mongoose.model('MessageComment', MessageCommentSchema)

/* -------------------------------------------------------- */
// Passlink表
const PasslinkSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        unique: true,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    headimg: {
        type: String,
        required: true
    },

    // Pass表用User表的id关联
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true  // 记录时间，包含创建和修改
})
// 创建数据模型，做映射
const Passlink = mongoose.model('Passlink', PasslinkSchema)

module.exports = { Comment, User, Article, Message, FriendLink, FriendLinkComment, MessageComment, Passlink }