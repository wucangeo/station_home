<template>
  <div id="app">
    <div id="app-body">
      <div class="common-center">
        <header-view/>
      </div>
      <div class="main-content">
        <router-view/>
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
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  background: #fff url(../static/bg_img2.png) repeat-x top;
}
#app-body {
  background: url(../static/bg_img1.png) no-repeat center top;
}
.common-center {
  width: 1000px;
  margin: 0 auto;
}
.main-content {
  min-height: 600px;
}
</style>
