import Cookies from 'js-cookie'
import axios from 'axios'

axios.defaults.baseURL = CONFIG.API_V1
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.patch['Content-Type'] = 'application/json'

const paper = {
  list: async function(query) {
    let access_key = Cookies.get('access_key')
    query.access_key = access_key;
    return axios({
      url: '/paper',
      method: 'get',
      params: query
    })
  },
  get: async function(data_id) {
    let access_key = Cookies.get('access_key')
    return axios({
      url: `/paper/${data_id}`,
      method: 'get',
      params: {
        access_key
      }
    })
  },
}
export default paper