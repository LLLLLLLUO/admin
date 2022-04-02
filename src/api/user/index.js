import http from '../../utils/index.js';

/**
 * 用户登录
 * @param {*} data
 * @returns
 */
function userLogin(data) {
  return http({
    url: '/admin/login',
    method: 'post',
    data
  })
};

/**
 * 退出登录
 * @returns
 */
function userLogout() {
  return http({
    url: '/admin/logout',
    method: 'post'
  })
};

/**
 * 获取用户信息
 * @returns
 */
function getUserInfo() {
  return http({
    url: '/admin/getUserInfo',
    method: 'get'
  })
};

/**
 * 用户注册
 * @param {*} data
 * @returns
 */
function registerUser(data) {
  return http({
    url: '/admin/register',
    method: 'post',
    data
  })
}

export {
  userLogin,
  userLogout,
  getUserInfo,
  registerUser
}
