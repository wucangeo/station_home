<template>
  <div id="common-header">
    <div class="right-btn">
      <Button type="warning">管理平台</Button>
    </div>
    <div class="nav-bar">
      <ul>
        <li v-for="item in routers" @mouseover="mouseover(item.name)" @mouseout="mouseout(item.name)">
          <router-link :to="{name:item.name}">
            {{item.title}}</router-link>
          <ul v-show="ulliVisible[item.name]">
            <li v-for="child in item.children">
              <router-link :to="{name:child.name}">{{child.title}}</router-link>
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
        view: false
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
              name: "StationHistory",
              title: "历史沿革"
            }
          ]
        }
      ]
    };
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
