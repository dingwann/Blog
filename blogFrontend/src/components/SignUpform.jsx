import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { Input, Button } from "@nextui-org/react";
import React, { useContext, useState } from 'react';
import { LoginContext } from '../components/LoginContext';
import http, { baseURL } from "./Axiosconfig";


export default function SignUpForm(props) {
    // 登录改变后组件改变
    const { setLoginState } = useContext(LoginContext);

    const [isVisible, setIsVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await http.post('/api/users/reg', {
                username,
                password,
                email,
                headImgUrl: `${baseURL}/images/headImgs/headImg${Math.floor(Math.random() * 5)}.png`
            });

            if (response.data.code === 1) {
                setMessage('注册成功! 自动登录跳转中...');
                setTimeout(async () => {
                    try {
                        const response2 = await http.get('/api/users/login', { params: { username, password } });

                        if (response2.data.code === 1) {
                            localStorage.setItem('username', username)
                            localStorage.setItem('uid', response2.data.uid)
                            localStorage.setItem('headImgUrl', response2.data.headImgUrl)
                            localStorage.setItem('token', response2.data.token)
                            props.close();
                            setLoginState(true);
                        }
                    } catch (error) {
                        setMessage('登录跳转失败，试试自己登录吧~');
                    } finally {
                        setIsSubmitting(false);
                    }
                }, 2000);
            } else {
                setMessage(response.data.msg + " , " + '用户名已存在');
            }

        } catch (error) {
            setMessage('注册失败!');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                {/* 注册表单 */}
                <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-2">
                    <Input
                        type="text"
                        radius='sm'
                        isRequired={true}
                        labelPlacement={"outside"}
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-2">
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
                <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-4 md:mb-4">
                    <Input
                        type="email"
                        radius='sm'
                        labelPlacement={"outside"}
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <Button className="w-full bg-blue-500 text-white py-2 rounded-lg" isLoading={isSubmitting} type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Signing Up' : 'Sign Up'}
                </Button>
                {message && <p className="mt-4 text-center text-yellow-600">{message}</p>}
                <p className="mt-4 text-center">
                    Already have an account? <button type="button" className="text-blue-500" onClick={props.openLogin}>Login</button>
                </p>
            </form>
        </>
    );
};
