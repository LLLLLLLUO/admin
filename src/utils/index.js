import axios from 'axios';

// 创建axios实例并设置基地址和请求超时时间
let http = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: (1000 * 3)
});

/**
 * 创建请求拦截器
 */
http.interceptors.request.use(config => {
  config.headers.authorization = sessionStorage.token;
  return config
});

/**
 * 创建响应拦截器
 */
http.interceptors.response.use(response => {
  return response
});

// 导出实例
export default http
