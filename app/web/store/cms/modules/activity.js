/* 测试数据 */

import { createActivity  } from '@/api/activity'

const date = 'Mon Oct 17 2016 00:00:00 GMT+0800 (中国标准时间)'
const ruleForm = {
    name: '幸运大转盘活动',
    cate:'dzp',
    activeStartTimeDate: date,
    activeStartTimeTime: '00:45',
    activeEndTimeDate: date,
    activeEndTimeTime: '00:45',
    signStartTimeDate: date,
    signStartTimeTime: '00:45',
    signEndTimeDate: date,
    signEndTimeTime: '00:45',

    activePerson: '',
    activePersonNum: '',
    activeDescribe: '',
    province: '广东省',
    city: '广州市',
    detail: '番禺区广州大学城超谷科技园',
    status:'未开始',
}

const awardForm = {
    numLimit: '无限制',
    gameMostPrize: '',
    gameRate: '5',


    awardList: [
        {grade: '一等奖', name:'奖品名称',num:0 },
        {grade: '二等奖', name:'奖品名称',num:0 },

    ],

}

const shareForm = {
    title: '分享Allen的祖传链接',
    describe: '这个链接很吊！'
}

const selfForm = {

}
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
        localStorage.getItem(item) ?state[item] = JSON.parse(localStorage.getItem(item)):false;

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
    setRuleForm ({commit}, value) {
        commit('setRuleForm', value)
    },

    saveActivity ({ commit, state }, value) {
        let data ={}

        console.log(state.ruleForm)
         Object.assign(data,state.ruleForm,state.awardForm,state.shareForm);
        return new Promise((resolve, reject) => {
            createActivity(data).then(response => {
                const data = response.data


                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },


}



const getters = {
    topNavActive(state) {
        return state.topNavActive
    },
    sidebarNavActive(state) {
        return state.sidebarNavActive
    }
}



export default {

    state,
    getters,
    mutations,
    actions
}
