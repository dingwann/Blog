import { useState, useLayoutEffect, useContext } from "react";
import { Input, Button } from "@nextui-org/react";
import Login from "./Login";
import FriendComment from "./FriendComment";
import http from "./Axiosconfig";
import { LoginContext } from '../components/LoginContext';
import { ToastContainer, toast } from 'react-toastify';

export default function Friend(props) {

    // 检测是否登录


    const { themestate, LoginState } = useContext(LoginContext);

    // 提交表单设置
    const [title, setTitle] = useState("")
    const [url, setUrl] = useState("https://")
    const [desc, setDesc] = useState("")
    const [siteImgUrl, setSiteImgUrl] = useState("")

    const [isSubmitting, setIsSubmitting] = useState(false);

    // 刷新 FriendComment 组件的状态
    const [refreshKey, setRefreshKey] = useState(0);

    useLayoutEffect(() => {
        window.scrollTo({
            top: 0,
            // behavior: 'smooth'
        })

    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await http.post('/api/friendlink', { title, url, desc, siteImgUrl });

            if (response.data.code === 1) {
                toast('🦄 提交成功!', {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: themestate ? "light" : "dark",
                    progress: undefined,
                });
                // 成功后延时刷新 FriendComment 组件

                setRefreshKey(prevKey => prevKey + 1);

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
            toast(`😢 ${error}`, {
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

    return (
        <>
            <div className="px-4 w-full relative">
                <Login></Login>
                <ToastContainer limit={3} />
                <div className="animate-fade-up pt-4 text-center flex flex-col items-center px-[8px] md:px-[56px] lg:pt-5 md:pt-6 sm:pt-6 xl:pt-16">
                    <div className="w-full lg:w-[80%] md:w-full sm:w-full xl:max-w-[1000px] xl:w-[80%]">

                        <div className="text-left flex flex-col">
                            <h1 className="text-5xl text-violet-400 font-bold">
                                Friend
                            </h1>
                            <div className="py-4">
                                <span>
                                    Though we may be a world apart , friendship makes us neighbours at heart .
                                </span>
                            </div>
                        </div>

                        {/* 友链列表 */}
                        <div className="text-left">
                            <div className="z-2 mt-2 grid grid-cols-1 gap-4 w-full lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-3">
                                <a target="_blank" className="border-1 rounded-lg ring-inset ring-2 ring-[rgba(0,0,0,0)] hover:ring-violet-400 transition-transform-colors hover:shadow-sm p-2 flex items-center gap-2 backdrop-blur-sm overflow-hidden cursor-pointer">
                                    <span className="w-16 h-16">
                                        <img className="rounded-full" src="http://113.45.148.40:3000/images/logo/logo.png" alt="headimg" />
                                    </span>
                                    <span className="flex flex-col">
                                        <span className="text-inherit text-xl font-medium">
                                            丁烷
                                        </span>
                                        <span className=" text-slate-600">
                                            我是一个简介。
                                        </span>
                                    </span>
                                </a>
                            </div>
                        </div>

                        <div className="text-left my-6 flex flex-col gap-2">
                            <span>
                                你可以通过评论申请友链，满足以下条件并按照格式提交申请即可，我会在12小时内处理完毕。
                            </span>
                            <ul className="my-3">
                                <li id="wc" className="my-[8.4px] flex items-center">
                                    <span>
                                        <svg className="text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 15 15"><path fill="currentColor" d="M9.875 7.5a2.375 2.375 0 1 1-4.75 0a2.375 2.375 0 0 1 4.75 0" />
                                        </svg>
                                    </span>
                                    申请前请确保你站拥有我站友链，若通过后移除本站链接，本站也将移除友链，并加入黑名单。
                                </li>
                                <li id="wc" className="my-[8.4px] flex items-center">
                                    <span>
                                        <svg className="text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 15 15"><path fill="currentColor" d="M9.875 7.5a2.375 2.375 0 1 1-4.75 0a2.375 2.375 0 0 1 4.75 0" />
                                        </svg>
                                    </span>
                                    若站点长时间无法访问，我将删除您的友链，恢复后可再次申请。
                                </li>
                                <li id="wc" className="my-[8.4px] flex items-center">
                                    <span>
                                        <svg className="text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 15 15"><path fill="currentColor" d="M9.875 7.5a2.375 2.375 0 1 1-4.75 0a2.375 2.375 0 0 1 4.75 0" />
                                        </svg>
                                    </span>
                                    确保您的网站不存在政治敏感问题及违法内容。没有过多的广告、无恶意软件、脚本。
                                </li>
                                <li id="wc" className="my-[8.4px] flex items-center">
                                    <span>
                                        <svg className="text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 15 15"><path fill="currentColor" d="M9.875 7.5a2.375 2.375 0 1 1-4.75 0a2.375 2.375 0 0 1 4.75 0" />
                                        </svg>
                                    </span>
                                    您需要有自己的独立域名，暂且不同意公有子域名或免费域名的友链申请 (如 github.io, vercel.app, eu.org, js.cool, .tk, .ml, .cf 等)
                                </li>
                                <li id="wc" className="my-[8.4px] flex items-center">
                                    <svg className="text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 15 15"><path fill="currentColor" d="M9.875 7.5a2.375 2.375 0 1 1-4.75 0a2.375 2.375 0 0 1 4.75 0" />
                                    </svg>
                                    暂不同意商业及非个人的网站的友链申请。
                                </li>
                            </ul>
                            <span className="text-2xl text-violet-400 font-bold">
                                Example：
                            </span>
                            <ul className="space-y-2">
                                <li className="font-semibold flex items-center">
                                    <p>站点标题：</p>
                                    <span className="font-medium">丁烷</span>
                                </li>
                                <li className="font-semibold flex items-center">
                                    <p>站点链接：</p>
                                    <span className="font-medium">https://xxx.xxx</span>
                                </li>
                                <li className="font-semibold flex items-center text-nowrap">
                                    <p>站点描述：</p>
                                    <span className="font-medium text-wrap">没有描述。(特殊说明请括号内填写或评论)</span>
                                </li>
                                <li className="font-semibold flex items-center">
                                    <p>站点头像(url)：</p>
                                    <a href="http://localhost:3000/images/logo/logo.png" className="font-medium">https://logo.png</a>
                                </li>
                            </ul>

                            <hr className="my-2" />

                            <FriendComment setRefreshKey={setRefreshKey} refreshKey={refreshKey}></FriendComment>

                            <form onSubmit={handleSubmit}>
                                {/* 提交表单 */}
                                <div className="flex flex-col gap-4 md:relative my-2 border-1 p-3 rounded-lg">
                                    <Input value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="font-bold" type="text" variant="bordered"
                                        labelPlacement="outside-left"
                                        label="站点标题:" />

                                    <Input value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        className="font-bold" type="url" variant="bordered"
                                        labelPlacement="outside-left" label="Website:"
                                    />

                                    <Input value={desc}
                                        onChange={(e) => setDesc(e.target.value)}
                                        className="font-bold" type="text" variant="bordered"
                                        labelPlacement="outside-left" label="站点描述:" />

                                    <Input value={siteImgUrl}
                                        onChange={(e) => setSiteImgUrl(e.target.value)}
                                        className="font-bold" type="text" variant="bordered"
                                        labelPlacement="outside-left" label="站点头像:" />

                                    <Button
                                        isDisabled={!LoginState}
                                        isLoading={isSubmitting}
                                        className="md:absolute md:bottom-3 md:right-3 md:w-[20%]" color="primary"
                                        type="submit" disabled={isSubmitting}
                                    >
                                        {!LoginState ? '请先登录' : isSubmitting ? '提交中' : '提交'}
                                    </Button>

                                </div>
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
};
