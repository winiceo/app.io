/* 测试数据 */

import {loginByUsername, logout, getUserInfo} from '@/api/login'
import {getToken, setToken, removeToken} from '@/utils/auth'

const state = {
    user: '',
    status: '',
    code: '',
    token: '',
    name: '',
    avatar: '',
    introduction: '',
    roles: '',
}


const mutations = {

    SET_CODE: (state, code) => {
        state.code = code
    },
    SET_TOKEN: (state, token) => {
        alert(state)
        state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
        state.setting = setting
    },
    SET_STATUS: (state, status) => {
        state.status = status
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },

}


const actions = {
    LoginByUsername({commit}, userInfo) {
        console.log(userInfo)
        const username = userInfo.username.trim()

        return loginByUsername(username, userInfo.password).then(data => {

            setToken(data.token)
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
            setToken(role)
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

    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    introduction: state => state.user.introduction,
    status: state => state.user.status,
    roles: state => state.user.roles,
    setting: state => state.user.setting,
    permission_routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters,
    ruleForm: state => state.acivity.ruleForm,

    getUserinfo(state) {
        return state.userinfo;
    },

    getToken(state) {
        return state.userinfo && state.userinfo.token ? state.userinfo.token : '';
    },

    getRemumber(state) {
        return state.remumber;
    }
}


export default {

    state,
    getters,
    mutations,
    actions
}
