import Vue from "vue";
import Router from "vue-router";
import MainRouter from "@/components/common/main-router";
import Home from "@/components/home/home.vue";
import stationIntroduce from "@/components/station/introduce.vue";
import stationHistory from "@/components/station/history.vue";
import stationRegulationList from "@/components/station/regulation-list.vue";
import stationRegulationInfo from "@/components/station/regulation-info.vue";

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
        component: stationIntroduce
      }, {
        path: "history",
        name: "stationHistory",
        component: stationHistory
      }, {
        path: "regulation",
        name: "stationRegulation",
        component: stationRegulationList
      }, {
        path: "regulation/:data_id",
        name: "stationRegulationInfo",
        component: stationRegulationInfo
      }, ]
    }
  ]
});