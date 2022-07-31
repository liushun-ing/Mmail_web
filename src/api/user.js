import request from '../utils/request';

const user = {
    login(data) {
        return request({
            url: '/login',
            method: 'post',
            data: data
        });
    },

    getUserList(params) {
        return request({
            url: '/user/getUserList',
            params: params,
            method: 'get'
        });
    },

    judgeAccountValid(data) {
        return request({
            url: '/user/judgeAccountValid',
            data: data,
            method: 'post'
        });
    },

    registerUser(data) {
        return request({
            url: '/user/registerUser',
            data: data,
            method: 'post'
        });
    },

    updateDisabledState(data) {
        return request({
            url: '/user/updateDisabledState',
            data: data,
            method: 'post'
        });
    },

    updateAuthority(data) {
        return request({
            url: '/user/updateAuthority',
            data: data,
            method: 'post'
        });
    },

    deleteUser(data) {
        return request({
            url: '/user/deleteUser',
            data: data,
            method: 'post'
        });
    },

    searchUser(params) {
        return request({
            url: '/user/searchUser',
            method: 'get',
            params: params
        });
    },

    verifyPassword(data) {
        return request({
            url: '/user/verifyPassword',
            method: 'post',
            data: data
        });
    },

    changePassword(data) {
        return request({
            url: '/user/changePassword',
            method: 'post',
            data: data
        });
    }
};

export default user;
