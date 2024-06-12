import Inputs from "./Input"
import Selects from "./Select"
import { Select, Button } from "antd"
import { SearchOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

export default function Blog(props) {

    function artShow() {
        // 改变文章公开状态
    }

    return (
        <>
            <div className="p-2 w-full h-full border-l-2 border-solid rounded-md">
                <div className="p-2">
                    <h2>文章管理</h2>
                    <hr className="my-2" />
                    <div className="flex gap-2 my-4">
                        <Inputs text="请输入标题" />
                        <Selects />
                        <Select
                            style={{
                                width: '100%',
                            }}
                            placeholder="请选择发布状态"
                            options={[
                                {
                                    value: 'show',
                                    label: '已公开文章',
                                },
                                {
                                    value: 'notshow',
                                    label: '私密文章',
                                }
                            ]} />
                        <Button icon={<SearchOutlined />} className="text-gray-500" style={{ width: '40%' }} href="" />
                        <Link className="border-2 border-solid px-2 rounded-md flex items-center font-medium text-nowrap text-inherit gap-1 hover:bg-slate-200 ease-in-out duration-300" to="/hashboard/add">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM5.92 19H5v-.92l9.06-9.06l.92.92zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83l3.75 3.75l1.83-1.83a.996.996 0 0 0 0-1.41" />
                            </svg>
                            Add article
                        </Link>
                    </div>

                    <div className="border-2 border-solid rounded-md py-2 h-[82vh] flex flex-col gap-2">
                        {/* 头部 */}
                        <div className="grid grid-cols-7 gap-2 mx-2">
                            <span className="flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M10.5 20V7H5V4h14v3h-5.5v13z" />
                                </svg>
                                <p className="text-inherit font-bold">标题</p>
                            </span>
                            <span className="flex justify-center items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M9.775 12q-.9 0-1.5-.675T7.8 9.75l.325-2.45q.2-1.425 1.3-2.363T12 4t2.575.938t1.3 2.362l.325 2.45q.125.9-.475 1.575t-1.5.675zm0-2h4.45L13.9 7.6q-.1-.7-.637-1.15T12 6t-1.263.45T10.1 7.6zM4 18v-.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2v.8q0 .825-.587 1.413T18 20H6q-.825 0-1.412-.587T4 18m2 0h12v-.8q0-.275-.137-.5t-.363-.35q-1.35-.675-2.725-1.012T12 15t-2.775.338T6.5 16.35q-.225.125-.363.35T6 17.2zm6 0" />
                                </svg>
                                <p className="text-inherit font-bold">作者</p>
                            </span>
                            <span className="flex justify-center items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m21.41 11.58l-9-9A2 2 0 0 0 11 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 .59 1.42l9 9A2 2 0 0 0 13 22a2 2 0 0 0 1.41-.59l7-7A2 2 0 0 0 22 13a2 2 0 0 0-.59-1.42M13 20l-9-9V4h7l9 9M6.5 5A1.5 1.5 0 1 1 5 6.5A1.5 1.5 0 0 1 6.5 5" />
                                </svg>
                                <p className="text-inherit font-bold">标签</p>
                            </span>
                            <span className="flex justify-center items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.1em" height="1.1em" viewBox="0 0 256 256"><path fill="currentColor" d="M247.31 124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57 61.26 162.88 48 128 48S61.43 61.26 36.34 86.35C17.51 105.18 9 124 8.69 124.76a8 8 0 0 0 0 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208s66.57-13.26 91.66-38.34c18.83-18.83 27.3-37.61 27.65-38.4a8 8 0 0 0 0-6.5M128 192c-30.78 0-57.67-11.19-79.93-33.25A133.5 133.5 0 0 1 25 128a133.3 133.3 0 0 1 23.07-30.75C70.33 75.19 97.22 64 128 64s57.67 11.19 79.93 33.25A133.5 133.5 0 0 1 231.05 128c-7.21 13.46-38.62 64-103.05 64m0-112a48 48 0 1 0 48 48a48.05 48.05 0 0 0-48-48m0 80a32 32 0 1 1 32-32a32 32 0 0 1-32 32" />
                                </svg>
                                <p className="text-inherit font-bold">发布状态</p>
                            </span>
                            <span className="flex justify-center items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V3q0-.425.288-.712T7 2t.713.288T8 3v1h8V3q0-.425.288-.712T17 2t.713.288T18 3v1h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5zM5 8h14V6H5zm0 0V6zm7 6q-.425 0-.712-.288T11 13t.288-.712T12 12t.713.288T13 13t-.288.713T12 14m-4 0q-.425 0-.712-.288T7 13t.288-.712T8 12t.713.288T9 13t-.288.713T8 14m8 0q-.425 0-.712-.288T15 13t.288-.712T16 12t.713.288T17 13t-.288.713T16 14m-4 4q-.425 0-.712-.288T11 17t.288-.712T12 16t.713.288T13 17t-.288.713T12 18m-4 0q-.425 0-.712-.288T7 17t.288-.712T8 16t.713.288T9 17t-.288.713T8 18m8 0q-.425 0-.712-.288T15 17t.288-.712T16 16t.713.288T17 17t-.288.713T16 18" />
                                </svg>
                                <p className="text-inherit font-bold">创建时间</p>
                            </span>
                            <span className="flex justify-center items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V3q0-.425.288-.712T7 2t.713.288T8 3v1h8V3q0-.425.288-.712T17 2t.713.288T18 3v1h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5zM5 8h14V6H5zm0 0V6zm7 6q-.425 0-.712-.288T11 13t.288-.712T12 12t.713.288T13 13t-.288.713T12 14m-4 0q-.425 0-.712-.288T7 13t.288-.712T8 12t.713.288T9 13t-.288.713T8 14m8 0q-.425 0-.712-.288T15 13t.288-.712T16 12t.713.288T17 13t-.288.713T16 14m-4 4q-.425 0-.712-.288T11 17t.288-.712T12 16t.713.288T13 17t-.288.713T12 18m-4 0q-.425 0-.712-.288T7 17t.288-.712T8 16t.713.288T9 17t-.288.713T8 18m8 0q-.425 0-.712-.288T15 17t.288-.712T16 16t.713.288T17 17t-.288.713T16 18" />
                                </svg>
                                <p className="text-inherit font-bold">更新时间</p>
                            </span>
                        </div>

                        <hr />

                        <div className="h-full">
                            {/* 文章列表 */}
                            <div className="grid grid-cols-7 gap-2 mx-2 py-1">
                                <span className="flex items-center justify-center">
                                    <p>忽如一夜春风来，千树万树梨花开。</p>
                                </span>

                                <span className="flex items-center justify-center">
                                    <p>丁烷</p>
                                </span>

                                <span className="flex items-center gap-1">
                                    <span className="bg-black rounded-2xl text-white px-2">
                                        TypeScript
                                    </span>
                                    <span className="bg-black rounded-2xl text-white px-2">
                                        React
                                    </span>
                                </span>

                                <span className="flex items-center justify-center">
                                    <input type="checkbox" className="toggle" defaultChecked={true} onChange={artShow} />
                                </span>

                                <span className="flex items-center justify-center gap-2">
                                    <span>2024-1-1</span>
                                    <span>16:00</span>
                                </span>

                                <span className="flex items-center justify-center gap-2">
                                    <span>2024-1-1</span>
                                    <span>16:22</span>
                                </span>

                                <span className="flex items-center justify-center gap-10">
                                    {/* 编辑 */}
                                    <svg className="hover:cursor-pointer hover:text-gray-400" xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z" />
                                    </svg>
                                    {/* 删除 */}
                                    <svg className="hover:cursor-pointer text-red-600 hover:text-red-300" xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z" />
                                    </svg>
                                </span>

                                {/* <span className="flex items-center justify-center text-red-500 hover:cursor-pointer hover:text-red-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z" />
                                </svg>
                            </span> */}
                            </div>
                            <hr />

                            <div className="grid grid-cols-7 gap-2 mx-2 py-1">
                                <span className="flex items-center justify-center">
                                    <p>忽如一夜春风来，千树万树梨花开。</p>
                                </span>

                                <span className="flex items-center justify-center">
                                    <p>丁烷</p>
                                </span>

                                <span className="flex items-center gap-1">
                                    <span className="bg-black rounded-2xl text-white px-2">
                                        TypeScript
                                    </span>
                                    <span className="bg-black rounded-2xl text-white px-2">
                                        React
                                    </span>
                                </span>

                                <span className="flex items-center justify-center">
                                    <input type="checkbox" className="toggle" defaultChecked={true} onChange={artShow} />
                                </span>

                                <span className="flex items-center justify-center gap-2">
                                    <span>2024-1-1</span>
                                    <span>16:00</span>
                                </span>

                                <span className="flex items-center justify-center gap-2">
                                    <span>2024-1-1</span>
                                    <span>16:22</span>
                                </span>

                                <span className="flex items-center justify-center gap-10">
                                    {/* 编辑 */}
                                    <svg className="hover:cursor-pointer hover:text-gray-400" xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z" />
                                    </svg>
                                    {/* 删除 */}
                                    <svg className="hover:cursor-pointer text-red-600 hover:text-red-300" xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z" />
                                    </svg>
                                </span>

                                {/* <span className="flex items-center justify-center text-red-500 hover:cursor-pointer hover:text-red-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z" />
                                </svg>
                            </span> */}
                            </div>
                            <hr />
                        </div>

                        {/* 底部 */}

                        <div className="flex items-center justify-between gap-2 p-2">
                            <span className="flex items-center gap-2">
                                <p>显示第 {1} 页，该页共 {10} 条。</p>
                            </span>

                            <span className="flex items-center gap-2">
                                <div className="join grid grid-cols-2 border-2">
                                    <button className="join-item btn-md btn-outline">Previous page</button>
                                    <button className="join-item btn-md btn-outline">Next</button>
                                </div>
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
};
