<template>
  <div id="paper-info">
    <div class="left-nav-bar">
      <navbar :routers="routers" :title="navtitle" />
    </div>
    <div class="page-main-content">
      <Card>
        <p slot="title">
          <Icon type="compose"></Icon>
         论文详情
        </p>
        <p slot="extra">
          <router-link :to="{name:'paperAchvList'}">
            <Button type="text" icon="ios-search">返回</Button>
          </router-link>
        </p>
        <Form ref="dataAddForm" :model="formData" :label-width="150" style="width:600px">
           <FormItem label="发表年度" prop="year">
          {{formData.year}}
        </FormItem>
        <FormItem label="论文标题" prop="title">
          {{formData.title}}
        </FormItem>
        <FormItem label="刊物名称" prop="journal">
          {{formData.journal}}
        </FormItem>
        <FormItem label="年,卷期,页码" prop="volume">
          {{formData.volume}}
        </FormItem>
        <FormItem label="标准刊号" prop="issue_number">
          {{formData.issue_number}}
        </FormItem>
        <FormItem label="全部作者" prop="author">
          {{formData.author}}
        </FormItem>
        <FormItem label="通讯作者" prop="co_author">
          {{formData.co_author}}
        </FormItem>
        <FormItem label="摘要" prop="abstract">
          {{formData.abstract}}
        </FormItem>
        <FormItem label="单位标注排名" prop="rank_depart">
          {{formData.rank_depart}}
        </FormItem>
        <FormItem label="本单位首位作者排名" prop="rank_author">
          {{formData.rank_author}}
        </FormItem>
        <FormItem label="刊物级别" prop="journal_level">
          {{formData.journal_level}}
        </FormItem>
        <FormItem label="影响因子" prop="index">
          {{formData.index}}
        </FormItem>
        <FormItem label="是否国际合作论文" prop="is_coop">
          {{formData.is_coop===1?"是":"否"}}
        </FormItem>
        <FormItem label="备注" prop="remark">
          {{formData.remark}}
        </FormItem>
        <FormItem label="论文附件" prop="file_path">
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
        year: 2018, //发表年份
        title: "", //标题
        journal: "", //期刊名称
        volume: "", //年，卷期，页码
        issue_number: "", //标准刊号
        author: "", //全部作者
        co_author: "", //通讯作者
        abstract: "", //摘要
        rank_depart: 1, //单位标注排名
        rank_author: 1, //本单位首位作者排名
        journal_level: "SCI", //刊物级别：1SCI；2专著；3中文；4其他
        index: 0, //SCI/SSCI影响因子
        is_coop: 0, //是否为国际合作论文
        remark: "", //备注
        file_path: "" //文件路径
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
          name: `paperAchvList`
        });
      }, 1500);
      return;
    }
    this.data_id = parseInt(params.data_id);
    this.get(this.data_id);
  },
  methods: {
    async get(data_id) {
      let response = await this.apis.achv_paper.get(data_id);
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
