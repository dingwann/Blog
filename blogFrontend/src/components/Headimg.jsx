import React, { useContext, useLayoutEffect } from "react";
import { LoginContext } from '../components/LoginContext';

// 头像组件
export default function Headimg() {
    // 登录状态组件改变
    const { setLoginState } = useContext(LoginContext);

    // 退出登录
    const logout = () => {
        setLoginState(false);
        localStorage.removeItem('username')
        localStorage.removeItem('uid')
        localStorage.removeItem('headImgUrl')
        localStorage.removeItem('token')
    }

    return (
        <>
            <div className="flex">
                <span className="group relative hover:cursor-pointer">
                    {/* <img className="w-auto h-9 rounded-full" src={localStorage.getItem('headImgUrl')} alt="headImg" /> */}
                    <span>Hi, <span className="underline underline-offset-4 text-inherit font-medium">{localStorage.getItem('username')}</span></span>
                    <span className="hidden absolute p-2 w-28 h-auto rounded-md top-6 right-0 group-hover:flex flex-col justify-between">
                        <span className="flex self-center font-bold text-nowrap text-md mb-2">
                            <img className="w-10 h-10 rounded-lg" src={localStorage.getItem('headImgUrl')} alt="userImg" />
                        </span>
                        <hr className="mb-2" />
                        <span onClick={logout} className="flex self-center text-red-500 text-md font-bold hover:text-red-300">
                            Log out
                        </span>
                    </span>
                </span>
            </div>
        </>
    );
}
