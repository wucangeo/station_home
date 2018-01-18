<template>
  <div id="patent-info">
    <div class="left-nav-bar">
      <navbar :routers="routers" :title="navtitle" />
    </div>
    <div class="page-main-content">
      <Card>
        <p slot="title">
          <Icon type="compose"></Icon>
         专利详情
        </p>
        <p slot="extra">
          <router-link :to="{name:'patentAchvList'}">
            <Button type="text" icon="ios-search">返回</Button>
          </router-link>
        </p>
        <Form ref="dataAddForm" :model="formData" :label-width="200" style="width:600px">
          <FormItem label="发表年度" prop="year">
          {{formData.year}}
        </FormItem>
        <FormItem label="专利名称" prop="title">
          {{formData.title}}
        </FormItem>
        <FormItem label="申请号" prop="apply_code">
          {{formData.apply_code}}
        </FormItem>
        <FormItem label="申请日期" prop="apply_date">
          {{formData.apply_date|getCNDate}}
        </FormItem>
        <FormItem label="专利号" prop="patent_no">
          {{formData.patent_no}}
        </FormItem>
        <FormItem label="授权日期" prop="auth_date">
          {{formData.auth_date|getCNDate}}
        </FormItem>
        <FormItem label="专利状态" prop="patent_status">
          {{formData.patent_status}}
        </FormItem>
        <FormItem label="专利类别" prop="patent_type">
          {{formData.patent_type}}
        </FormItem>
        <FormItem label="国别/专利组织" prop="country_org">
          {{formData.country_org}}
        </FormItem>
        <FormItem label="专利权人" prop="author">
          {{formData.author}}
        </FormItem>
        <FormItem label="本台站所属单位排名" prop="rank_depart">
          {{formData.rank_depart}}
        </FormItem>
        <FormItem label="全部发明人" prop="co_author">
          {{formData.co_author}}
        </FormItem>
        <FormItem label="本单位首位发明人排序" prop="rank_author">
          {{formData.rank_author}}
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
        year: 2018, // '申请/授权年度',
        title: "", // '专利名称',
        apply_code: "", // '申请号',
        apply_date: "", // '申请日期',
        patent_no: "", // '专利号',
        auth_date: "", // '授权日期',
        patent_status: "授权", // '专利状态 授权/申请',
        patent_type: "实用新型", // '专利类别：实用新型',
        country_org: "", // '国别/专利组织',
        author: "", // '专利权人',
        rank_depart: 0, // '本台站所属单位排名',
        co_author: "", // '全部发明人',
        rank_author: 0, // '本单位首位发明人排序',
        file_path: "" // '证明材料电子版',
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
          name: `patentAchvList`
        });
      }, 1500);
      return;
    }
    this.data_id = parseInt(params.data_id);
    this.get(this.data_id);
  },
  methods: {
    async get(data_id) {
      let response = await this.apis.achv_patent.get(data_id);
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
