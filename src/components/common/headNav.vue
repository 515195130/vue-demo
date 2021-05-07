<template>
  <div>
    <div class="head-wrap"></div>
    <header>
      <a href="javascript:void(0);" class="iconfont icon-fanhui" @click="goBack">返回</a>
      <span>{{title}}</span>
      <a href="javascript:void(0);" class="iconfont icon-diandian"></a>
    </header>
<!--    <mt-header>-->
<!--      <router-link to="/" slot="left">-->
<!--        <mt-button icon="back">返回</mt-button>-->
<!--        {{title}}-->
<!--      </router-link>-->
<!--      <mt-button icon="more" slot="right"></mt-button>-->
<!--    </mt-header>-->
  </div>
</template>

<script>
  export default {
    name: "headNav",
    data(){
      return {

      }
    },
    // 接收来自父组件的参数
    props: ['title'],
    created() {

    },
    methods: {
      goBack(){
        this.$router.go(-1);
      }
    }

  }
</script>

<style scoped lang="less">
  @rem: 750/10rem;
  .head-wrap{
    width: 750/@rem;
    height: 80/@rem;
    line-height: 80/@rem;
  }
  header{
    position: fixed;
    top: 0;
    width: 750/@rem;
    height: 80/@rem;
    line-height: 80/@rem;
    /*background-color: #3c3f41;*/
    background-color: #26a2ff;
    color: white !important;
    font-size: 35/@rem;
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: justify;
    -moz-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    letter-spacing: 2px;
    text-align: center;
    z-index: 100;

    a{
      width: 150/@rem;
      color: white !important;
    }
  }
</style>