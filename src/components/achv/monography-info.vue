<template>
  <div id="monography-info">
    <div class="left-nav-bar">
      <navbar :routers="routers" :title="navtitle" />
    </div>
    <div class="page-main-content">
      <Card>
        <p slot="title">
          <Icon type="compose"></Icon>
         专著详情
        </p>
        <p slot="extra">
          <router-link :to="{name:'monographyAchvList'}">
            <Button type="text" icon="ios-search">返回</Button>
          </router-link>
        </p>
        <Form ref="dataAddForm" :model="formData" :label-width="200" style="width:600px">
          <FormItem label="发表年度" prop="year">
            {{formData.year}}
          </FormItem>
          <FormItem label="著作名称" prop="title">
            {{formData.title}}
          </FormItem>
          <FormItem label="出版类型" prop="pub_type">
            {{formData.pub_type}}
          </FormItem>
          <FormItem label="著作类别" prop="categories">
            {{formData.categories}}
          </FormItem>
          <FormItem label="总字数" prop="word_count">
            {{formData.word_count}}
          </FormItem>
          <FormItem label="出版社" prop="press">
            {{formData.press}}
          </FormItem>
          <FormItem label="书号" prop="book_number">
            {{formData.book_number}}
          </FormItem>
          <FormItem label="出版时间" prop="pub_date">
            {{formData.pub_date}}
          </FormItem>
          <FormItem label="单位排名" prop="rank_depart">
            {{formData.rank_depart}}
          </FormItem>
          <FormItem label="全部封面作者" prop="author">
            {{formData.author}}
          </FormItem>
          <FormItem label="本单位首位封面作者排名" prop="rank_author">
            {{formData.rank_author}}
          </FormItem>
          <FormItem label="章节作者" prop="co_author">
            {{formData.co_author}}
          </FormItem>
          <FormItem label="著作首页、版权页及章节作者证明页电子版" prop="certified_path">
            <a :href="downloadPath" v-if="formData.certified_path" target="_blank">
              <Button>下载</Button>
            </a>
            <span v-if="!formData.certified_path">无 </span>
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
        pub_type: "", // 出版类别:1国内出版-中文;2?
        categories: "", // 著作类别：1专著；2？
        word_count: 0, //'总字数（千）',
        press: "", // 出版社
        book_number: "", // 书号（如 978-7-03-045836-0)
        pub_date: "", // 出版时间
        rank_depart: 0, //   单位排名
        author: "", // 全部封面作者
        rank_author: 0, // 本单位首位作者排名
        co_author: "", // 章节作者
        certified_path: "" // 著作首页、版权页及章节作者证明页电子版
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
      return CONFIG.SERVER_URL + this.formData.certified_path;
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
          name: `monographyAchvList`
        });
      }, 1500);
      return;
    }
    this.data_id = parseInt(params.data_id);
    this.get(this.data_id);
  },
  methods: {
    async get(data_id) {
      let response = await this.apis.achv_monography.get(data_id);
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
