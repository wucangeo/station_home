// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import App from './App'
import router from './router'
import apis from './api/index'
import menu from './libs/menu'
import * as filters from './libs/filter'
import Cookies from "js-cookie";
import encrypt from "./libs/encrypt";

let access_key = Cookies.get("access_key");
if (!access_key) {
  access_key = encrypt.encrypt("1", "soil");
  Cookies.set("access_key", access_key);
}

Vue.config.productionTip = false
Vue.use(iView)
//载入menu
Vue.prototype.menus = menu
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