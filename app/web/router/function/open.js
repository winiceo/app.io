/**
 * Created by sailengsi on 2017/5/11.
 */

import {Content} from '@/layout/';

import {Function} from '@/page/function';

export default {
	path: 'open',
	name: '公共内容',
	icon: 'inbox',
	component: Content,

	children: [ {
		path: 'form',
		name: '表单',
		icon: 'edit',

	} ]
};