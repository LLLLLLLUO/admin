<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
  html, body, #app, .el-container, .el-aside, .el-main {
    height: 100%;
  }
</style>
