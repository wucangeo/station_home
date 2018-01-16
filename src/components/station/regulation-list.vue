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
        <Row class="margin-top-10 searchable-table-con1">
        <Table :columns="tableColumns" :data="tableData"></Table>
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
      delayTimer: null, //用于搜索延迟
      query: {
        keys: {
          type: 3, //类型为3，规章制度
          title: null
        },
        offset: 0,
        limit: 10,
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
                        name: "stationRegulationInfo",
                        params: { data_id: params.row.data_id }
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
      tableData: []
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
  watch: {
    "query.keys.title": function(val, oldVal) {
      if (this.delayTimer) {
        clearTimeout(this.delayTimer);
      }
      this.delayTimer = setTimeout(() => {
        this.list();
      }, 500);
    }
  },
  methods: {
    async list() {
      let response = await this.apis.station.list(this.query);
      let result = response.data;
      if (result.code === 0) {
        this.$Message.error({
          content: result.msg,
          duration: 1.5
        });
        return;
      }
      this.tableData = result.data.rows;
    },
    async update_enable(status, data_id) {
      let response = await this.apis.station.update(
        { enable: status },
        data_id
      );
      let result = response.data;
      if (result.code === 1) {
        this.$Message.success({
          content: result.msg,
          duration: 1.5
        });
      } else {
        this.$Message.error({
          content: result.msg,
          duration: 1.5
        });
      }
      this.list();
    },
    async remove(data_id) {
      let response = await this.apis.station.delete([data_id]);
      let result = response.data;
      if (result.code === 1) {
        this.$Message.success({
          content: result.msg,
          duration: 1.5
        });
      } else {
        this.$Message.error({
          content: result.msg,
          duration: 1.5
        });
      }
      this.list();
    },
    add_news() {
      this.$router.push({
        name: "stationRegulationAdd"
      });
    }
  },
  mounted() {
    this.list();
  }
};
</script>
