import React, { useState, useEffect, useLayoutEffect } from "react"
import Login from './Login'
import { Viewer } from "@bytemd/react";
import gfm from '@bytemd/plugin-gfm';// 支持GFM
import highlight from '@bytemd/plugin-highlight';// 代码高亮
import '../assets/css/highlight.scss'  // 高亮主题
import frontmatter from '@bytemd/plugin-frontmatter';// 解析前题
import mediumZoom from '@bytemd/plugin-medium-zoom';// 缩放图片
import gemoji from '@bytemd/plugin-gemoji';// 支持Gemoji
import math from '@bytemd/plugin-math';  // 支持数学公式
import breaks from '@bytemd/plugin-breaks';  // 支持中断
import '../assets/css/index.css'  // 基础样式
import 'juejin-markdown-themes/dist/juejin.css';// 掘金同款样式
import { toast } from 'react-toastify';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import http from './Axiosconfig'
import formatDate, { weekDay } from "./FormatDate";

const plugins = [
    gfm(), // GFM
    highlight(), // 代码高亮
    frontmatter(), // 解析前题
    mediumZoom(), // 图片缩放
    gemoji(), // Gemoji短代码
    math(), // 数学公式
    breaks(), // 中断
]


export default function Article(props) {
    const { aid } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // 获取文章内容
    const [article, setArticle] = useState({})
    useLayoutEffect(() => {
        async function getArticle() {
            const res = await http.get(`/api/articles/getarticle/${aid}`)
            // console.log(res)
            if (res.data.code === 1) {
                setArticle(res.data.data)
            } else {
                toast(`😢 ${res.data.msg}`, {
                    position: "top-center",
                    autoClose: 1200,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: themestate ? "light" : "dark",
                    progress: undefined,
                })
            }
        }

        getArticle()
    }, [aid])


    return (
        <>
            <Login></Login>
            {/* 返回上一级 */}
            <div className="animate-fade-up easeinout flex flex-col mt-4 gap-6 mx-4 p-2 md:mx-24 lg:mt-5 sm:mt-6 md:mt-6 xl:mt-8">
                <span onClick={() => {
                    if (location.state?.from) {
                        navigate(-1);
                    } else {
                        navigate('/blog'); // 指定默认页面的URL
                    }
                }} className="select-none w-32 hover:cursor-pointer hover:text-gray-400 text-gray-500 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 1024 1024"><path fill="currentColor" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64" /><path fill="currentColor" d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z" />
                    </svg>
                    返回博客
                </span>

                {/* 信息 */}
                <span className="flex items-center gap-6">
                    {/* 时间 */}
                    <span className="text-gray-500">
                        发布于&nbsp;{weekDay(formatDate(article.createdAt).split(' ')[0])}，{formatDate(article.createdAt).split(' ')[0]}
                    </span>
                    {/* 浏览量 */}
                    <span className="text-gray-500 flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path fill="currentColor" d="M247.31 124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57 61.26 162.88 48 128 48S61.43 61.26 36.34 86.35C17.51 105.18 9 124 8.69 124.76a8 8 0 0 0 0 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208s66.57-13.26 91.66-38.34c18.83-18.83 27.3-37.61 27.65-38.4a8 8 0 0 0 0-6.5M128 192c-30.78 0-57.67-11.19-79.93-33.25A133.5 133.5 0 0 1 25 128a133.3 133.3 0 0 1 23.07-30.75C70.33 75.19 97.22 64 128 64s57.67 11.19 79.93 33.25A133.5 133.5 0 0 1 231.05 128c-7.21 13.46-38.62 64-103.05 64m0-112a48 48 0 1 0 48 48a48.05 48.05 0 0 0-48-48m0 80a32 32 0 1 1 32-32a32 32 0 0 1-32 32" />
                        </svg>
                        {article.views}&nbsp;浏览量
                    </span>
                </span>

                {/* 标题 */}
                <span className="text-4xl md:text-5xl text-inherit font-medium py-4">
                    {article.title}
                </span>

                {/* 文章描述 */}
                <span className="text-gray-500 text-lg">
                    {article.desc}
                </span>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 mt-4 gap-6 mx-4 p-2 md:mx-24 lg:mt-5 sm:mt-6 md:mt-6 xl:mt-8">
                {/* 文章 */}
                <div className="animate-fade-up easeinout pr-2 lg:col-span-3 border-r-1" style={{ animationDelay: '200ms' }}>

                    {/* markdown内容 */}
                    <Viewer
                        value={article.content}
                        plugins={plugins}
                    >
                    </Viewer>
                </div>

                {/* 目录 */}
                <div className="animate-fade-up easeinout max-lg:hidden h-[320px] p-[35px] gap-2 sticky top-20 ease-in-out duration-300"
                    style={{ animationDelay: '400ms' }}
                >
                    <span className="h-auto flex flex-col gap-4">
                        <p>目录</p>
                        <span>
                            目录内容
                        </span>
                    </span>
                </div>
            </div>
        </>
    )
}