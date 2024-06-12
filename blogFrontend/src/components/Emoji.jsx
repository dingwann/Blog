import { useState, useLayoutEffect, useContext } from "react"
import http from "./Axiosconfig";
import { toast } from 'react-toastify';
import { LoginContext } from '../components/LoginContext'


export default function Emoji(props) {
    const { themestate } = useContext(LoginContext)
    const [emojiListVisible, setEmojiListVisible] = useState(false);
    const [reactions, setReactions] = useState({});

    const [refreshKey, setRefreshKey] = useState(true);

    const emojis = ["😊", "👍", "💝", "😭", "😢", "😠", "😂", "😍"]; // 示例表情列表

    const handleEmojiClick = async (emoji) => {

        try {
            const response = await http.post('/api/emoji', { emoji: emoji });

            if (response.data) {
                toast('😄 你小子指定行', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: themestate ? "light" : "dark",
                    progress: undefined,
                });
                setRefreshKey(prevKey => !prevKey)
            }
        } catch (error) {
            console.error('发送请求失败:', error);
            toast('😢 服务器出问题了', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: themestate ? "light" : "dark",
                progress: undefined,
            });
        } finally {
            setEmojiListVisible(false);
        }
    };

    useLayoutEffect(() => {
        async function fetchReactions() {
            try {
                const response = await http.get('/api/reactions');
                // 确保 data 不为 undefined 或 null
                response.data ? setReactions(response.data) : {};
            } catch (error) {
                console.error('发送请求失败:', error);
            }
        }
        fetchReactions();
    }, [refreshKey])

    return (
        <div className="flex flex-col justify-center">
            <h4 className="mt-2 text-sm text-inherit flex justify-center font-medium">
                {Object.values(reactions).reduce((acc, curr) => {
                    acc = parseInt(acc)
                    curr = parseInt(curr)
                    return acc + curr;
                }, 0)} reactions
            </h4>
            <div className="mt-2 flex-wrap flex items-center gap-2">
                <div
                    className="relative"
                    onMouseEnter={() => setEmojiListVisible(true)}
                    onMouseLeave={() => setEmojiListVisible(false)}
                >
                    <button className="flex items-center">
                        <svg className="p-[1px] rounded-lg border-2" xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M20 12a8 8 0 0 0-8-8a8 8 0 0 0-8 8a8 8 0 0 0 8 8a8 8 0 0 0 8-8m2 0a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2a10 10 0 0 1 10 10M10 9.5c0 .8-.7 1.5-1.5 1.5S7 10.3 7 9.5S7.7 8 8.5 8s1.5.7 1.5 1.5m7 0c0 .8-.7 1.5-1.5 1.5S14 10.3 14 9.5S14.7 8 15.5 8s1.5.7 1.5 1.5m-5 7.73c-1.75 0-3.29-.73-4.19-1.81L9.23 14c.45.72 1.52 1.23 2.77 1.23s2.32-.51 2.77-1.23l1.42 1.42c-.9 1.08-2.44 1.81-4.19 1.81" />
                        </svg>
                    </button>
                    {emojiListVisible && (
                        <span className={themestate ? "bg-white grid grid-cols-4 gap-1 w-36 absolute top-8 md:top-[27px] left-0 border rounded-lg shadow-md p-1" : "bg-black grid grid-cols-4 gap-1 w-36 absolute top-8 md:top-[27px] left-0 border rounded-lg shadow-md p-1"}>
                            {emojis.map((emoji, index) => (
                                <button key={index} className="p-1 rounded-lg hover:bg-slate-100" onClick={() => handleEmojiClick(emoji)}>
                                    {emoji}
                                </button>
                            ))}
                        </span>
                    )}
                </div>

                {Object.entries(reactions).map(([emoji, count], index) => (
                    <span key={index} className="flex items-center md:flex">
                        {count > 1 ? (
                            <span className="border-1 rounded-lg p-[2px]">
                                {emoji} {count}
                            </span>
                        ) : (
                            <span className="border-1 rounded-lg p-[2px]">
                                {emoji}
                            </span>
                        )}
                    </span>
                )
                )}
            </div>
        </div>
    )
}