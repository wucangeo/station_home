<template>
  <div id="station-introduce">
    <div class="left-nav-bar">
      <navbar :routers="routers" :title="title"/>
    </div>
    <div class="page-main-content">
      <Card>
        <p slot="title">
          台站简介
        </p>
        <p class="news-title">{{news.title}}</p>
        <p class="news-author-date">
          <span class="news-author">{{news.created_user}}</span>
          <span class="news-date">{{news.updated_at|getENDate}}</span>
        </p>
        <div class="html-content" v-html="news.content"></div>
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
    }
  },
  methods: {
    async get() {
      let query = {
        type: 1,
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

