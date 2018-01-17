<template>
  <div id="station-introduce">
    <div class="left-nav-bar">
      <navbar :routers="routers" :title="navtitle" />
    </div>
    <div class="page-main-content">
      <Card>
        <p slot="title"> {{cardTitle}} </p>
        <Row>
            <Table :columns="tableColumns" :data="tableData.rows"></Table>
        </Row>
        <Row class="margin-top-10">
         <Page :total="tableData.count" :page-size="query.limit" @on-change="page_change" simple></Page>
        </Row>
      </Card>
    </div>
  </div>
</template>
<script>
import navbar from "@/components/common/navbar.vue";
export default {
  name: "user",
  data() {
    return {
      navtitle: "站点介绍",
      cardTitleList: [
        "新闻公告",
        "通知公告",
        "综合新闻",
        "科研动态",
        "服务动态",
        "合作交流",
        "科普活动",
        "专题报道"
      ],
      delayTimer: null, //用于搜索延迟
      page_num: 1,
      query: {
        keys: {
          type: 3, //类型为3，规章制度
          title: null
        },
        offset: 0,
        limit: 15,
        order: 0,
        order_by: "data_id"
      },
      tableColumns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "标题",
          key: "title",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "newsInfo",
                        params: { data_id: params.row.data_id, type: this.type }
                      });
                    }
                  }
                },
                params.row.title
              )
            ]);
          }
        },
        {
          title: "最近更新",
          key: "updated_at",
          width: 200,
          align: "center",
          render: (h, params) => {
            return h("div", this.filters.getENDate(params.row.updated_at));
          }
        }
      ],
      tableData: {}
    };
  },
  components: {
    navbar
  },
  computed: {
    routers() {
      return this.menus.news;
    },
    type() {
      return this.query.keys.type;
    },
    cardTitle() {
      return this.cardTitleList[this.type];
    }
  },
  watch: {
    "query.keys.title": function(val, oldVal) {
      if (this.delayTimer) {
        clearTimeout(this.delayTimer);
      }
      this.delayTimer = setTimeout(() => {
        this.list();
      }, 500);
    },
    $route(to, from) {
      let query = this.$route.query;
      let params = this.$route.params;
      if (query && query.page_num) {
        this.page_num = query.page_num;
        this.query.offset = (this.page_num - 1) * this.query.limit;
      }
      if (params && params.type) {
        this.query.keys.type = params.type;
      }
      this.list();
    }
  },
  methods: {
    async list() {
      let response = await this.apis.news.list(this.query);
      let result = response.data;
      if (result.code === 0) {
        this.$Message.error({
          content: result.msg,
          duration: 1.5
        });
        return;
      }
      this.tableData = result.data;
    },
    page_change(page_num) {
      this.page_num = page_num;
      this.$router.push({
        name: "newsList",
        params: { type: this.type },
        query: { page_num: page_num }
      });
    }
  },
  mounted() {
    // this.list();
  }
};
</script>
