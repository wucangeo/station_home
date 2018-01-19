<template>
  <div id="project-info">
    <div class="left-nav-bar">
      <navbar :routers="routers" :title="navtitle" />
    </div>
    <div class="page-main-content">
      <Card>
        <p slot="title">
          <Icon type="compose"></Icon>
         {{cardTitle}}
        </p>
        <p slot="extra">
          <router-link :to="{name:'projectList',type:'type'}">
            <Button type="text" icon="ios-search">返回</Button>
          </router-link>
        </p>
        <Form ref="dataAddForm" :model="formData" :label-width="150" style="width:600px">
          <FormItem label="课题名称" prop="title">
            {{formData.title}}
          </FormItem>
          <FormItem label="课题负责人" prop="author">
            {{formData.author}}
          </FormItem>
          <FormItem label="课题级别" prop="project_level">
            {{formData.project_level}}
          </FormItem>
          <FormItem label="课题总经费" prop="project_funds">
            {{formData.project_funds}}
          </FormItem>
          <FormItem label="课题所属项目来源部门" prop="project_depart">
            {{formData.project_depart}}
          </FormItem>
          <FormItem label="课题所属项目类型" prop="project_type">
            {{formData.project_type}}
          </FormItem>
          <FormItem label="起始日期" prop="start_date">
            {{formData.start_date}}
          </FormItem>
          <FormItem label="结束日期" prop="end_date">
            {{formData.end_date}}
          </FormItem>
          <FormItem label="新增/在研/结题" prop="project_status">
            {{formData.project_status}}
          </FormItem>
          <FormItem label="结题年份" prop="finish_year">
            {{formData.finish_year}}
          </FormItem>
          <FormItem label="填报年份" prop="fillin_year">
            {{formData.fillin_year}}
          </FormItem>
        </Form>
      </Card>
    </div>
  </div>
</template>
<script>
import navbar from "@/components/common/navbar.vue";
import Cookies from "js-cookie";
let access_token = Cookies.get("access_token");
export default {
  data() {
    return {
      navtitle: "科学研究",
      data_id: 0,
      cardTitleList: [
        "",
        "科技部项目",
        "基金委项目",
        "中科院项目",
        "其他部委项目",
        "地方项目",
        "其他项目"
      ],
      formData: {
        title: "", //'课题名称',
        author: "", // '课题负责人',
        type: 0, //科技部项目；基金委项目；中科院项目；其他部委项目；地方项目；其他项目；
        project_level: "", // '课题级别',
        project_funds: "", // '课题总经费',
        project_depart: "", // '课题所属项目来源部门',
        project_type: "", // '课题所属项目类型',
        start_date: "", // ' 起始日期',
        end_date: "", // '结束日期',
        project_status: "", // ' 新增/在研/结题',
        finish_year: 0, // '结题年份',
        fillin_year: 0 // '填报年份',
      },
      uploadHeader: { "x-access-token": access_token },
      uploadData: { type: 2 }
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
      return this.formData.type;
    },
    cardTitle() {
      return this.cardTitleList[this.type];
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
          name: `projectList`,
          params: { type: this.type }
        });
      }, 1500);
      return;
    }
    this.data_id = parseInt(params.data_id);
    this.formData.type = parseInt(params.type);
    this.get(this.data_id);
  },
  methods: {
    async get(data_id) {
      let response = await this.apis.project.get(data_id);
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
