<template>
  <div id="station-introduce">
    <div class="left-nav-bar">
      <navbar :routers="routers" :title="navtitle" />
    </div>
    <div class="page-main-content">
      <div class="image-item-view">
        <Card :padding="10">
          <p slot="title">{{imageItem.name}}</p>
          <p href="#" slot="extra">
            <router-link :to="{ name: 'imagePopularizeList' }">
              <Icon type="ios-arrow-back"></Icon>
              返回
            </router-link>
          </p>
          <p class="image-body">
            <a :href="imageItem.path|getAbsolutePath" target="_blank"><img v-show="imageItem.path" :src="imageItem.path | getAbsolutePath"></a>
          </p>
          <p class="image-item-footer">上传时间：{{imageItem.updated_at|getENDatetime}} </p>
        </Card>
      </div>
    </div>
  </div>
</template>
<script>
import navbar from "@/components/common/navbar.vue";
export default {
  name: "popularize-image-info",
  data() {
    return {
      navtitle: "科学普及",
      data_id: 0,
      type: 1,
      imageItem: {
        name: "",
        path: ""
      },
      cur_hover: null
    };
  },
  components: {
    navbar
  },
  computed: {
    routers() {
      return this.menus.popularize;
    }
  },
  methods: {
    async get(data_id) {
      let response = await this.apis.image.get(data_id);
      let result = response.data;
      if (result.code === 0) {
        this.$Message.error({
          content: result.msg,
          duration: 1.5
        });
        return;
      }
      this.imageItem = result.data;
    }
  },
  mounted() {
    let params = this.$route.params;
    if (!params || !params.data_id) {
      this.$Message.error({
        content: "参数错误，即将跳转至生态图片列表。",
        duration: 1.5
      });
      setTimeout(() => {
        this.$router.push({
          name: `imagePopularizeList`
        });
      }, 1500);
      return;
    }
    this.data_id = parseInt(params.data_id);
    this.get(this.data_id);
    //高度计算
    // let cardHeight = document.body.offsetHeight - 180;
    // document.getElementsByClassName("image-body")[0].style.height =
    //   cardHeight + "px";
  }
};
</script>
<style lang="less">
.image-item-view {
  margin: 10px;

  .ivu-card {
    height: 100%;
    width: 100%;
    .ivu-card-head {
      padding: 10px;
    }
    .image-item-footer {
      margin-top: 5px;
      color: #828282;
    }
  }
  .image-body {
    text-align: center;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
