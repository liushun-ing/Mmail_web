import request from '../utils/request';

const server = {
    getServerParams() {
        return request({
            url: '/server/getServerParams',
            method: 'get'
        });
    },

    getSmtpAndPop3State() {
        return request({
            url: '/server/getSmtpAndPop3State',
            method: 'get'
        });
    },

    startSmtpServer() {
        return request({
            url: '/server/startSmtpServer',
            method: 'post'
        });
    },

    stopSmtpServer() {
        return request({
            url: '/server/stopSmtpServer',
            method: 'post'
        });
    },

    startPop3Server() {
        return request({
            url: '/server/startPop3Server',
            method: 'post'
        });
    },

    stopPop3Server() {
        return request({
            url: '/server/stopPop3Server',
            method: 'post'
        });
    },

    setSmtpPort(data) {
        return request({
            url: '/server/setSmtpPort',
            method: 'post',
            data: data
        });
    },

    setSmtpPort(data) {
        return request({
            url: '/server/setSmtpPort',
            method: 'post',
            data: data
        });
    },

    setPop3Port(data) {
        return request({
            url: '/server/setPop3Port',
            method: 'post',
            data: data
        });
    },

    setDomainName(data) {
        return request({
            url: '/server/setDomainName',
            method: 'post',
            data: data
        });
    },

    setMaxRcpt(data) {
        return request({
            url: '/server/setMaxRcpt',
            method: 'post',
            data: data
        });
    },

    setMailboxSize(data) {
        return request({
            url: '/server/setMailboxSize',
            method: 'post',
            data: data
        });
    }
};

export default server;
