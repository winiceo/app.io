import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

const state = {
    topNavActive: '0',
    sidebarNavActive: '0'
}

export default{
  state,
  getters,
  actions,
  mutations
}
