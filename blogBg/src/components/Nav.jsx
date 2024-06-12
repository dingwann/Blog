import { useState } from 'react';
import Darktheme from './Darktheme';
import Zhankai from './zhankai';
import { Link } from 'react-router-dom';

export default function Nav(props) {
    const [menu, setMenu] = useState(true);

    function changeMenu() {
        setMenu(!menu);
    }

    return (
        <>
            <div className="gap-4 flex flex-col items-center mx-6">
                <div>
                    <h2 className="flex justify-center text-2xl font-bold my-6">
                        DW
                    </h2>
                </div>
                {/* Nav */}
                <div className='m-2'>
                    <hr />
                    <div className="flex flex-col justify-center items-center">
                        <Link to={'home'} className=" select-none hover:underline underline-offset-4 cursor-pointer p-2 px-8 w-full text-center m-4 text-inherit font-bold border-2 rounded-lg">
                            站点统计
                        </Link>
                        <div className="flex flex-col pl-8 pr-2 py-2 w-full text-center m-4 text-inherit font-bold border-2 rounded-lg">
                            <div className='flex justify-between items-center select-none'>
                                <Link to={'blog'} onClick={changeMenu} className='pl-5 text-center hover:underline underline-offset-4 cursor-pointer'>博客管理</Link>
                                <span onClick={changeMenu} className='cursor-pointer hover:text-gray-400'>
                                    <Zhankai menu={menu}></Zhankai>
                                </span>
                            </div>
                            <div className={`${menu ? "visible flex flex-col text-left pl-5 mt-4 space-y-3 select-none" : "hidden"}`}>
                                <Link to={'blog'} className='hover:underline underline-offset-4 cursor-pointer'>文章管理</Link>
                                <Link to={'add'} className='hover:underline underline-offset-4 cursor-pointer'>新增文章</Link>
                                <Link to={'label'} className='hover:underline underline-offset-4 cursor-pointer'>标签管理</Link>
                            </div>
                        </div>
                        <div className="select-none hover:underline underline-offset-4 cursor-pointer p-2 px-8 w-full text-center m-4 text-inherit font-bold border-2 rounded-lg">
                            <Link to={'shouji'}>手记管理</Link>
                        </div>
                        <div className="select-none hover:underline underline-offset-4 cursor-pointer p-2 px-8 w-full text-center m-4 text-inherit font-bold border-2 rounded-lg">
                            <Link to={'friend'}>友链</Link>
                        </div>
                        <div className="select-none hover:underline underline-offset-4 cursor-pointer p-2 px-8 w-full text-center m-4 text-inherit font-bold border-2 rounded-lg">
                            <Link to={'about'}>关于我</Link>
                        </div>


                        <div className='mt-14 select-none hover:underline underline-offset-4 cursor-pointer p-2 px-8 w-full text-center m-4 text-inherit font-bold border-2 rounded-lg'>
                            Exit
                        </div>
                        <div className=''>
                            <Darktheme></Darktheme>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}