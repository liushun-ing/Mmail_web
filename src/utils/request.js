import axios from 'axios';
import qs from 'qs';

const service = axios.create({
    // baseURL: 'http://localhost:8080/api',
    baseURL: process.env.NODE_ENV === 'production' ? 'http://110.40.230.26:8081/' : 'http://localhost:8080/api',
    // 超时时间
    // timeout: 10000
});

service.interceptors.request.use(
    config => {
        // 设置请求头，添加token
        const Token = localStorage.getItem('login_token') ? JSON.parse(localStorage.getItem('login_token')).token : null;
        Token && (config.headers.Token = Token);
        // 有需要的话，可以转换数据格式
        if (config.method === 'post') {
            config.data = qs.stringify(config.data, { arrayFormat: 'repeat' });
        }
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

// 设置post请求头
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject(response);
        }
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);

export default service;
