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
import paperAchvList from "@/components/achv/paper-list.vue";
import paperAchvInfo from "@/components/achv/paper-info.vue";
import monographyAchvList from "@/components/achv/monography-list.vue";
import monographyAchvInfo from "@/components/achv/monography-info.vue";
import patentAchvList from "@/components/achv/patent-list.vue";
import patentAchvInfo from "@/components/achv/patent-info.vue";
import awardsAchvList from "@/components/achv/awards-list.vue";
import awardsAchvInfo from "@/components/achv/awards-info.vue";
import thematicList from "@/components/thematic/thematic-list.vue";
import thematicInfo from "@/components/thematic/thematic-info.vue";
import knowledgePopularizeList from "@/components/popularize/knowledge-list.vue";
import knowledgePopularizeInfo from "@/components/popularize/knowledge-info.vue";
import imagePopularizeList from "@/components/popularize/image-list.vue";
import imagePopularizeInfo from "@/components/popularize/image-info.vue";

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
          name: 'paperAchvList'
        },
        children: [{
            path: "paper",
            name: "paperAchvList",
            component: paperAchvList
          }, {
            path: "paper/:data_id",
            name: "paperAchvInfo",
            component: paperAchvInfo
          },
          {
            path: "monography",
            name: "monographyAchvList",
            component: monographyAchvList
          }, {
            path: "monography/:data_id",
            name: "monographyAchvInfo",
            component: monographyAchvInfo
          },
          {
            path: "patent",
            name: "patentAchvList",
            component: patentAchvList
          }, {
            path: "patent/:data_id",
            name: "patentAchvInfo",
            component: patentAchvInfo
          },
          {
            path: "awards",
            name: "awardsAchvList",
            component: awardsAchvList
          }, {
            path: "awards/:data_id",
            name: "awardsAchvInfo",
            component: awardsAchvInfo
          },
        ]
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
    },
    {
      path: "/thematic",
      name: "thematic",
      component: MainRouter,
      redirect: {
        name: 'thematicList',
        params: {
          type: 4
        }
      },
      children: [{
        path: "type/:type",
        name: "thematicList",
        component: thematicList
      }, {
        path: "type/:type/:data_id",
        name: "thematicInfo",
        component: thematicInfo
      }]
    },
    {
      path: "/popularize",
      name: "popularize",
      component: MainRouter,
      redirect: {
        name: 'knowledgePopularizeList',
      },
      children: [{
        path: "knowledge",
        name: "knowledgePopularizeList",
        component: knowledgePopularizeList
      }, {
        path: "knowledge/:data_id",
        name: "knowledgePopularizeInfo",
        component: knowledgePopularizeInfo
      }, {
        path: "image",
        name: "imagePopularizeList",
        component: imagePopularizeList
      }, {
        path: "image/:data_id",
        name: "imagePopularizeInfo",
        component: imagePopularizeInfo
      }]
    },
  ]
});