import Vue from 'vue';
import { Loading, Message } from 'element-ui';
import axios from 'axios';
let loadingInstance = null;

const instance = axios.create({
	baseURL: '/bossboard/',
	// timeout: 10000,
	headers: {
		'Content-Type': 'application/json;charset=utf-8'
	},
	withCredentials: true
})
/* 请求拦截 */
instance.interceptors.request.use(
    conf => {
      // conf.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      if (!conf.isLoading) return conf
      let options = {
        lock: true,
        spinner: 'el-icon-loading',
        text:'Loading',
        background: 'rgba(0, 0, 0, 0.7)'
      }
      Loading.service(options);
      // Spin.show({
      //   render: (h) => h('div', [
      //     h('Icon', {
      //       class: 'demo-spin-icon-load',
      //       props: {
      //         type: 'ios-loading',
      //         size: 18
      //       }
      //     }),
      //     h('div', 'Loading')
      //   ])
      // })
      return conf
    },
    error => Promise.reject(error)
  )
  
/* 响应拦截 */
instance.interceptors.response.use(
    (conf) => {
      console.log('响应拦截', conf)
      Loading.close()
      if (conf.data.fid == 1005) {
        Message.warning('登录状态已失效，即将跳转会登录页')
        setTimeout(() => {
          const baseUrl = process.env.VUE_APP_URL 
          window.location.href = baseUrl+'/login'
        }, 1000)
        return
      }
      if (conf.data.fid == 1006) {
        Message.warning('您还没有任何数据权限，请联系管理员授权！')
        setTimeout(() => {
          const baseUrl = process.env.VUE_APP_URL 
          window.location.href = baseUrl + '/tourist/touristPage'
        }, 600)
        return
      }
      return conf.data
    },
    error =>
      // axios.post('http://172.22.145.142:7001/post', {
      // errorMsg: error.stack,
      // info: {
      // data: error.config.data,
      // method: error.config.method,
      // url: error.config.url
      // },
      // errType: 'http'
      // }).then(res => {})
      Promise.reject(error)
  
  )
/* 请求成功 */
function handleSuccess(conf) {
    console.log('响应拦截', conf)
    Loading.close()
    return conf.data
}
//请求失败
function handleError(err) {
    loadingInstance && loadingInstance.close();
    Message.error({ message: '网络错误，请稍后重试！', duration: 1000 });
    console.log(err)
}

// get请求
function getAjax(type, url, params) {
    return axios[type](url,{
        params
    }).then(res => handleSuccess(res), err => handleError(err))
}

// post请求
function postAjax(type, url, body, params) {
    return axios[type](url,body, {
         params
    }).then(res => handleSuccess(res), err => handleError(err))
}
//基础请求方法
function baseAjax(type, url, body, params) {
    switch (type) {
        case 'get':
        case 'delete':
            return getAjax(type, url, params)
        case 'post':
        case 'put':
            return postAjax(type, url, body, params)
    }

}

// 输出get请求
function s_get(url, params) {
    return baseAjax('get', url, {}, params)
        .then(res => res)
}


// 输出post请求
function s_post(url, body, params) {
    // if(!params) params = body;
    return baseAjax('post', url, body, params)
}

function exportLoad(url, params) {
    let query = '';
    for (let key in params) {
        query += `${key}=${params[key]}&`;
    }
    window.location.href = url + '?' + query    
}

export default {
    get: s_get,
    post: s_post,


}
