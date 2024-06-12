import axios from 'axios'

const baseURL = 'http://127.0.0.1:3000'

const http = axios.create({
    baseURL,
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('token')
    if (token) {
        config.headers['Authorization'] = token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


export default http
export { baseURL }