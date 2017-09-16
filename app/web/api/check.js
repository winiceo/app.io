import * as http from '@/utils/fetch'


export function query(query) {
  return http.get('/check/list',query)

}

export function get(id) {
  return http.get('/check/get/'+id)
}
 