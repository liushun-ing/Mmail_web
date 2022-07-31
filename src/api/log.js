import request from '../utils/request.js';

const log = {
    getLogList(params) {
        return request({
            url: '/log/getLogList',
            params: params,
            method: 'get'
        });
    },

    deleteLogByTime(data) {
        return request({
            url: '/log/deleteLogByTime',
            method: 'post',
            data: data
        });
    }
};

export default log;
