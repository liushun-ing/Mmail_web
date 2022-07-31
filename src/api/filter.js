import request from '../utils/request.js';

const filter = {
  getFilterAccountList() {
    return request({
      url: '/filterAccount/getFilterAccountList',
      method: 'get'
    });
  },

  addFilterAccount(data) {
    return request({
      url: '/filterAccount/addFilterAccount',
      method: 'post',
      data: data
    });
  },

  deleteFilterAccount(data) {
    return request({
      url: '/filterAccount/deleteFilterAccount',
      method: 'post',
      data: data
    });
  },
};

export default filter;