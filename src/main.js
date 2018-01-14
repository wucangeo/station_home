// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import App from './App'
import router from './router'
import apis from './api/index'
import * as filters from './libs/filter'

Vue.config.productionTip = false

Vue.use(iView)

//载入apis
Vue.prototype.apis = apis
// 载入Filter
Vue.prototype.filters = filters.default
Object.keys(filters.default).forEach(key => {
  Vue.filter(key, filters.default[key])
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})