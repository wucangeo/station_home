<template>
  <div id="common-header">
    <div class="right-btn">
      <a :href="go2Manage" target="_blank"><Button type="warning">管理平台</Button></a>
    </div>
    <div class="nav-bar">
      <ul>
        <li v-for="item in routers" @mouseover="mouseover(item.name)" @mouseout="mouseout(item.name)">
          <router-link :to="{name:item.name}">
            {{item.title}}</router-link>
          <ul v-show="ulliVisible[item.name]">
            <li v-for="child in item.children">
              <router-link :to="{name:child.name,params:child.params}">{{child.title}}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ulliVisible: {
        home: false,
        station: false,
        news: false,
        resource: false,
        research: false,
        thematic: false,
        popularize: false,
        scene: false
      },
      routers: [
        {
          name: "home",
          title: "首页",
          children: []
        },
        {
          name: "station",
          title: "站点介绍",
          children: [
            {
              name: "stationIntroduce",
              title: "台站简介"
            },
            {
              name: "stationHistory",
              title: "历史沿革"
            },
            {
              name: "stationRegulation",
              title: "规章制度"
            }
          ]
        },
        {
          name: "news",
          title: "新闻公告",
          children: [
            {
              name: "newsList",
              title: "通知公告",
              params: {
                type: 1
              },
              children: []
            },
            {
              name: "newsList",
              title: "综合新闻",
              params: {
                type: 2
              },
              children: []
            },
            {
              name: "newsList",
              title: "科研动态",
              params: {
                type: 3
              },
              children: []
            },
            {
              name: "newsList",
              title: "服务动态",
              params: {
                type: 4
              },
              children: []
            },
            {
              name: "newsList",
              title: "合作交流",
              params: {
                type: 5
              },
              children: []
            },
            {
              name: "newsList",
              title: "科普活动",
              params: {
                type: 6
              },
              children: []
            },
            {
              name: "newsList",
              title: "专题报道",
              params: {
                type: 7
              },
              children: []
            }
          ]
        },
        {
          name: "resource",
          title: "资源服务",
          children: []
        },
        {
          name: "research",
          title: "科学研究",
          children: [
            {
              name: "achv",
              title: "科研成果"
            },
            {
              name: "project",
              title: "科研项目"
            }
          ]
        },
        {
          name: "thematic",
          title: "专题服务",
          children: [
            {
              name: "thematicList",
              title: "生产与实践",
              params: {
                type: 4
              },
              children: []
            },
            {
              name: "thematicList",
              title: "服务科学研究",
              params: {
                type: 5
              },
              children: []
            }
          ]
        },
        {
          name: "popularize",
          title: "科学普及",
          children: [
            {
              name: "knowledgePopularizeList",
              title: "科普知识",
              children: []
            },
            {
              name: "imagePopularizeList",
              title: "生态图片",
              children: []
            }
          ]
        },
        {
          name: "scene",
          title: "台站风光",
          children: []
        }
      ]
    };
  },
  computed: {
    go2Manage() {
      return CONFIG.MANAGE_URL;
    }
  },
  methods: {
    mouseover(name) {
      this.ulliVisible[name] = true;
    },
    mouseout(name) {
      var that = this;
      that.ulliVisible[name] = false;
      setTimeout(function() {}, 600);
    }
  }
};
</script>

<style lang="less" scoped>
@import "./header.less";
</style>
