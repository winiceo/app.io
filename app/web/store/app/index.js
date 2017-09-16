import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import activity from './activity/';
import user from './user/';
import check from './check'

import app from './common/app'

import permission from './common/permission'
import dashboard from './dashboard'

export default new Vuex.Store({
    modules: {
        activity,
        user,
        app,
        permission,
        dashboard,
        check

    }
});