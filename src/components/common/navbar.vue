<template>
  <div id="nav-bar">
      <div class="nav-title">{{title}}</div>
      <div class="nav-content">
          <ul>
              <li v-for="item in routers"><router-link :to="{name:item.name}">
            {{item.title}}</router-link>
                  <ul >
                      <li v-for="child in item.children"><router-link :to="{name:child.name}">{{child.title}}</router-link></li>
                  </ul>
              </li>
          </ul>
      </div>
  </div>
</template>
<script>
export default {
  props: ["routers", "title"],
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>

</style>

