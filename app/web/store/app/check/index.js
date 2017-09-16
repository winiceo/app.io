/* 测试数据 */

import * as api from '@/api/check'

const state = {
    manageList: []

}

const mutations = {


    SET_MANAGE_LIST(state, payload) {
        state.manageList = payload
    },


}


const actions = {

    getManangeList({commit, state}, value) {

        return api.query(value).then(function(items){
            commit('SET_MANAGE_LIST',items)
        })

    },

    // saveActivity({commit, state}, value) {
    //     let data = {}
    //
    //     console.log(state.ruleForm)
    //     Object.assign(data, state.ruleForm, state.awardForm, state.shareForm);
    //     return new Promise((resolve, reject) => {
    //         createActivity(data).then(response => {
    //             const data = response.data
    //
    //
    //             resolve()
    //         }).catch(error => {
    //             reject(error)
    //         })
    //     })
    // },


}


const getters = {}


export default {

    state,
    getters,
    mutations,
    actions
}
