<template>
  <div>
    <el-card>
      <div style="display: flex; align-items: center;">
        <div class="line"></div>
        <span>{{ title }}</span>
      </div>

    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: '欢迎',
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  // display: flex;
  // justify-content: left;
  .line {
    width: 4px;
    height: 20px;
    background-color: #368955;
    margin-right: 15px;
    margin-left: 15px;
  }
}
</style>
