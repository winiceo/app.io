import mutations from './mutations'
import * as actions from './actions'

const state = {
    roles: [],
    token:'',
    name:'',
    avatar:'',

    userinfo:{}
}

export default{
  state,
  actions,
  mutations
}
