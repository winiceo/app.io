/**
 * Created by sailengsi on 2017/5/10.
 */
import {
	store
} from '@/utils/';


//import * as types from './mutations_types'


export default {
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


	//
	// [types.UPDATE_USERINFO](state, user_db) {
	// 	state.userinfo = user_db.userinfo || {};
	// 	store.set('userinfo', state.userinfo);
	// },
    //
	// [types.REMOVE_USERINFO](state) {
	// 	store.remove('userinfo');
	// 	state.userinfo = {};
	// },
    //
	// [types.UPDATE_REMUMBER](state, user_db) {
	// 	state.remumber.remumber_flag = user_db.remumber_flag;
	// 	state.remumber.remumber_login_info = user_db.remumber_login_info;
    //
	// 	store.set('remumber_flag', state.remumber.remumber_flag);
	// 	store.set('remumber_login_info', state.remumber.remumber_login_info);
	// },
    //
    //
	// [types.REMOVE_REMUMBER](state) {
	// 	store.remove('remumber_flag');
	// 	store.remove('remumber_login_info');
    //
	// 	state.remumber.remumber_flag = false;
	// 	state.remumber.remumber_login_info = {
	// 		username: '',
	// 		token: ''
	// 	};
	// },
};