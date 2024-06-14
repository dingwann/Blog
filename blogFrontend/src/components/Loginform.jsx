import React, { useState, useContext } from 'react';
import { Input, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { LoginContext } from '../components/LoginContext';
import http from "./Axiosconfig";

export default function LoginForm(props) {
    // 登录改变后组件改变
    const { setLoginState } = useContext(LoginContext);

    const [isVisible, setIsVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await http.get('/api/users/login', { params: { username, password } });

            if (response.data.code === 1) {
                setMessage('🦄 登录成功! 跳转中...');
                setTimeout(() => {
                    localStorage.setItem('username', username)
                    localStorage.setItem('uid', response.data.uid)
                    localStorage.setItem('headImgUrl', response.data.headImgUrl)
                    localStorage.setItem('token', response.data.token)
                    props.close();
                    setLoginState(true);
                }, 2000);
            } else {
                setMessage('😥 登录失败! 请检查用户名和密码后重试.');
            }
        } catch (error) {
            setMessage('Login failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* 登录表单 */}
            <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-2">
                <Input
                    isRequired={true}
                    type="text"
                    radius='sm'
                    labelPlacement={"outside"}
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-4">
                <Input
                    isRequired={true}
                    label="Password"
                    radius='sm'
                    labelPlacement={"outside"}
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                    className="max-w-xs"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <Button className="w-full bg-blue-500 text-white py-2 rounded-lg" isLoading={isSubmitting} type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Logging In' : 'Log in'}
            </Button>
            {message && <p className="mt-4 text-center">{message}</p>}
            <p className="mt-4 mb-2 text-center">
                Don't have an account? <button type="button" className="text-blue-500" onClick={props.openSignup}>Sign Up</button>
            </p>
            <hr className='mb-2' />
            <a className="flex items-center pl-[8px]" href="#" target="_blank" rel="github login">
                <p className='text-sm'>Other App：</p>
                <svg className='inline-block hover:text-gray-400' xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 16 16"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59c.4.07.55-.17.55-.38c0-.19-.01-.82-.01-1.49c-2.01.37-2.53-.49-2.69-.94c-.09-.23-.48-.94-.82-1.13c-.28-.15-.68-.52-.01-.53c.63-.01 1.08.58 1.23.82c.72 1.21 1.87.87 2.33.66c.07-.52.28-.87.51-1.07c-1.78-.2-3.64-.89-3.64-3.95c0-.87.31-1.59.82-2.15c-.08-.2-.36-1.02.08-2.12c0 0 .67-.21 2.2.82c.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82c.44 1.1.16 1.92.08 2.12c.51.56.82 1.27.82 2.15c0 3.07-1.87 3.75-3.65 3.95c.29.25.54.73.54 1.48c0 1.07-.01 1.93-.01 2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" /></svg>
            </a>
        </form>
    )
};
