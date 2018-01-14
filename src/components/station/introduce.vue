<template>
  <div id="station-introduce">
      <div class="left-nav-bar">
        <navbar :routers="routers" :title="title"/>
      </div>
      <div class="page-main-content">sdfsdf
      </div>
  </div>
</template>
<script>
import navbar from "@/components/common/navbar.vue";
export default {
  data() {
    return {
      title: "站点介绍",
      routers: [
        {
          name: "stationIntroduce",
          title: "台站简介",
          children: []
        },
        {
          name: "stationHistory",
          title: "历史沿革",
          children: []
        }
      ]
    };
  },
  components: {
    navbar
  }
};
</script>

