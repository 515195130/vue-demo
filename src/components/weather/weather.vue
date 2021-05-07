<template>
  <div class="bg">
    <head-nav title="实时天气预报"></head-nav>
    <date-weather></date-weather>
  </div>
</template>

<script>
  export default {
    name: "weather",
    data(){
      return {

      }
    }
  }
</script>

<style scoped lang="less">
  @rem:750/10rem;
  .bg{
    height: e("calc(100% - 2.8rem)");
    background: -webkit-linear-gradient(top, #394984, #edb46d) !important;
  }
</style>