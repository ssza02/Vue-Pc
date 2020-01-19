import http from '../http/HTTPS.js';
import apis from '../http/apis.js';
import {set_user_info} from '../store/mutations-name.js'

// action工厂函数
function createAction(method, api, mtype, init) {
  console.log('method:'+method+'---'+'api:'+api+'---'+'mtype:'+mtype+'---'+'init:'+init);
    if (init === 'init') {
      return async function ({commit}, params = {}) {
        console.log('res__:'+http.get);
        // debugger
        // dispatch('hideRouteLoading', false);
        const res = await http[method](api, params)
        
        // dispatch('hideRouteLoading', true)
        mtype && res.data && commit(mtype, res.data)
        return res
      }()
    }
    return async function ({dispatch, commit}, params = {}) {
      
      const res = await http[method](api, params)
      
      mtype && res.data && commit(mtype, res.data)
      return res
    }()
  }

  const actions = {
    hideRouteLoading({commit}, flag) {
        commit(HIDE_ROUTE_LOADING, flag)
    },
    showGlobalDialog({commit}, dialogData) {
        commit(SHOW_GLOBAL_DIALOG, dialogData)
    },
    hideGlobalDialog({commit}, dialogData) {
        commit(HIDE_GLOBAL_DIALOG)
    },
    getUserInfo: createAction('get', apis.api_userInfo,set_user_info,'init'),
  }
  
export default actions  