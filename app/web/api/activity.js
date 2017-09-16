import * as http from '@/utils/fetch'

export function query(query) {
  return http.get('/activity/list',query)

}

export function get(id) {
  return http.get('/activity/get/'+id)
}

export function create(data) {
  return http.post('/activity/save',data)

}

