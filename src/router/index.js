import Vue from "vue";
import Router from "vue-router";
import MainRouter from "@/components/common/main-router";
import Home from "@/components/home/home.vue";
import stationIntroduce from "@/components/station/introduce.vue";
import stationHistory from "@/components/station/history.vue";
import stationRegulationList from "@/components/station/regulation-list.vue";
import stationRegulationInfo from "@/components/station/regulation-info.vue";
import newsList from "@/components/news/news-list.vue";
import newsInfo from "@/components/news/news-info.vue";
import projectList from "@/components/project/project-list.vue";
import projectInfo from "@/components/project/project-info.vue";

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
      }]
    },
    {
      path: "/news",
      name: "news",
      component: MainRouter,
      redirect: {
        name: 'newsList',
        params: {
          type: 1
        }
      },
      children: [{
        path: "type/:type",
        name: "newsList",
        component: newsList
      }, {
        path: "type/:type/:data_id",
        name: "newsInfo",
        component: newsInfo
      }]
    },
    {
      path: "/research",
      name: "research",
      component: MainRouter,
      redirect: {
        name: 'achv'
      },
      children: [{
        path: "achv",
        name: "achv",
        component: MainRouter,
        redirect: {
          name: 'achvPaperList'
        },
        children: [{
          path: "paper",
          name: "achvPaperList",
          component: newsList
        }, {
          path: "paper/:data_id",
          name: "achvPaperInfo",
          component: newsInfo
        }]
      }, {
        path: "project",
        name: "project",
        component: MainRouter,
        redirect: {
          name: 'projectList',
          params: {
            type: 1
          }
        },
        children: [{
          path: "type/:type",
          name: "projectList",
          component: projectList
        }, {
          path: "type/:type/:data_id",
          name: "projectInfo",
          component: projectInfo
        }, ]
      }]
    }
  ]
});