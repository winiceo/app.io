/* 测试数据 */

import * as api from '@/api/activity'
import moment from 'moment'

const date = moment().format('YYYY-MM-DD')
const ruleForm = {
    name: '新抽奖活动',
    cate: 'dzp',
    activePerson: '无限制',
    startTimeData: new Date(),
    endTimeData: new Date(),
    activePersonNum: '',
    activeDescribe: ''
}

const awardForm = {
    numLimit: '无限制',
    gameMostPrize: '',
    gameRate: '5',


    awardList: [
        {grade: '一等奖', name: '奖品名称', num: 0},
        {grade: '二等奖', name: '奖品名称', num: 0},

    ],

}

const shareForm = {
    title: '分享Allen的祖传链接',
    describe: '这个链接很吊！'
}

const selfForm = {}
const data = [
    {
        id: '1111',
        name: 'Allen',
        type: '测试活动',
        status: '未开始',
        readNum: 200,
        signUpNum: 100,
        auditNum: 5,
        activeMessage: {}
    },
    {
        id: '2222',
        name: '王小虎',
        type: '测试活动',
        status: '已结束',
        readNum: 200,
        signUpNum: 100,
        auditNum: 8,
        activeMessage: {}
    }
]
/* 活动管理测试数据 */
/*
 * ruleForm  1、活动信息的表单
 * signFrom  2、报名的表单
 * shareFrom 3、报名的表单
 * selfFrom  4、个性设置的表单
 * activeList 活动列表
 * */
const state = {
    ruleForm: ruleForm,
    awardForm: {},
    shareForm: {},
    selfForm: {},
    activeList: data
}

/* 从本地存储读取数据 */
for (var item in state) {

    try {
        localStorage.getItem(item) ? state[item] = JSON.parse(localStorage.getItem(item)) : false;

    } catch (e) {

    }
}

const mutations = {


    setRuleForm(state, payload) {
        state.ruleForm = payload

        console.log(state.ruleForm)

    },

    setAwardForm(state, payload) {
        Object.assign(state.awardForm, payload);
        localStorage.setItem('awardForm', JSON.stringify(payload));

    },
    setShareForm(state, payload) {
        Object.assign(state.shareForm, payload);
        localStorage.setItem('shareForm', JSON.stringify(payload));
    },
    setSelfForm(state, payload) {
        Object.assign(state.selfForm, payload);
        localStorage.setItem('selfForm', JSON.stringify(payload));
    }

}


const actions = {
    setRuleForm({commit}, value) {
        commit('setRuleForm', value)
    },
    getActivityByObjectId({commit, state}, value) {
        return api.get(value)

    },

    saveActivity({commit, state}, value) {
        let data = {}

        console.log(state.ruleForm)
        Object.assign(data, state.ruleForm, state.awardForm, state.shareForm);
        return api.create(data)

    },


}


const getters = {
    
}


export default {

    state,
    getters,
    mutations,
    actions
}
