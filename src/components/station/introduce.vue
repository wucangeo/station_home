<template>
  <div id="station-introduce">
    <div class="left-nav-bar">
      <navbar :routers="routers" :title="title" />
    </div>
    <div class="page-main-content">
      <Card>
        <p slot="title">
          台站简介
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
      title: "站点介绍",
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
    async get() {
      let query = {
        keys: { type: 1 },
        limit: 1
      };
      let response = await this.apis.station.list(query);
      let result = response.data;
      if (result.code === 0) {
        this.$Message.error({
          content: result.msg,
          duration: 1.5
        });
        return;
      }
      if (!result.data.rows || result.data.rows.length === 0) {
        this.$Message.error({
          content: "未获取到数据，请联系管理员初始数据。",
          duration: 1.5
        });
        return;
      }
      this.news = result.data.rows[0];
    }
  },
  mounted() {
    this.get();
  }
};
</script>
