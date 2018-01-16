<template>
  <div id="station-introduce">
    <div class="left-nav-bar">
      <navbar :routers="routers" :title="navtitle" />
    </div>
    <div class="page-main-content">
      <Card>
        <p slot="title">
          历史沿革
        </p>
        <p class="news-title">{{news.title}}</p>
        <p class="news-author-created">
          <span class="news-author">{{created_user}}</span>
          <span class="news-date">{{news.created_at|getENDate}}</span>
        </p>
        <div class="html-content" v-html="news.content"></div>
         <p class="news-author-updated">
          <span class="news-author">最近更新：{{updated_user}}</span>
          <span class="news-date">{{news.updated_at|getENDate}}</span>
        </p>
      </Card>
    </div>
  </div>
</template>
<script>
import navbar from "@/components/common/navbar.vue";
export default {
  data() {
    return {
      navtitle: "站点介绍",
      news: {
        title: "",
        content: ""
      }
    };
  },
  components: {
    navbar
  },
  computed: {
    routers() {
      return this.menus.station;
    },
    updated_user() {
      if (this.news.user_updated) {
        return this.news.user_updated.name;
      } else {
        return "管理员";
      }
    },
    created_user() {
      if (this.news.user_created) {
        return this.news.user_created.name;
      } else {
        return "管理员";
      }
    }
  },
  methods: {
    async get(data_id) {
      let response = await this.apis.station.get(data_id);
      let result = response.data;
      if (result.code === 0) {
        this.$Message.error({
          content: result.msg,
          duration: 1.5
        });
        return;
      }
      if (!result.data) {
        this.$Message.error({
          content: "未获取到数据。",
          duration: 1.5
        });
        return;
      }
      this.news = result.data;
    }
  },
  mounted() {
    let params = this.$route.params;
    if (!params || !params.data_id) {
      this.$Message.error({
        content: "参数错误，即将跳转至规章制度列表。",
        duration: 1.5
      });
      setTimeout(() => {
        this.$router.push({ name: "stationRegulation" });
      }, 1500);
      return;
    }
    this.data_id = params.data_id;
    this.get(this.data_id);
  }
};
</script>
