/* 测试数据 */

import * as api from '@/api/user'
import store from '@/utils/store'

const state = {
    userinfo:'',
    token: store.get('token')||"",

    roles: store.get('roles')||[],
}


const mutations = {

    SET_USERINFO:(state,data)=>{
        state.userinfo=data
    },
    SET_TOKEN: (state, token) => {
        state.token = token
        //store.set('token',token)

    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
        store.set('roles',roles)
    },

}


const actions = {
    LoginByUsername({commit}, data) {

        return api.login(data).then(data => {
            alert(state.token)
            console.log(data)
            //commit('SET_USERINFO', data)
            commit('SET_TOKEN', data.token)
            commit('SET_ROLES', data.role)

        })

    },

    // 获取用户信息
    GetUserInfo({commit, state}) {
        return new Promise((resolve, reject) => {
            getUserInfo(state.token).then(response => {
                const data = response.data
                commit('SET_ROLES', data.role)
                commit('SET_NAME', data.name)
                commit('SET_AVATAR', data.avatar)
                commit('SET_INTRODUCTION', data.introduction)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({commit, state}) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                removeToken()
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 前端 登出
    FedLogOut({commit}) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            removeToken()
            resolve()
        })
    },

    // 动态修改权限
    ChangeRole({commit}, role) {
        return new Promise(resolve => {
            commit('SET_TOKEN', role)
           // setToken(role)
            getUserInfo(role).then(response => {
                const data = response.data
                commit('SET_ROLES', data.role)
                commit('SET_NAME', data.name)
                commit('SET_AVATAR', data.avatar)
                commit('SET_INTRODUCTION', data.introduction)
                resolve()
            })
        })
    }


}


const getters = {

    token: state => state.token,

    roles: state => state.roles,
    userinfo: state => state.userinfo,


}


export default {

    state,
    getters,
    mutations,
    actions
}
