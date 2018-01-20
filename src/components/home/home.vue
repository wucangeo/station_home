<template>
  <div id="sys-home">
    <div class="home-left">
      <Card style="width:700px" class="border-top">
        <p slot="title" class="home-card-title">综合新闻</p>
        <p slot="extra">
          <router-link :to="{name:'newsList',params:{type:2}}">
            <Button type="text">更多>></Button>
          </router-link>
        </p>
        <ul class="home-news-item" >
          <li v-for="item in zhNews">
            <router-link :to="{name:'newsInfo',params:{type:3,data_id:item.data_id}}" >
             <span class="home-news-title" style="width:600px">· {{item.title}}</span>
            <span class="home-news-date">[{{item.created_at|getENDate}}]</span>
            </router-link>
          </li>
        </ul>
      </Card>
      <div class="home-left-panel">
        <Card style="width:345px;height:300px;" class="border-top">
          <p slot="title" class="home-card-title">科学研究</p>
          <p slot="extra">
            <router-link :to="{name:'research'}">
              <Button type="text">更多>></Button>
            </router-link>
          </p>
          <div class="qiehuan_div">
            <ul>
              <li @mouseover="achvTypeOver=1">
                <router-link :to="{name:'paperAchvList'}">论文</router-link>
              </li>
              <li @mouseover="achvTypeOver=2">
                <router-link :to="{name:'patentAchvList'}">专利</router-link>
              </li>
              <li @mouseover="achvTypeOver=3">
                <router-link :to="{name:'projectList',params:{type:1}}">科研项目</router-link>
              </li>
            </ul>
          </div>
          <ul class="home-news-item" v-show="achvTypeOver===1">
            <li v-for="item in achvPaper">·
              <router-link :to="{name:'paperAchvInfo',params:{data_id:item.data_id}}" >
                <span class="home-news-title" style="width:245px"> {{item.title}}</span>
                <span class="home-news-date">[{{item.created_at|getENDate}}]</span>
              </router-link>
            </li>
          </ul>
          <ul class="home-news-item"  v-show="achvTypeOver===2">
            <li v-for="item in achvpatents">
              <router-link :to="{name:'patentAchvInfo',params:{data_id:item.data_id}}" >
                <span class="home-news-title" style="width:245px">· {{item.title}}</span>
                <span class="home-news-date">[{{item.created_at|getENDate}}]</span>
              </router-link>
            </li>
          </ul>
          <ul class="home-news-item" >
            <li v-for="item in achvProjects" v-show="achvTypeOver===3">
              <router-link :to="{name:'projectInfo',params:{type:3,data_id:item.data_id}}" >
                <span class="home-news-title" style="width:245px">· {{item.title}}</span>
                <span class="home-news-date">[{{item.created_at|getENDate}}]</span>
              </router-link>
            </li>
          </ul>
        </Card>
      </div>
    </div>
    <div class="home-right">
      <Card style="width:280px" class="border-top">
        <p slot="title" class="home-card-title">通知公告</p>
        <p slot="extra">
          <router-link :to="{name:'newsList',params:{type:1}}">
            <Button type="text">更多>></Button>
          </router-link>
        </p>
        <ul class="home-news-item">
          <li v-for="item in tzggNews">
            <router-link :to="{name:'newsInfo',params:{type:1,data_id:item.data_id}}" >
             <span class="home-news-title" style="width:180px">· {{item.title}}</span>
            <span class="home-news-date">[{{item.created_at|getENDate}}]</span>
            </router-link>
          </li>
        </ul>
      </Card>
      <Card style="width:280px;" class="border-top">
        <p slot="title" class="home-card-title">科研动态</p>
        <p slot="extra">
          <router-link :to="{name:'newsList',params:{type:3}}">
            <Button type="text">更多>></Button>
          </router-link>
        </p>
        <ul class="home-news-item">
          <li v-for="item in kydtNews">
            <router-link :to="{name:'newsInfo',params:{type:3,data_id:item.data_id}}" >
             <span class="home-news-title" style="width:180px">· {{item.title}}</span>
            <span class="home-news-date">[{{item.created_at|getENDate}}]</span>
            </router-link>
          </li>
        </ul>
      </Card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tzggNews: [], //通知公告1
      zhNews: [], //综合新闻2
      kydtNews: [], //科研动态3
      achvPaper: [], //科研论文
      achvpatents: [], //科研专著
      achvProjects: [], //科研项目
      achvTypeOver: 1 //鼠标滑过的科学研究类型
    };
  },
  methods: {
    async getNews(type, limit) {
      let query = {
        keys: {
          type
        },
        offset: 0,
        limit,
        order: 0,
        order_by: "data_id"
      };
      let response = await this.apis.news.list(query);
      let result = response.data;
      if (result.code === 0) {
        return [];
      }
      return result.data.rows;
    },
    async getAchvPaper(limit) {
      let query = {
        offset: 0,
        limit,
        order: 0,
        order_by: "data_id"
      };
      let response = await this.apis.achv_paper.list(query);
      let result = response.data;
      if (result.code === 0) {
        return [];
      }
      this.achvPaper = result.data.rows;
    },
    async getAchvpatent(limit) {
      let query = {
        offset: 0,
        limit,
        order: 0,
        order_by: "data_id"
      };
      let response = await this.apis.achv_patent.list(query);
      let result = response.data;
      if (result.code === 0) {
        return [];
      }
      this.achvpatents = result.data.rows;
    },
    async getAchvProject(limit) {
      let query = {
        offset: 0,
        limit,
        order: 0,
        order_by: "data_id"
      };
      let response = await this.apis.project.list(query);
      let result = response.data;
      if (result.code === 0) {
        return [];
      }
      this.achvProjects = result.data.rows;
    }
  },
  async mounted() {
    this.tzggNews = await this.getNews(1, 5);
    this.zhNews = await this.getNews(2, 5);
    this.kydtNews = await this.getNews(3, 5);
    await this.getAchvPaper(9);
    await this.getAchvpatent(9);
    await this.getAchvProject(9);
  }
};
</script>
<style lang="less">
#sys-home {
  height: 1000px;
  background-color: #fff;
  padding: 1px;
  .home-left {
    float: left;
    width: 700px;
  }
  .home-right {
    margin-left: 715px;
  }
  .ivu-card {
    margin-top: 10px;
  }

  .ivu-card-head {
    padding: 5px 16px;
  }
  .ivu-card-extra {
    position: absolute;
    right: 0px;
    top: 3px;
  }
  .ivu-card-body {
    padding: 8px;
  }
  .home-card-title {
    font-size: 14px;
    color: #3566ac;
    font-weight: bold;
    font-family: "微软雅黑";
  }
  .border-top {
    .ivu-card-head {
      border-top: 2px solid #195a97;
    }
  }
  .home-news-item {
    font-size: 12px;
    line-height: 19px;
    a {
      text-decoration: none;
      color: #737373;
      &:hover {
        color: #e9760c;
      }
      .home-news-title {
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .home-news-date {
        overflow: hidden;
        display: inline-block;
      }
    }
  }
  .qiehuan_div {
    height: 25px;
    background: #e8e8e9;
    margin-bottom: 5px;
    ul {
      margin: 0px;
      padding: 0px;
      li {
        float: left;
        margin: 0px;
        padding: 0px;
        list-style-type: none;
        a {
          height: 25px;
          float: left;
          padding-left: 15px;
          padding-right: 15px;
          text-align: center;
          display: block;
          line-height: 25px;
          color: #3566ac;
          &:hover {
            color: #fff;
            background: #3566ac;
          }
        }
      }
    }
  }
}
</style>
