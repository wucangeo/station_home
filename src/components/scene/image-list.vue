<template>
  <div id="station-introduce">
    <div class="left-nav-bar">
      <navbar :routers="routers" :title="navtitle" />
    </div>
    <div class="page-main-content">
      <Row type="flex" justify="start" class="image-list-row">
        <Col class="image-item" v-for="item in image_list">
          <div>
            <Card :padding="10">
              <p slot="title" v-if="cur_edit!=item.data_id">{{item.name}}</p>
              <p class="image-container">
                <router-link :to="{ name: 'imageSceneInfo', params: { data_id:item.data_id }}"><img :src="item.path | getAbsolutePath"></router-link>
              </p>
              <p class="image-item-footer">{{item.updated_at|getENDatetime}} </p>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
import navbar from "@/components/common/navbar.vue";
export default {
  name: "popularize-image",
  data() {
    return {
      navtitle: "台站风光",
      query: {
        keys: {
          name: null,
          type: 2
        },
        offset: 0,
        limit: -1,
        order: 0,
        order_by: "data_id"
      },
      image_list: [],
      cur_hover: null,
      is_add_modal: false,
      cur_edit: null,
      newImageName: ""
    };
  },
  components: {
    navbar
  },
  computed: {
    routers() {
      return this.menus.scene;
    }
  },
  watch: {},
  methods: {
    async list() {
      let response = await this.apis.image.list(this.query);
      let result = response.data;
      if (result.code === 0) {
        this.$Message.error({
          content: result.msg,
          duration: 1.5
        });
        return;
      }
      this.image_list = result.data.rows;
    }
  },
  mounted() {
    this.list();
  }
};
</script>
<style lang="less">
.image-list-row {
  // overflow-y: auto;
  .image-item {
    width: 243px;
    height: 200px;
    margin: 8px 4px;
    overflow: hidden;
    .ivu-card {
      height: 100%;
      width: 100%;
      .ivu-card-head {
        padding: 10px;
      }
      .image-item-footer {
        margin-top: 3px;
        color: #a5a5a5;
        font-size: 10px;
      }
      .image-item-title {
        margin-bottom: 10px;
      }
      .image-body {
        cursor: pointer;
      }
      .image-container {
        width: 100%;
        height: 111px;
        overflow: hidden;
        text-align: center;
        img {
          height: auto;
          width: 100%;
          max-width: 100%;
        }
      }
    }
  }
}
</style>
