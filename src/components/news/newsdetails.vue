<template>
  <div class="mb">
    <head-nav title="新闻详情"></head-nav>
    <div class="con">
      <h2 class="title" v-text="newsDetails.title"></h2>
      <span class="time" v-text="newsDetails.time"></span>
      <span class="source" v-text="newsDetails.source"></span>
      <img class="pic" :src="newsDetails.picUrl" alt="">
      <div class="content" v-html="newsDetails.des"></div>
      <p class="editor">
        <span>记者：{{newsDetails.reporter}}</span>
        <span>责编：{{newsDetails.editor}}</span>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "newsdetails",
    data(){
      return {
        newsDetails: {}
      }
    },
    created() {
      // 点击对应的新闻 显示对应的详情
      // 拿到对应的新闻id
      let id = this.$route.query.id;

      this.axios.get(`/news/detail/${id}`)
      .then(res => {
        //console.log(res);
        this.newsDetails = res.data;
      })
      .catch(err => err);

    }
  }
</script>

<style scoped lang="less">
  @rem: 750/10rem;
  .mb{
    margin-bottom: 130/@rem;
  }
  .con{
    padding: 20/@rem 40/@rem;
    h2{
      text-align: left;
    }
    .title{
      font-size: 40/@rem;
      color: #3f4146;
    }
    .source{
      font-size: 24/@rem;
    }
    .time{
      font-size: 20/@rem;
    }
    .pic{
      display: block;
      margin: auto;
      width: 670/@rem;
    }
    .content{
      padding: 20/@rem 0;
      font-size: 32/@rem;
      text-align: justify;
      text-indent: 2em;
    }
    .editor{
      display: flex;
      justify-content: space-between;
      color: #9d9ea3;
      font-size: 22/@rem;
    }
  }
</style>