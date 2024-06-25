import { useLayoutEffect, useState, useContext, useEffect } from "react"
import { LoginContext } from './LoginContext'
import { baseURL } from './Axiosconfig'
import http from './Axiosconfig'
import { toast } from 'react-toastify';
import About from './../../../blogBg/src/components/About';

export default function GridTwo(props) {
    const { themestate } = useContext(LoginContext)

    const [love, setLove] = useState({
        code: 0,
        count: 0,
        msg: ''
    })

    const [time, setTime] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })


    useLayoutEffect(() => {
        async function getLove() {
            const res = await http.get(`/api/count`)
            setLove(res.data)
        }
        getLove()
    }, [])

    useEffect(() => {
        let isMounted = true

        async function getTime() {
            try {
                const date = await http.get(`/api/running_time`)
                if (isMounted) setTime(date.data);

            } catch (error) {
                console.error('There was an error fetching the data!', error);
            }
        }

        getTime()

        const intervalId = setInterval(getTime, 60000); // 每分钟更新一次
        return () => {
            isMounted = false;
            clearInterval(intervalId); // Clean up interval on component unmount
        };
    }, [])


    async function loveChange() {
        const res = await http.get(`/api/like`)
        if (res.data.code === 1) {
            setLove(res.data)
        } else {
            // 点过了
            toast(`😄 ${res.data.msg}`, {
                position: "bottom-right",
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

    return (
        <div style={{ animationDelay: '1300ms' }} className="animate-fade-up easeinout border-1 shadow-md border-solid py-2 px-5 lg:col-span-3 flex flex-col space-y-4 justify-between items-center rounded-[12px]">
            <div className="w-[82px] h-[82px] my-2 self-start flex items-center space-x-4">
                <img className="rounded-full select-none object-cover" src={`${baseURL}/images/headImgs/headImg5.png`} alt="headerImg" />
                <span className="text-nowrap font-bold text-inherit text-xl">Site Running:
                    <p className="text-lg">
                        {time?.days} 天 {time?.hours} 小时 {time?.minutes} 分钟
                    </p>
                </span>
            </div>

            <div className="flex self-start rounded-lg max-lg:hidden space-y-4">
                <span className="">目前是一名在校生，想做一名优秀的程序员。</span>
            </div>

            <span className="flex self-start rounded-lg max-lg:hidden">

            </span>

            {/* <div className="flex self-start rounded-lg max-lg:hidden">
                2
            </div>

            <div className="flex self-start rounded-lg max-lg:hidden">
                3
            </div> */}
            {/* 
            <div className="flex self-start rounded-lg max-lg:hidden">
                111
            </div> */}

            <span className="flex self-start rounded-lg max-lg:hidden">
                Living in
                <a href="https://unsplash.com/s/photos/chengdu" target="_blank" className="text-violet-400 hover:underline">
                    &nbsp;Cheng'du
                </a>.
            </span>

            <button onClick={loveChange} className={`flex items-center justify-center rounded-md px-2 py-1 transition ease-in-out delay-150 bg-indigo-300 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-400 duration-300`}>
                <p className="text-inherit text-sm font-[550]">喜欢本站</p>
                {/* <svg className={`mx-2 text-gray-600`} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m12 5.5l-.54.52l.01.011zM8.962 18.91l-.465.59zm6.076 0l-.464-.588zm-8.037-2.49a.75.75 0 0 0-.954 1.16zm-4.659-3.009a.75.75 0 1 0 1.316-.72zm11.128-5.38a.75.75 0 1 0 1.06-1.062zM2.75 9.136c0-2.15 1.215-3.954 2.874-4.713c1.612-.737 3.778-.541 5.836 1.597l1.08-1.04C10.1 2.444 7.264 2.025 5 3.06C2.786 4.073 1.25 6.425 1.25 9.137zM8.497 19.5c.513.404 1.063.834 1.62 1.16c.557.325 1.193.59 1.883.59v-1.5c-.31 0-.674-.12-1.126-.385c-.453-.264-.922-.628-1.448-1.043zm7.006 0c1.426-1.125 3.25-2.413 4.68-4.024c1.457-1.64 2.567-3.673 2.567-6.339h-1.5c0 2.198-.9 3.891-2.188 5.343c-1.315 1.48-2.972 2.647-4.488 3.842zM22.75 9.137c0-2.712-1.535-5.064-3.75-6.077c-2.264-1.035-5.098-.616-7.54 1.92l1.08 1.04c2.058-2.137 4.224-2.333 5.836-1.596c1.659.759 2.874 2.562 2.874 4.713zm-8.176 9.185c-.526.415-.995.779-1.448 1.043c-.452.264-.816.385-1.126.385v1.5c.69 0 1.326-.265 1.883-.59c.558-.326 1.107-.756 1.62-1.16zm-5.148 0c-.796-.627-1.605-1.226-2.425-1.901l-.954 1.158c.83.683 1.708 1.335 2.45 1.92zm-5.768-5.63a7.252 7.252 0 0 1-.908-3.555h-1.5c0 1.638.42 3.046 1.092 4.275zm7.812-6.66l2 1.998l1.06-1.06l-2-2z" />
                </svg> */}

                {love.code === 0 ? (
                    <svg className="flex items-center mx-1 text-pink-400" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M8.266 11.908a1.773 1.773 0 0 1-2.527 0L1.49 7.7c-2.84-2.842.87-9.12 5.511-4.478c4.634-4.633 8.344 1.644 5.511 4.478z" />
                    </svg>
                ) : (
                    <svg className="flex items-center mx-1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="currentColor" fillRule="evenodd" d="M3.788 1.314c.988.02 2.085.49 3.214 1.56c1.127-1.067 2.223-1.536 3.21-1.555c1.04-.02 1.918.46 2.536 1.18c1.218 1.42 1.47 3.85-.058 5.377l-.001.001l-4.247 4.208c-.81.802-2.07.802-2.88 0L1.316 7.877C-.217 6.343.032 3.913 1.25 2.491c.617-.72 1.495-1.2 2.537-1.178Z" clipRule="evenodd" />
                    </svg>
                )}

                <span className="text-inherit font-[550]">{love.count}</span>
            </button>

        </div>
    )
};