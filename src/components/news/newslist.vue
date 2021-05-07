<template>
  <div class="newsList mb">
    <head-nav title="新闻列表"></head-nav>
    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="Loading" infinite-scroll-immediate-check="false" infinite-scroll-distance="5">
      <li v-for="item in newsList" :key="item._id">
        <router-link :to="{name: 'news.details', query: {id: item._id}}">
          <div class="pic">
            <img :src="item.picUrl" v-lazy="item.picUrl" alt="" width="100%" height="100%">
          </div>
          <div class="con">
            <h2 v-text="item.title"></h2>
            <p>
              <span class="fl" v-text="item.time"></span>
              <span class="fr">来源：{{item.source}}</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
    <p v-show="loading" class="page-infinite-loading">
      <mt-spinner type="fading-circle"></mt-spinner>
      加载中...
    </p>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  let nowdate = new Date();
  export default {
    name: "newslist",
    data(){
      return {
        data: [],
        newsList: [],
        loading: false
      }
    },
    created() {
      // 新闻列表
      this.axios.get(`/news/list`)
      .then(res => {
        this.newsList = res.data.newsList;
        this.data = res.data;
      })
      .catch(err => err);
    },
    methods: {
      loadMore() {
        if(new Date() - nowdate < 800) return;
        nowdate = new Date();
        this.loading = true;
        if(!this.data.hasData) return this.loading = false;
        this.axios.get(`/news/list?page=${this.data.nextPage}`)
        .then(res => {
          this.data = res.data;
          res.data.newsList.forEach(item => {
            this.newsList.push(item);
          })

          if(!res.data.hasData){
            this.openToast();
          }

          this.loading = false;
        })
        .catch(err => err);
      },
      openToast() {
        Toast('没有更多数据了');
      },
    }
  }
</script>

<style scoped lang="less">
  @rem: 750/10rem;
  .mb{
    margin-bottom: 130/@rem;
  }
  .newsList{
    text-align: left;
    ul li{
      padding: 25/@rem 0;
      border-bottom: 1px solid #ddd;
    }
    a{
      /*display: block !important;*/
      display: flex;
      justify-content: center;
    }
    .pic{
      width: 110/@rem;
      height: 110/@rem;
      margin-right: 25/@rem;
    }
    .con{
      width: 550/@rem;
      height: 110/@rem;

      display: flex;
      flex-flow: wrap;
      align-content:space-between;
    }
    h2{
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #555;
      font-weight: normal;
      font-size: 25/@rem;
    }
    p{
      width: 100%;
      color: #999;
      font-size: 22/@rem;
    }
    p span{
      /*-padding: 0 25/@rem;*/
    }
  }
</style>