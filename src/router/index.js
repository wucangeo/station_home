import Vue from "vue";
import Router from "vue-router";
import MainRouter from "@/components/common/main-router";
import Home from "@/components/home/home.vue";
import StationIntroduce from "@/components/station/introduce.vue";
import StationHistory from "@/components/station/history.vue";

Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      name: "index",
      redirect: {
        name: 'home'
      },
      component: Home
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/station",
      name: "station",
      component: MainRouter,
      redirect: {
        name: 'stationIntroduce'
      },
      children: [{
        path: "introduce",
        name: "stationIntroduce",
        component: StationIntroduce
      }, {
        path: "history",
        name: "stationHistory",
        component: StationHistory
      }, ]
    }
  ]
});