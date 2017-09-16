import * as api from '@/api/user'
import * as cache from '@/utils/cache'

export const login = ({commit}, userInfo) => {

    return api.login(userInfo).then((data) => {
        console.log(data)
        cache.set('token',data.token)
        cache.set('roles',data.role)
        cache.set('name',data.username)
        cache.set('avatar',data.avatar)
        cache.set('team',data.team)

        commit('SET_TOKEN', data.token)
        commit('SET_ROLES', data.role)
        commit('SET_NAME', data.username)
        commit('SET_AVATAR', data.avatar)


    })

}

export const register = ({commit}, userInfo) => {
    return api.register(userInfo).then((data) => {
        // commit('SET_TOKEN', data.token)
        // commit('SET_ROLES', data.role)
        // commit('SET_NAME', data.username)
        // commit('SET_AVATAR', data.avatar)
        // cache.set('token',data.token)
        // cache.set('roles',data.role)
        // cache.set('name',data.username)
        // cache.set('avatar',data.avatar)
        // cache.set('team',data.objectId)
    })

}

export const logout = ({commit}) => {

    return api.logout()
}
