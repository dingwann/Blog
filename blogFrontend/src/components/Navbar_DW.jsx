import { Navbar, Button } from "@nextui-org/react";
import { useState, useEffect, useContext, useRef, useImperativeHandle, forwardRef, useLayoutEffect } from "react";
import MdiGithub from '../components/svg/MdiGithub';
import TablerMoonFilled from '../components/svg/TablerMoonFilled';
import Sun from '../components/svg/Sun';
import MenuSwitch from "./MenuSwitch";
import { useTheme } from "next-themes";
import { asideNavShow } from '../components/AsideContext'
import { LoginContext } from '../components/LoginContext';
import AsideMenu from '../components/AsideMenu';
import Headimg from "../components/Headimg";
import { Outlet, Link } from "react-router-dom";
import { baseURL } from './Axiosconfig'

export default function Navbar_DW(props) {
    const { setLoginOpen, openSignup, themestate, setThemestate, LoginState } = useContext(LoginContext);

    const domRef = useRef(null);

    const [state, setState] = useState(() => {
        const localData = window.localStorage.getItem('myState');
        return localData ? JSON.parse(localData) : false;
    });

    useLayoutEffect(() => {
        window.localStorage.setItem('myState', JSON.stringify(state));
    }, [state]);

    const { theme, setTheme } = useTheme('dark')

    function changeTheme() {
        if (theme === 'dark') {
            setTheme('light')
        } else {
            setTheme('dark')
        }

        setState(!state)
        setThemestate(!themestate)
    }


    return (
        <Navbar maxWidth="full" className="">
            <div className="flex flex-nowrap justify-items-center items-center md:mx-4 lg:mx-12">
                <span className="sm:hidden mr-2">
                    <AsideMenu />
                </span>
                <span onClick={location.pathname === "/" ? () => { } : () => location.pathname = "/"} className="flex items-center hover:cursor-pointer gap-2">
                    <img className="hidden sm:inline w-9 h-9 rounded-lg" src={`${baseURL}/images/logo/logo.png`} alt="siteLogo" />
                    <p className="font-bold text-inherit select-none hover:underline">DINGWAN</p>
                </span>
            </div>

            <div ref={domRef} className={`hidden select-none sm:flex flex-nowrap gap-3 lg:gap-8 content-center justify-center`}>
                <span>
                    <Link to={`/`} className="font-semibold text-inherit whitespace-nowrap hover:underline hover:underline-offset-[2px]">
                        首页
                    </Link>
                </span>
                <span  >
                    <Link to={`blog`} className="font-semibold text-inherit whitespace-nowrap hover:underline hover:underline-offset-[2px]">
                        博客
                    </Link>
                </span  >
                <span >
                    <Link to={`share`} className="font-semibold text-inherit whitespace-nowrap hover:underline hover:underline-offset-[2px]">
                        手记
                    </Link>
                </span>
                <span >
                    <Link to={`friend`} className="font-semibold text-inherit whitespace-nowrap hover:underline hover:underline-offset-[2px]">
                        友链
                    </Link>
                </span>
                <span >
                    <Link to={`about`} className="font-semibold text-inherit whitespace-nowrap hover:underline hover:underline-offset-[2px]">
                        关于我
                    </Link>
                </span>
            </div>
            <div className="flex flex-nowrap justify-end items-center space-x-4 md:mx-4 lg:mx-12">
                <span onClick={() => window.open("https://github.com/dingwann", "_blank")}>
                    <MdiGithub className="cursor-pointer hover:text-slate-600" />
                </span>

                <span onClick={changeTheme}>
                    {state ? <Sun className="cursor-pointer hover:text-slate-600" /> : <TablerMoonFilled className="cursor-pointer hover:text-slate-600" />}
                </span>

                {LoginState ?
                    <Headimg></Headimg> :
                    <>
                        <span onClick={openSignup} className="hidden lg:flex select-none hover:cursor-pointer">
                            <p className="text-[#006FEE]">Sign Up</p>
                        </span>

                        <span>
                            <Button onClick={() => setLoginOpen(p => !p)} color="primary" variant="flat">
                                <p className="font-semibold text-inherit">Log in</p>
                            </Button>
                        </span>
                    </>}

            </div>
        </Navbar>
    );
}