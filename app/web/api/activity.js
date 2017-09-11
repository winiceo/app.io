import fetch from '@/utils/fetch'

export function fetchList(query) {
  return fetch({
    url: '/activity/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle() {
  return fetch({
    url: '/activity/detail',
    method: 'get'
  })
}

export function createActivity(data) {
  return fetch({
    url: '/activity/save',
    method: 'post',
    data: data
  })
}

