/**
 * Created by sailengsi on 2017/5/10.
 */

export default {

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

	getRemumber(state){
		return state.remumber;
	}
};