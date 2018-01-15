<template>
  <div id="app">
    <div id="app-body">
      <div class="common-center">
        <header-view/>
        <div class="main-content">
          <router-view/>
        </div> 
      </div>
      <div class="footer">
        <footer-view/>
      </div>
    </div>
  </div>
</template>

<script>
import headerView from "@/components/common/header.vue";
import footerView from "@/components/common/footer.vue";
export default {
  name: "App",
  components: {
    footerView,
    headerView
  },
  mounted() {}
};
</script>

<style lang="less">
@import "./style.less";
</style>
