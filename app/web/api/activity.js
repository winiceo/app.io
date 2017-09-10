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

export function fetchPv(pv) {
  return fetch({
    url: '/activity/pv',
    method: 'get',
    params: { pv }
  })
}

