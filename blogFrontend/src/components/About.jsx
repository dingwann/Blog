import { useLayoutEffect, useContext, useState } from "react"
import Login from "../components/Login"
import './AboutFoot'
import AboutFoot from "./AboutFoot"
import { LoginContext } from '../components/LoginContext';
import { ToastContainer, toast } from 'react-toastify';



export default function About(props) {
    const { themestate } = useContext(LoginContext);

    // 刷新 MessageComment 组件的状态
    const [refreshKey, setRefreshKey] = useState(0);

    useLayoutEffect(() => {
        window.scrollTo({
            top: 0,
            // behavior: 'smooth'
        })

    }, [])

    function Copy(c) {
        navigator.clipboard.writeText(c)
        toast('✅ Copy成功', {
            position: "bottom-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: themestate ? "light" : "dark",
            progress: undefined,
        });
    }


    return (
        <>
            <div className="px-4 w-full relative">
                <Login></Login>
                <ToastContainer limit={4} />
                <div className="animate-fade-up pt-4 text-center flex flex-col items-center px-[8px] md:px-[56px] lg:pt-5 md:pt-6 sm:pt-6 xl:pt-16">
                    <div className="w-full lg:w-[80%] md:w-full sm:w-full xl:max-w-[1000px] xl:w-[80%]">
                        <div className="text-left flex flex-col">
                            <h1 className="text-5xl text-violet-400 font-bold">About</h1>
                            <div className="py-4">
                                <span>
                                    About me and this site , you can find the contact information here .
                                </span>
                            </div>
                        </div>

                        <div className="text-left">
                            <div className="z-2">
                                <h2 className="group space-x-1 scroll-mt-[80px] flex relative items-center left-[-25px] m-0 mb-[25.2px]">
                                    <span className="text-[rgba(0,0,0,0)] transition-all group-hover:text-[#888888]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 36 36"><path fill="currentColor" d="M32 12h-6.66l1.55-7.74a1 1 0 0 0-2-.39L23.3 12h-8.19l1.55-7.74a1 1 0 0 0-2-.39L13.07 12H6a1 1 0 0 0 0 2h6.67l-1.6 8H4a1 1 0 0 0 0 2h6.66l-1.55 7.74a1 1 0 0 0 .79 1.17a.68.68 0 0 0 .2 0a1 1 0 0 0 1-.8L12.7 24h8.19l-1.55 7.74a1 1 0 0 0 .79 1.17a.62.62 0 0 0 .19 0a1 1 0 0 0 1-.8L22.93 24H30a1 1 0 0 0 0-2h-6.67l1.61-8H32a1 1 0 0 0 0-2M21.29 22H13.1l1.61-8h8.19Z" /></svg>
                                    </span>
                                    <a className="hover:underline">who is me.</a>
                                </h2>
                                <p className="mb-[21px] leading-7">
                                    Hello，我是一名人工智能专业在读学生。目前对后端知识感兴趣，准备学习 Java 或者 C++ 相关知识。
                                    <br />
                                    平时喜欢折腾前端一些有趣的东西。
                                </p>

                                <h2 className="group space-x-1 scroll-mt-[80px] flex relative items-center left-[-25px] m-0 mt-[50.4px] mb-[25.2px]">
                                    <span className="text-[rgba(0,0,0,0)] transition-all group-hover:text-[#888888]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 36 36"><path fill="currentColor" d="M32 12h-6.66l1.55-7.74a1 1 0 0 0-2-.39L23.3 12h-8.19l1.55-7.74a1 1 0 0 0-2-.39L13.07 12H6a1 1 0 0 0 0 2h6.67l-1.6 8H4a1 1 0 0 0 0 2h6.66l-1.55 7.74a1 1 0 0 0 .79 1.17a.68.68 0 0 0 .2 0a1 1 0 0 0 1-.8L12.7 24h8.19l-1.55 7.74a1 1 0 0 0 .79 1.17a.62.62 0 0 0 .19 0a1 1 0 0 0 1-.8L22.93 24H30a1 1 0 0 0 0-2h-6.67l1.61-8H32a1 1 0 0 0 0-2M21.29 22H13.1l1.61-8h8.19Z" /></svg>
                                    </span>
                                    <a className="hover:underline">what i do.</a>
                                </h2>
                                <p className="mb-[21px]">
                                    毕业后想从事相关的行业，能在闲暇时间力所能及的发展自己的爱好，积极努力的学习前沿的技术。
                                </p>

                                <h2 className="group space-x-1 scroll-mt-[80px] flex relative items-center left-[-25px] m-0 mt-[50.4px] mb-[25.2px]">
                                    <span className="text-[rgba(0,0,0,0)] transition-all group-hover:text-[#888888]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 36 36"><path fill="currentColor" d="M32 12h-6.66l1.55-7.74a1 1 0 0 0-2-.39L23.3 12h-8.19l1.55-7.74a1 1 0 0 0-2-.39L13.07 12H6a1 1 0 0 0 0 2h6.67l-1.6 8H4a1 1 0 0 0 0 2h6.66l-1.55 7.74a1 1 0 0 0 .79 1.17a.68.68 0 0 0 .2 0a1 1 0 0 0 1-.8L12.7 24h8.19l-1.55 7.74a1 1 0 0 0 .79 1.17a.62.62 0 0 0 .19 0a1 1 0 0 0 1-.8L22.93 24H30a1 1 0 0 0 0-2h-6.67l1.61-8H32a1 1 0 0 0 0-2M21.29 22H13.1l1.61-8h8.19Z" /></svg>
                                    </span>
                                    <a className="hover:underline">Tech Stack.</a>
                                </h2>
                                <ul className="mb-[21px]">
                                    <li id="wc" className="my-[8.4px] flex items-center">
                                        <span>
                                            <svg className="text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 15 15"><path fill="currentColor" d="M9.875 7.5a2.375 2.375 0 1 1-4.75 0a2.375 2.375 0 0 1 4.75 0" />
                                            </svg>
                                        </span>
                                        喜欢的语言:&nbsp;Python、JavaScript、TypeScript
                                    </li>
                                    <li id="wc" className="my-[8.4px] flex items-center">
                                        <span>
                                            <svg className="text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 15 15"><path fill="currentColor" d="M9.875 7.5a2.375 2.375 0 1 1-4.75 0a2.375 2.375 0 0 1 4.75 0" />
                                            </svg>
                                        </span>
                                        框架:&nbsp;Django、Express、React、Next
                                    </li>
                                    <li id="wc" className="my-[8.4px] flex items-center">
                                        <span>
                                            <svg className="text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 15 15"><path fill="currentColor" d="M9.875 7.5a2.375 2.375 0 1 1-4.75 0a2.375 2.375 0 0 1 4.75 0" />
                                            </svg>
                                        </span>
                                        数据库:&nbsp;MySQL、MongoDB
                                    </li>
                                    <li id="wc" className="my-[8.4px] flex items-center">
                                        <span>
                                            <svg className="text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 15 15"><path fill="currentColor" d="M9.875 7.5a2.375 2.375 0 1 1-4.75 0a2.375 2.375 0 0 1 4.75 0" />
                                            </svg>
                                        </span>
                                        中间件:&nbsp;Redis、Nginx
                                    </li>
                                    <li id="wc" className="my-[8.4px] flex items-center">
                                        <span>
                                            <svg className="text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 15 15"><path fill="currentColor" d="M9.875 7.5a2.375 2.375 0 1 1-4.75 0a2.375 2.375 0 0 1 4.75 0" />
                                            </svg>
                                        </span>
                                        其他:&nbsp;Docker、Git、Thrift、Centos、Ubuntu
                                    </li>
                                </ul>


                                <h2 className="group space-x-1 scroll-mt-[80px] flex relative items-center left-[-25px] m-0 mt-[50.4px] mb-[25.2px]">
                                    <span className="text-[rgba(0,0,0,0)] transition-all group-hover:text-[#888888]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 36 36"><path fill="currentColor" d="M32 12h-6.66l1.55-7.74a1 1 0 0 0-2-.39L23.3 12h-8.19l1.55-7.74a1 1 0 0 0-2-.39L13.07 12H6a1 1 0 0 0 0 2h6.67l-1.6 8H4a1 1 0 0 0 0 2h6.66l-1.55 7.74a1 1 0 0 0 .79 1.17a.68.68 0 0 0 .2 0a1 1 0 0 0 1-.8L12.7 24h8.19l-1.55 7.74a1 1 0 0 0 .79 1.17a.62.62 0 0 0 .19 0a1 1 0 0 0 1-.8L22.93 24H30a1 1 0 0 0 0-2h-6.67l1.61-8H32a1 1 0 0 0 0-2M21.29 22H13.1l1.61-8h8.19Z" /></svg>
                                    </span>
                                    <a className="hover:underline">Contact.</a>
                                </h2>
                                <ul className="mb-[21px]">
                                    <li id="wc" className="my-[8.4px] flex items-center">
                                        <span>
                                            <svg className="text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 15 15"><path fill="currentColor" d="M9.875 7.5a2.375 2.375 0 1 1-4.75 0a2.375 2.375 0 0 1 4.75 0" />
                                            </svg>
                                        </span>
                                        Email:&nbsp;
                                        <div className="group flex flex-col relative">
                                            <div className="animate-[fade-up_0.3s_both] easeinout bg-white p-1 px-2 absolute bottom-[24px] text-violet-400 hidden group-hover:flex justify-center items-center space-x-2 rounded-md shadow-md border-1">
                                                <a className="text-sm flex space-x-1 hover:underline underline-offset-4" href="mailto:catchskatecc@gmail.com">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path fill="currentColor" d="m232.49 112.49l-48 48a12 12 0 0 1-17-17L195 116h-30a84 84 0 0 0-81.36 63a12 12 0 1 1-23.24-6A107.94 107.94 0 0 1 165 92h30l-27.49-27.52a12 12 0 0 1 17-17l48 48a12 12 0 0 1-.02 17.01M192 204H44V88a12 12 0 0 0-24 0v128a12 12 0 0 0 12 12h160a12 12 0 0 0 0-24" />
                                                    </svg>
                                                    <p id="email">catchskatecc@gmail.com</p>
                                                </a>
                                                <button className="text-sm flex space-x-1 hover:underline underline-offset-4" onClick={() => Copy("catchskatecc@gmail.com")}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M7 9.667A2.667 2.667 0 0 1 9.667 7h8.666A2.667 2.667 0 0 1 21 9.667v8.666A2.667 2.667 0 0 1 18.333 21H9.667A2.667 2.667 0 0 1 7 18.333z" /><path d="M4.012 16.737A2 2 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1" /></g>
                                                    </svg>
                                                    <p>Copy</p>
                                                </button>
                                            </div>
                                            <a className="relative text-violet-400 hover:underline underline-offset-4" href="mailto:catchskatecc@gmail.com">
                                                catchskatecc@gmail.com
                                            </a>
                                        </div>

                                    </li>
                                    {/* Github */}
                                    <li id="wc" className="my-[8.4px] flex items-center">
                                        <span>
                                            <svg className="text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 15 15"><path fill="currentColor" d="M9.875 7.5a2.375 2.375 0 1 1-4.75 0a2.375 2.375 0 0 1 4.75 0" />
                                            </svg>
                                        </span>
                                        Github:&nbsp;
                                        <div className="group flex flex-col relative">
                                            <div className="animate-[fade-up_0.3s_both] easeinout bg-white p-1 px-2 absolute bottom-[24px] text-violet-400 hidden group-hover:flex justify-center items-center space-x-2 rounded-md shadow-md border-1">
                                                <a className="text-sm flex space-x-1 hover:underline underline-offset-4" href="https://github.com/dingwann" target="_blank">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path fill="currentColor" d="m232.49 112.49l-48 48a12 12 0 0 1-17-17L195 116h-30a84 84 0 0 0-81.36 63a12 12 0 1 1-23.24-6A107.94 107.94 0 0 1 165 92h30l-27.49-27.52a12 12 0 0 1 17-17l48 48a12 12 0 0 1-.02 17.01M192 204H44V88a12 12 0 0 0-24 0v128a12 12 0 0 0 12 12h160a12 12 0 0 0 0-24" />
                                                    </svg>
                                                    <p>github.com/dingwann</p>
                                                </a>
                                                <button className="text-sm flex space-x-1 hover:underline underline-offset-4" onClick={() => Copy("github.com/dingwann")}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M7 9.667A2.667 2.667 0 0 1 9.667 7h8.666A2.667 2.667 0 0 1 21 9.667v8.666A2.667 2.667 0 0 1 18.333 21H9.667A2.667 2.667 0 0 1 7 18.333z" /><path d="M4.012 16.737A2 2 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1" /></g>
                                                    </svg>
                                                    <p>Copy</p>
                                                </button>
                                            </div>
                                            <a className="relative text-violet-400 hover:underline underline-offset-4" href="https://github.com/dingwann" target="_blank">
                                                github.com
                                            </a>
                                        </div>
                                    </li>
                                    <li id="wc" className="my-[8.4px] flex items-center">
                                        <span>
                                            <svg className="text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 15 15"><path fill="currentColor" d="M9.875 7.5a2.375 2.375 0 1 1-4.75 0a2.375 2.375 0 0 1 4.75 0" />
                                            </svg>
                                        </span>
                                        BiliBili:&nbsp;
                                        <div className="group flex flex-col relative">
                                            <div className="animate-[fade-up_0.3s_both] easeinout bg-white p-1 px-2 absolute bottom-[24px] text-violet-400 hidden group-hover:flex justify-center items-center space-x-2 rounded-md shadow-md border-1">
                                                <a className="text-sm flex space-x-1 hover:underline underline-offset-4" href="https://space.bilibili.com/87104532" target="_blank">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path fill="currentColor" d="m232.49 112.49l-48 48a12 12 0 0 1-17-17L195 116h-30a84 84 0 0 0-81.36 63a12 12 0 1 1-23.24-6A107.94 107.94 0 0 1 165 92h30l-27.49-27.52a12 12 0 0 1 17-17l48 48a12 12 0 0 1-.02 17.01M192 204H44V88a12 12 0 0 0-24 0v128a12 12 0 0 0 12 12h160a12 12 0 0 0 0-24" />
                                                    </svg>
                                                    <p>https://space.bilibili.com/87104532</p>
                                                </a>
                                                <button className="text-sm flex space-x-1 hover:underline underline-offset-4" onClick={() => Copy("https://space.bilibili.com/87104532")}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M7 9.667A2.667 2.667 0 0 1 9.667 7h8.666A2.667 2.667 0 0 1 21 9.667v8.666A2.667 2.667 0 0 1 18.333 21H9.667A2.667 2.667 0 0 1 7 18.333z" /><path d="M4.012 16.737A2 2 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1" /></g>
                                                    </svg>
                                                    <p>Copy</p>
                                                </button>
                                            </div>
                                            <a className="relative text-violet-400 hover:underline underline-offset-4" href="https://space.bilibili.com/87104532" target="_blank">
                                                space.bilibili.com
                                            </a>
                                        </div>
                                    </li>
                                </ul>

                                <span className="mt-[50.4px] mb-[25.2px] flex flex-col items-center space-y-2">
                                    <div className="flex self-start rounded-lg">
                                        开发过程中借鉴了以下网址，特别感谢其设计和开源精神。
                                    </div>

                                    <div className="flex self-start rounded-lg">
                                        <a className="text-violet-400 hover:text-violet-300 underline underline-offset-2" href="https://fuxiaochen.com/" target="_blank">fuxiaochen</a>
                                    </div>

                                    <div className="flex self-start rounded-lg">
                                        <a className="text-violet-400 hover:text-violet-300 underline underline-offset-2" href="https://vio.vin" target="_blank">薇尔薇</a>
                                    </div>
                                </span>

                                <AboutFoot setRefreshKey={setRefreshKey} refreshKey={refreshKey} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};