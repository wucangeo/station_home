<template>
  <div id="awards-info">
    <div class="left-nav-bar">
      <navbar :routers="routers" :title="navtitle" />
    </div>
    <div class="page-main-content">
      <Card>
        <p slot="title">
          <Icon type="compose"></Icon>
         奖项详情
        </p>
        <p slot="extra">
          <router-link :to="{name:'awardsAchvList'}">
            <Button type="text" icon="ios-search">返回</Button>
          </router-link>
        </p>
        <Form ref="dataAddForm" :model="formData" :label-width="200" style="width:600px">
          <FormItem label="授予年度" prop="year">
            {{formData.year}}
          </FormItem>
          <FormItem label="获奖项目名称" prop="title">
            {{formData.title}}
          </FormItem>
          <FormItem label="奖项类别" prop="awards_type">
            {{formData.awards_type}}
          </FormItem>
          <FormItem label="获奖等级" prop="awards_class">
            {{formData.awards_class}}
          </FormItem>
          <FormItem label="获奖级别" prop="awards_level">
            {{formData.awards_level}}
          </FormItem>
          <FormItem label="设奖单位" prop="awards_depart">
            {{formData.awards_depart}}
          </FormItem>
          <FormItem label="获奖年份" prop="awards_year">
            {{formData.awards_year}}
          </FormItem>
          <FormItem label="团体/个人奖项" prop="awards_oneorgroup">
            {{formData.awards_oneorgroup}}
          </FormItem>
          <FormItem label="全部完成单位" prop="author">
            {{formData.author}}
          </FormItem>
          <FormItem label="本单位排名" prop="rank_depart">
            {{formData.rank_depart}}
          </FormItem>
          <FormItem label="全部完成人" prop="co_author">
            {{formData.co_author}}
          </FormItem>
          <FormItem label="本单位首位完成人排名" prop="rank_author">
            {{formData.rank_author}}
          </FormItem>
          <FormItem label="备注" prop="remark">
            {{formData.remark}}
          </FormItem>
          <FormItem label="证明材料电子版" prop="file_path">
            <a :href="downloadPath" v-if="formData.file_path" target="_blank">
              <Button>下载</Button>
            </a>
            <span v-if="!formData.file_path">无 </span>
          </FormItem>
        </Form>
      </Card>
    </div>
  </div>
</template>
<script>
import navbar from "@/components/common/navbar.vue";
export default {
  data() {
    return {
      navtitle: "科学研究",
      data_id: 0,
      formData: {
        year: 1, //'授予年度',
        title: "", //'获奖项目名称',
        awards_type: "", //'奖项类别',
        awards_class: "", //'获奖等级',
        awards_level: "", //'获奖级别',
        awards_depart: "", //'设奖单位',
        awards_year: "", //'获奖年份',
        awards_oneorgroup: "", ///个人奖项',
        author: "", //'全部完成单位',
        rank_depart: 1, //'本单位排名',
        co_author: "", //'全部完成人',
        rank_author: 1, //'本单位首位完成人排名',
        remark: "", //'备注',
        file_path: "" //'证明材料电子版',
      }
    };
  },
  components: {
    navbar
  },
  computed: {
    routers() {
      return this.menus.research;
    },
    downloadPath: function() {
      return CONFIG.SERVER_URL + this.formData.file_path;
    }
  },
  mounted() {
    //获取待编辑数据
    let params = this.$route.params;
    if (!params || !params.data_id) {
      this.$Message.error({
        content: "参数错误，即将跳转至项目列表。",
        duration: 1.5
      });
      setTimeout(() => {
        this.$router.push({
          name: `awardsAchvList`
        });
      }, 1500);
      return;
    }
    this.data_id = parseInt(params.data_id);
    this.get(this.data_id);
  },
  methods: {
    async get(data_id) {
      let response = await this.apis.achv_awards.get(data_id);
      let result = response.data;
      if (result.code === 0) {
        this.$Message.error({
          content: result.msg,
          duration: 1.5
        });
        return;
      }
      this.formData = result.data;
    }
  }
};
</script>
