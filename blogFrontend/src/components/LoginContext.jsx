// LoginContext.js
import React, { createContext, useState, useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    // 检测明暗主题切换的状态，对子组件进行不同状态的渲染效果，默认为light ——> true
    const [themestate, setThemestate] = useState(() => {
        const localData = window.localStorage.getItem('themeState');
        return localData ? JSON.parse(localData) : true;
    });

    // 登录状态
    const [LoginState, setLoginState] = useState(() => {
        const localData = window.localStorage.getItem('LoginState');
        return localData ? JSON.parse(localData) : false;
    });

    useLayoutEffect(() => {
        window.localStorage.setItem('LoginState', JSON.stringify(LoginState));
    }, [LoginState]);

    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isSignupOpen, setSignupOpen] = useState(false);

    const location = useLocation();

    // const openLogin = () => setLoginOpen(true);
    const close = () => {
        setSignupOpen(false)
        setLoginOpen(false)

    };

    const openLogin = () => {
        setLoginOpen(true);
        setSignupOpen(false);
    };

    const openSignup = () => {
        setLoginOpen(false);
        setSignupOpen(true);
    };

    useEffect(() => {
        // URL变化时关闭登录窗口
        if (isLoginOpen) {
            setLoginOpen(false)
        } else if (isSignupOpen) {
            setSignupOpen(false)
        }
    }, [location]);

    return (
        <LoginContext.Provider value={{ openSignup, isLoginOpen, openLogin, setLoginOpen, close, isSignupOpen, setSignupOpen, themestate, setThemestate, LoginState, setLoginState }}>
            {children}
        </LoginContext.Provider>
    );
};
