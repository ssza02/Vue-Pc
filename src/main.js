import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/router'
import store from './store/index'
import axios from 'axios'
import apis from './assets/js/apis'
import mixin from './mixins/mixin'
import utils from './assets/js/Lib'

Vue.config.productionTip = false

Vue.use(ElementUI)

window.$mixin = mixin
Vue.prototype.$http= axios
Vue.prototype.$baseUrl = ''
Vue.prototype.$apis = apis
Vue.prototype.$utils = utils

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
