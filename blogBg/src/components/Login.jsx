import { useState } from 'react'
import http from './Axiosconfig'
import img from '../assets/imgs/image.png'
import img2 from '../assets/imgs/imge2.png'

export default function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);  // 用于存储错误信息
    const [login, setLogin] = useState(null);  // 用于存储登录信息
    const [isLoading, setIsLoading] = useState(false);  // 用于判断是否正在加载
    const [isLoggedIn, setIsLoggedIn] = useState(false);  // 用于判断登录

    async function check(e) {
        e.preventDefault();  // 阻止默认表单提交行为
        setIsLoading(true);  // 设置加载状态为true
        try {
            // 校验用户合法
            const res = await http.get('api/users/login/admin', { params: { username, password } });
            if (res.data.code === 1) {
                setIsLoggedIn(true);  // 设置登录状态为true
                setLogin(`登录成功，跳转中...`);  // 设置登录信息
                setTimeout(() => {
                    localStorage.setItem('username', username)
                    localStorage.setItem('uid', res.data.uid)
                    localStorage.setItem('headImgUrl', res.data.headImgUrl)
                    localStorage.setItem('token', res.data.token)
                    window.location.replace('/admin/hashboard');  // 跳转到首页
                }, 1000);
            }
        } catch (error) {
            console.error(error);
            setError('Login failed. Please check your username and password.');  // 设置错误信息
        } finally {
            setIsLoading(false);  // 设置加载状态为false
        }
    }

    return (
        <>
            <div className='flex justify-center items-center w-[100vw] h-[100vh] bg-gradient-to-tr from-indigo-300 via-purple-300 to-pink-300'>
                {/* Login */}
                <div className='w-[90vw] h-[85vh] border-2 border-solid backdrop-blur-md bg-white/40 rounded-2xl grid grid-cols-1 lg:grid lg:grid-cols-12 gap-2'>
                    <div className='max-lg:hidden grid justify-center items-center col-span-7'>
                        <span className='relative'>
                            <img src={img} alt="Main visual" className='w-[600px] h-[600px]' />
                            <span className='absolute bottom-10'>
                                <img src={img2} alt="Overlay" className='w-[500px] h-[500px]' />
                            </span>
                        </span>
                    </div>
                    <div className='grid col-span-5 p-10'>
                        <div className='p-6 flex flex-col'>
                            <p className='my-14 self-center text-2xl text-inherit font-bold'>DingWan BLOG</p>
                            <h2 className='my-2'>Log in to Hashboard</h2>
                            <form className='flex flex-col gap-4' onSubmit={check}>
                                <label htmlFor='username' className='sr-only'>Username</label>
                                <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' type="text" id='username' className='rounded-lg bg-gray-100 h-10 p-4 outline-slate-300' />

                                <label htmlFor='password' className='sr-only'>Password</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' type="password" id='password' className='rounded-lg bg-gray-100 h-10 p-4 outline-slate-300' />

                                <button type="submit" className='rounded-lg my-8 h-10 bg-[#3b82f6] text-white'>
                                    {isLoading ? "Log in..." : "Log in"}
                                </button>

                                {isLoggedIn && <p className='flex justify-center text-inherit text-orange-400'>{login}</p>}
                                {error && <p className='text-red-500'>{error}</p>}  {/* 显示错误信息 */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}