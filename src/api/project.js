import Cookies from 'js-cookie'
import axios from 'axios'

axios.defaults.baseURL = CONFIG.API_V1
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.patch['Content-Type'] = 'application/json'

const project = {
  list: async function(query) {
    let access_key = Cookies.get('access_key')
    return axios({
      url: '/project',
      method: 'get',
      headers: {
        'x-access-token': access_key
      },
      params: query
    })
  },
  get: async function(data_id) {
    let access_key = Cookies.get('access_key')
    return axios({
      url: `/project/${data_id}`,
      method: 'get',
      headers: {
        'x-access-token': access_key
      }
    })
  },
}
export default project