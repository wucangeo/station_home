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
      navtitle: "科学研究",
      cardTitleList: [
        "科研项目",
        "科技部项目",
        "基金委项目",
        "中科院项目",
        "其他部委项目",
        "其他部委项目",
        "其他项目"
      ],
      delayTimer: null, //用于搜索延迟
      page_num: 1,
      query: {
        keys: {
          type: 1, //类型为3，规章制度
          enable: 1,
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
                        name: "projectInfo",
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
      return this.menus.research;
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
      this.init();
    }
  },
  methods: {
    init() {
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
    },
    async list() {
      let response = await this.apis.project.list(this.query);
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
        name: "projectList",
        params: { type: this.type },
        query: { page_num: page_num }
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
