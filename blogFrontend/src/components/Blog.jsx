import { useEffect, useLayoutEffect, useState, useContext } from "react"
import Login from "./Login";
import { LoginContext } from './LoginContext'
import http from './Axiosconfig'
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import formatDate from "./FormatDate";


export default function Blog(props) {
    const { themestate } = useContext(LoginContext)

    // 文章列表
    const [articleList, setArticleList] = useState([])

    useLayoutEffect(() => {
        window.localStorage.setItem('themeState', JSON.stringify(themestate));
    }, [themestate]);

    useLayoutEffect(() => {
        window.scrollTo({
            top: 0,
            // behavior: 'smooth'
        })
    }, [])

    useLayoutEffect(() => {
        async function fetchData() {
            const res = await http.get(`/api/articles/getarticlelist`)

            if (res.data.code === 1) {

                setArticleList(res.data.data)

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
        fetchData()
    }, [])

    return (
        <>
            <div className="px-4 w-full relative">
                <Login />
                <ToastContainer limit={3} />
                <div id='blog' className="animate-fade-up px-[8px] md:px-[56px] pt-4 lg:mx-[12.8%] lg:pt-5 md:pt-6 sm:pt-6 xl:pt-16">
                    <h2 className="text-inherit text-5xl text-violet-400 font-bold pb-8">BLOG</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {articleList.map((item, index) => (
                            <li key={index} className="hover:cursor-pointer">
                                <Link to={`/blog/${item._id}`} className={`${themestate ? "flex flex-col justify-between h-full px-6 py-4 transition-colors rounded-lg bg-transparent hover:bg-gray-50" : "flex flex-col justify-between h-full px-6 py-4 transition-colors rounded-lg bg-transparent hover:bg-gray-700"}`}>
                                    <ul className="text-xs font-medium text-muted-foreground mb-1 flex space-x-4">
                                        {item.tag.map((tags, index) => (
                                            <li key={index} className=" text-gray-500">
                                                #&nbsp;
                                                {tags}
                                            </li>
                                        )
                                        )}
                                    </ul>
                                    <h4 className="text-xl font-medium line-clamp-1 mb-2">
                                        {item.title}
                                    </h4>
                                    <p className="line-clamp-2 text-sm mb-3 overflow-hidden">
                                        {item.desc}
                                    </p>
                                    <div className="text-xs flex space-x-2 text-gray-500">
                                        <div className="flex space-x-1 items-center h-5">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="currentColor" d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V3q0-.425.288-.712T7 2t.713.288T8 3v1h8V3q0-.425.288-.712T17 2t.713.288T18 3v1h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5zM5 8h14V6H5zm0 0V6zm7 6q-.425 0-.712-.288T11 13t.288-.712T12 12t.713.288T13 13t-.288.713T12 14m-4 0q-.425 0-.712-.288T7 13t.288-.712T8 12t.713.288T9 13t-.288.713T8 14m8 0q-.425 0-.712-.288T15 13t.288-.712T16 12t.713.288T17 13t-.288.713T16 14m-4 4q-.425 0-.712-.288T11 17t.288-.712T12 16t.713.288T13 17t-.288.713T12 18m-4 0q-.425 0-.712-.288T7 17t.288-.712T8 16t.713.288T9 17t-.288.713T8 18m8 0q-.425 0-.712-.288T15 17t.288-.712T16 16t.713.288T17 17t-.288.713T16 18" />
                                            </svg>
                                            <p>{formatDate(item.createdAt).split(' ')[0]}</p>
                                        </div>
                                        <div className="flex space-x-1 items-center h-5">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 256"><path fill="currentColor" d="M247.31 124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57 61.26 162.88 48 128 48S61.43 61.26 36.34 86.35C17.51 105.18 9 124 8.69 124.76a8 8 0 0 0 0 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208s66.57-13.26 91.66-38.34c18.83-18.83 27.3-37.61 27.65-38.4a8 8 0 0 0 0-6.5M128 192c-30.78 0-57.67-11.19-79.93-33.25A133.5 133.5 0 0 1 25 128a133.3 133.3 0 0 1 23.07-30.75C70.33 75.19 97.22 64 128 64s57.67 11.19 79.93 33.25A133.5 133.5 0 0 1 231.05 128c-7.21 13.46-38.62 64-103.05 64m0-112a48 48 0 1 0 48 48a48.05 48.05 0 0 0-48-48m0 80a32 32 0 1 1 32-32a32 32 0 0 1-32 32" />
                                            </svg>
                                            <p>{item.views}</p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}

                    </ul>
                </div>
            </div>
        </>
    )
};
