import { useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import http from './Axiosconfig'


export default function Footer(props) {

    return (
        <>
            <footer className="w-full flex flex-col pt-8 pb-4 max-w-screen-xl mx-auto text-muted-foreground">
                <ul className="flex flex-wrap space-x-2 items-center justify-center">
                    <li>
                        <Link to={'/'} aria-label="首页" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 underline-offset-4 hover:underline h-10 py-2 text-muted-foreground hover:text-primary px-0">
                            首页
                        </Link>
                    </li>
                    <li>
                        <span className="mr-2">·</span>
                        <Link to={'blog'} aria-label="博客" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 underline-offset-4 hover:underline h-10 py-2 text-muted-foreground hover:text-primary px-0">
                            博客
                        </Link>
                    </li>
                    <li>
                        <span className="mr-2">·</span>
                        <Link to={'about'} aria-label="关于" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 underline-offset-4 hover:underline h-10 py-2 text-muted-foreground hover:text-primary px-0">
                            关于我
                        </Link>
                    </li>
                    <li>
                        <span className="mr-2">·</span>
                        <span className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 underline-offset-4 hover:underline h-10 py-2 !no-underline px-0 text-muted-foreground">
                            PV：{props.stats?.total_pv}
                        </span>
                    </li>
                    <li>
                        <span className="mr-2">·</span>
                        <span className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 underline-offset-4 hover:underline h-10 py-2 !no-underline px-0 text-muted-foreground">
                            UV：{props.stats?.total_uv}
                        </span>
                    </li>
                    <span className='flex space-x-2 items-center'>
                        <li>
                            <span className="mr-2">·</span>
                            <span className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 underline-offset-4 hover:underline h-10 py-2 !no-underline px-0 text-muted-foreground">
                                今日浏览：{props.stats?.today_pv}
                            </span>
                        </li>
                        <li>
                            <span className="mr-2">·</span>
                            <span className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 underline-offset-4 hover:underline h-10 py-2 !no-underline px-0 text-muted-foreground">
                                今日访客：{props.stats?.today_uv}
                            </span>
                        </li>
                        {/* <li>
                            <span className="mr-2">·</span>
                            <span className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 underline-offset-4 hover:underline h-10 py-2 !no-underline px-0 text-muted-foreground">
                                当前在线：
                            </span>
                        </li> */}
                    </span>
                </ul>
                <div className="p-1 w-full text-sm flex md:flex-row items-center justify-center md:space-y-0 md:space-x-2 ">
                    <span>
                        © {new Date().getFullYear()}
                    </span>
                    <span className="inline-block">·</span>
                    <span className="inline-block">Ding Wan</span>
                    <span className="inline-block">·</span>
                    <span className="inline-block">成为更好的自己</span>
                </div>
                <span className="p-1 w-full text-sm flex md:flex-row items-center justify-center md:space-y-0 md:space-x-2 ">
                    {/* 备案信息 */}
                    <a target="_blank" aria-label="X公网安备XXX号" className="gap-1 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 underline-offset-4 hover:underline text-muted-foreground hover:text-primary px-0 py-0 h-5 md:h-10 font-normal md:font-medium" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=36100002000386">
                        <img alt="X公网安备XXX号" loading="lazy" width="18" height="18" decoding="async" data-nimg="1" className="mr-1 -translate-y-[1px]" style={{ color: 'transparent' }} srcSet="https://beian.mps.gov.cn/img/logo01.dd7ff50e.png" src="https://beian.mps.gov.cn/img/logo01.dd7ff50e.png" />
                        <span>X公网安备XXX号</span>
                    </a>
                    <span className="inline-block">&nbsp;&nbsp;</span>
                    <a target="_blank" aria-label="XICP备XXX号" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 underline-offset-4 hover:underline text-muted-foreground hover:text-primary px-0 py-0 h-5 md:h-10 font-normal md:font-medium" href="https://beian.miit.gov.cn">
                        XICP备XXX号
                    </a>
                </span>
            </footer>
        </>
    )
};
