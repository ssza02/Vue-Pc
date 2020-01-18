import axios from 'axios'
// import { Message, Spin } from 'iview'
import { Message, Loading } from 'element-ui';
axios.defaults.timeout = 15000
axios.defaults.withCredentials = true

/* 请求拦截 */
axios.interceptors.request.use(
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
axios.interceptors.response.use(
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

export default axios
