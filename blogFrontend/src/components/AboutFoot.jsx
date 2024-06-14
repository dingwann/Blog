import { useState, useContext, useLayoutEffect, useEffect } from "react"
import { LoginContext } from '../components/LoginContext'
import formatDate from "./FormatDate";
import http from "./Axiosconfig";
import { toast } from 'react-toastify';
import { Button } from "@nextui-org/react";
import Emoji from "./Emoji";

export default function AboutFoot(props) {

    const { themestate, LoginState } = useContext(LoginContext)

    useLayoutEffect(() => {
        window.localStorage.setItem('themeState', JSON.stringify(themestate));
    }, [themestate]);

    const [commentopen, setCommentopen] = useState({})
    const [MessageList, setMessageList] = useState([])
    const [newComment, setNewComment] = useState({})

    // 评论提交
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [content, setContent] = useState("")
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        if (content === "") {
            toast(`😢 没有填写内容哦！`, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: themestate ? "light" : "dark",
                progress: undefined,
            });
            setIsSubmitting(false);
            return
        }

        try {
            const response = await http.post('/api/message', { content });
            if (response.data.code === 1) {
                toast('🦄 评论成功!', {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: themestate ? "light" : "dark",
                    progress: undefined,
                });

                // 提交成功后清空
                setContent("")

                // 成功后延时刷新 FriendComment 组件

                props.setRefreshKey(prevKey => prevKey + 1);

            } else {
                toast(`😢 code:${response.data.err.code}(${Object.keys(response.data.err.keyValue)})  提交失败！`, {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: themestate ? "light" : "dark",
                    progress: undefined,
                });
            }
        } catch (error) {
            toast(`😢 请登录哦铁子！`, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: themestate ? "light" : "dark",
                progress: undefined,
            })
        } finally {
            setIsSubmitting(false);
        }
    };



    useLayoutEffect(() => {
        const fetchData = async () => {
            const res = await http.get('/api/message/getmessagelist')

            const messagelist = res.data.data;

            // Fetch comments for each friend link
            const fetchCommentsPromises = messagelist.map(item =>
                http.get(`/api/messagecomment/message/${item._id}`)
            );

            const commentsResponses = await Promise.all(fetchCommentsPromises);


            const messagelistWithComments = messagelist.map((item, index) => ({
                ...item,
                comments: commentsResponses[index].data.data
            }));

            setMessageList(messagelistWithComments);
        }

        fetchData()
    }, [props.refreshKey])


    async function handleDelete(mgid) {
        try {
            const response = await http.delete(`/api/message/${mgid}`);

            if (response.data.code === 1) {
                // 删除成功后更新 FriendLinks 状态
                setMessageList(prevList => prevList.filter(prevList => prevList._id !== mgid));
                toast('✅ 删除成功!', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    theme: themestate ? "light" : "dark",
                    progress: undefined,
                });
            } else {
                toast(`😢 ${response.data.msg}`, {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    theme: themestate ? "light" : "dark",
                    progress: undefined,
                });
            }
        } catch (error) {
            console.error("删除请求失败:", error);
        }
    }

    async function handleCommentSubmit(itemId, index) {
        if (!newComment[index] || newComment[index].trim() === "") {
            alert("评论内容不能为空");
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await http.post(`/api/messagecomment/${itemId}`, { content: newComment[index] });
            if (response.data.code === 1) {
                // 更新 FriendLinks 状态
                toast('😄 评论成功!', {
                    position: "top-center",
                    autoClose: 800,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    theme: themestate ? "light" : "dark",
                    progress: undefined,
                });

                props.setRefreshKey(prevKey => prevKey + 1)
                // 关闭当前评论窗口
                setCommentopen(prevState => ({
                    ...prevState,
                    [index]: false
                }));
                setNewComment(prevState => ({ ...prevState, [index]: "" }));
            } else {
                toast(`😰 ${response.data.msg}`, {
                    position: "top-center",
                    autoClose: 800,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    theme: themestate ? "light" : "dark",
                    progress: undefined,
                });
            }
        } catch (error) {
            console.error("评论请求失败:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleCommentDelete(cid) {
        try {
            const response = await http.delete(`/api/messagecomment/del/${cid}`);
            if (response.data.code === 1) {
                toast('✅ 删除评论成功!', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    theme: themestate ? "light" : "dark",
                    progress: undefined,
                });

                // 更新 FriendLinks 状态
                props.setRefreshKey(prevKey => prevKey + 1)
            } else {
                toast(`😢 ${response.data.msg}`, {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    theme: themestate ? "light" : "dark",
                    progress: undefined,
                });
            }
        } catch (error) {
            console.error("删除评论请求失败:", error);
        }
    }

    function toggleCommentOpen(index) {
        setCommentopen(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }))
    }


    return (
        <>
            <div className="animate-fade-up flex flex-col justify-center items-center gap-7 w-auto h-auto">
                <Emoji></Emoji>

                <div className="self-start flex flex-col gap-6 w-full h-full">
                    {/* 留言板标题 */}
                    <div className="flex justify-between items-center gap-2 w-full">
                        <div className="flex">
                            <p className="font-semibold">
                                {MessageList.length} comments
                            </p>
                            <p>
                                &nbsp;- by dingwan
                            </p>
                        </div>

                        {/* 排序 */}
                        <div className="flex">
                        </div>
                    </div>

                    {/* 留言板展示 */}
                    {MessageList.map((item, index) => (
                        <div key={index} className="flex flex-col space-y-4 w-[100%] h-auto">
                            {/* 评论列表 */}
                            <div className="list flex flex-col w-full h-auto rounded-md border-1">
                                {/* 评论人信息 */}
                                <div className="px-4 pt-2 space-x-2 flex items-center">
                                    <span className="">
                                        <img className="w-7 h-7 rounded-full" src={item.user.headImgUrl} alt="" />
                                    </span>
                                    <span>
                                        {item.user.username}
                                    </span>
                                    <span className="text-sm text-gray-400">
                                        {formatDate(item.createdAt)}
                                    </span>
                                </div>
                                {/* 评论内容 */}
                                <div className="p-4 flex flex-col">
                                    <span>{item.content}</span>
                                </div>

                                {/* 评论右侧 */}
                                {(item.user._id == localStorage.getItem('uid') || localStorage.getItem('username') == 'dingwan') && (
                                    <div className="px-4 flex self-end text-sm mb-3 space-x-2 items-center">
                                        {/* 删除按钮 */}
                                        <button onClick={() => handleDelete(item._id)} className="hover:text-gray-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zm-7 11q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17M7 6v13z" />
                                            </svg>
                                        </button>
                                        {/* 评论按钮 */}
                                        <button onClick={() => toggleCommentOpen(index)} className="hover:text-gray-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 3h13a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-4.59l-3.7 3.71c-.18.18-.43.29-.71.29a1 1 0 0 1-1-1v-3H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3m13 1H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h4v4l4-4h5a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2" />
                                            </svg>
                                        </button>
                                        <p>{item.mgcoms.length} reply</p>
                                    </div>
                                )}


                                {/* 针对评论写评论功能 */}
                                <div className={`${commentopen[index] ? "w-full border-1 flex flex-col" : "hidden"}`}>
                                    <div className={`${themestate ? "bg-gray-200 flex justify-between items-center" : "bg-gray-500 flex justify-between items-center"}`}>
                                        <span className="m-2 mb-0 p-2 w-auto font-medium rounded-t-md bg-[rgba(255,255,255,0.5)]">
                                            <p className={`${themestate ? {} : "text-gray-800"}`}>Comment</p>
                                        </span>
                                        <span className="m-2 mb-0 p-2 font-semifold">
                                            Aa
                                        </span>
                                    </div>
                                    <div className="m-2">
                                        <textarea
                                            placeholder="Log in to comment"
                                            className={`${themestate ? "bg-gray-200 w-full h-[150px] text-md rounded-md p-2 focus:outline-zinc-300" : "bg-gray-500 w-full h-[150px] text-md rounded-md p-2 focus:outline-zinc-300"}`}
                                            name=""
                                            id={index}
                                            value={newComment[index] || ""}
                                            onChange={(e) => setNewComment(prevState => ({ ...prevState, [index]: e.target.value }))}
                                        >
                                        </textarea>
                                    </div>
                                    <span className="flex self-end m-2">
                                        <Button size="sm"
                                            onClick={() => handleCommentSubmit(item._id, index)}
                                            className="rounded-md border-1 text-inherit font-semibold"
                                            radius="sm"
                                            isLoading={isSubmitting}
                                        >
                                            Send
                                        </Button>
                                    </span>
                                </div>

                                {/* 评论回复div */}
                                {item.mgcoms.length > 0 &&
                                    item.comments.map((item2, index) => (
                                        <div key={index} className={`${themestate ? "flex flex-col w-full h-full bg-gray-200 border-gray-300 border-solid border-t-2" : "flex flex-col w-full h-full bg-gray-500 border-gray-600 border-solid border-t-2"}`}>
                                            <div className="px-4 pt-2 space-x-2 flex items-center">
                                                <span className="">
                                                    <img className="w-7 h-7 rounded-full" src={item2.reply_User_Id.headImgUrl} alt="headImg" />
                                                </span>
                                                <span>
                                                    {item2.reply_User_Id.username}
                                                </span>
                                                <span className="text-sm text-gray-400">
                                                    {formatDate(item2.createdAt)}
                                                </span>
                                            </div>
                                            {/* 回复内容 */}
                                            <div className="p-4 flex items-center">
                                                <div className="absolute border-1 mr-6 border-solid border-gray-300 inline-block h-14 ml-3"></div>
                                                <div className="flex w-full justify-between items-center">
                                                    <p className="px-9">{item2.content}</p>
                                                    {/* 删除按钮 */}
                                                    {(item.user._id == localStorage.getItem('uid') || localStorage.getItem('username') == 'dingwan') && (
                                                        <button onClick={() => handleCommentDelete(item2._id)} className="hover:text-gray-600">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zm-7 11q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17M7 6v13z" />
                                                            </svg>
                                                        </button>
                                                    )}

                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))}

                    <hr />
                    {/* 写评论功能 */}
                    <div className="w-full border-2 rounded-md flex flex-col">
                        <div className={`${themestate ? "bg-gray-200 flex justify-between items-center" : "bg-gray-500 flex justify-between items-center"}`}>
                            <span className="m-2 mb-0 p-2 w-auto font-medium rounded-t-md bg-[rgba(255,255,255,0.5)]">
                                <span className={`${themestate ? {} : "text-gray-800"}`}>Write</span>
                            </span>
                            <p className="m-2 mb-0 p-2 font-semifold">
                                Aa
                            </p>
                        </div>
                        <form className="flex flex-col" onSubmit={handleSubmit}>
                            <div className="m-2">
                                <textarea value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Log in to comment"
                                    className={`${themestate ? "bg-gray-200 w-full h-[250px] text-md rounded-md p-2 focus:outline-zinc-300" : "bg-gray-500 w-full h-[250px] text-md rounded-md p-2 focus:outline-zinc-300"}`}
                                    name="" id="comment">

                                </textarea>
                            </div>

                            <Button size="md"
                                isDisabled={!LoginState}
                                className="flex self-end m-2 rounded-md border-1 text-inherit font-semibold"
                                radius="md"
                                isLoading={isSubmitting}
                                disabled={isSubmitting}
                                type="submit"
                            >
                                {!LoginState ? '请登录' : isSubmitting ? 'Sending...' : 'Send'}
                            </Button>

                        </form>
                    </div>
                </div>
            </div >
        </>
    )
}