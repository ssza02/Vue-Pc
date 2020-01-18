import Vue from 'vue'
import Vuex from 'vuex'
import Lib from "./assets/js/Lib";

Vue.use(Vuex)

const obj = {
  name:"aa",
  age:1
}

const state = {
  loginInfo : '', //用户登录token等参数信息
}

const mutations = {
  saveStorage_loginInfo(state,info){
    state.loginInfo = info;
    Lib.M.setStore('loginInfo', info)
  }
}

const actions = {}

const getters = {
  // getAuthorization(state) {
  //   return state.authorization
  // }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
