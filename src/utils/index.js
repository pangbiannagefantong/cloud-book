import axios from 'axios'

var fetch = axios.create({
    baseURL: process.env.BASE_URL
})

fetch.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

fetch.interceptors.request.use(config =>{
  let token = localStorage.getItem('token')
  if(token) {
    config.headers.token = token
  }
  return config
},err => Promise.reject(err))

  export {fetch}