import {fetch,_get} from '@/utils/fetch'

export function fetchList(query) {
  return fetch({
    url: '/activity/list',
    method: 'get',
    params: query
  })
}

export function getActivity(id) {
  return _get('/activity/get/'+id)
}

export function createActivity(data) {
  return fetch({
    url: '/activity/save',
    method: 'post',
    data: data
  })
}

