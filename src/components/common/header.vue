<template>
  <div id="common-header">
    <div class="right-btn">
      <Button type="warning">管理平台</Button>
    </div>
    <div class="nav-bar">
      <ul>
        <li>
          <router-link :to="{name:'homeView'}">
            首页</router-link>
        </li>
        <li @mouseover="mouseover('station')" @mouseout="mouseout('station')">
          <router-link :to="{name:'homeView'}">
            站点介绍</router-link>
          <ul v-show="ulliVisible.station">
            <li>
              <router-link :to="{name:'homeView'}">台站简介</router-link>
            </li>
            <li>
              <router-link :to="{name:'homeView'}">历史沿革</router-link>
            </li>
            <li>
              <router-link :to="{name:'homeView'}">人员组成</router-link>
            </li>
            <li>
              <router-link :to="{name:'homeView'}">规章制度</router-link>
            </li>
          </ul>
        </li>
        <li @mouseover="mouseover('news')" @mouseout="mouseout('news')">
          <router-link :to="{name:'homeView'}">
            新闻公告</router-link>
          <ul v-show="ulliVisible.news">
            <li>
              <router-link :to="{name:'homeView'}">通知公告</router-link>
            </li>
            <li>
              <router-link :to="{name:'homeView'}">综合新闻</router-link>
            </li>
            <li>
              <router-link :to="{name:'homeView'}">科研动态</router-link>
            </li>
            <li>
              <router-link :to="{name:'homeView'}">合作交流</router-link>
            </li>
            <li>
              <router-link :to="{name:'homeView'}">科普活动</router-link>
            </li>
            <li>
              <router-link :to="{name:'homeView'}">专题报道</router-link>
            </li>
          </ul>
        </li>
        <li @mouseover="mouseover('resource')" @mouseout="mouseout('resource')">
          <router-link :to="{name:'homeView'}">
            资源服务</router-link>
        </li>
        <li @mouseover="mouseover('research')" @mouseout="mouseout('research')">
          <router-link :to="{name:'homeView'}">
            科学研究</router-link>
        </li>
        <li @mouseover="mouseover('thematic')" @mouseout="mouseout('thematic')">
          <router-link :to="{name:'homeView'}">
            专题服务</router-link>
        </li>
        <li @mouseover="mouseover('popularize')" @mouseout="mouseout('popularize')">
          <router-link :to="{name:'homeView'}">
            科学普及</router-link>
        </li>
        <li @mouseover="mouseover('view')" @mouseout="mouseout('view')">
          <router-link :to="{name:'homeView'}">
            台站风光</router-link>
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
        station: false,
        news: false,
        resource: false,
        research: false,
        thematic: false,
        popularize: false,
        view: false
      }
    }
  },
  methods: {
    mouseover(name) {
      this.ulliVisible[name] = true;
    },
    mouseout(name) {
      var that = this;
      that.ulliVisible[name] = false;
      setTimeout(function() {}, 600)
    }
  }
};

</script>

<style lang="less" scoped>
@import "./header.less";

</style>
