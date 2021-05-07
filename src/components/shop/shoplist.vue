<template>
  <div class="mb">
    <head-nav title="商品"></head-nav>
    <section class="likeYou">
      <ul id="likeYouList" v-infinite-scroll="loadMore" infinite-scroll-disabled="Loading" infinite-scroll-immediate-check="false" infinite-scroll-distance="5">
        <li v-for="(item, index) in shopList" :key="index">
          <router-link :to="{name: 'shop.detail', query:{id: item._id}}" :title="item.des">
            <div class="pic">
              <img width="100%" height="100%" :src="item.imgUrl" v-lazy="item.imgUrl" :alt="item.des">
            </div>
            <p class="des" v-text="item.des"></p>
            <div class="shopPrice clearFix">
              <div class="left fl">
                <span class="symbol" v-text="item.symbol"></span>
                <span class="price" v-text="item.price"></span>
              </div>
              <div class="alreadyPaid fr" v-text="item.alreadyPaid"></div>
            </div>
          </router-link>
        </li>
      </ul>
      <p v-show="loading" class="page-infinite-loading">
        <mt-spinner type="fading-circle"></mt-spinner>
        加载中...
      </p>
    </section>
  </div>
</template>

<script>
  import {Toast} from "mint-ui";
  let nowdate = new Date();
  export default {
    name: "shoplist",
    data(){
      return {
        shopList: [],
        loading: false,
        data: []
      }
    },
    created() {
      this.axios.get(`shop/list`)
      .then(res => {
        //console.log(res);
        this.shopList = res.data.goodslist;
        this.data = res.data;
      })
      .catch(err => err);
    },
    methods: {
      loadMore(){
        if(new Date() - nowdate < 800) return;
        nowdate = new Date();
        this.loading = true;
        if(!this.data.hasData) return this.loading = false;
        this.axios.get(`shop/list?page=${this.data.nextPage}`)
            .then(res => {
              this.data = res.data;
              res.data.goodslist.forEach(item => {
                this.shopList.push(item);
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

  .likeYou{
    overflow: hidden;
    position: relative;
    padding-top: 30/@rem;
    background-color: #eee;

    ul{
      display: -webkit-flex;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    ul li{
      width: 370/@rem;
      height: 528/@rem;
      background: white;
      font-size: 27/@rem !important;
      overflow: hidden;
      margin-bottom: 10/@rem;
    }
    ul li a{
      display: block;
    }
    ul li .pic{
      height: 369/@rem;
    }

    ul li .des{
      font-size: 27/@rem !important;
      padding:0 20/@rem;
      margin: 20/@rem 0;
      height: 70/@rem;
      text-align: justify;
      overflow: hidden;
      text-overflow: ellipsis;
      max-height: 64/@rem;
      -webkit-line-clamp: 2;
      word-break: break-all;
      line-height: 35/@rem;
      color: rgb(51, 51, 51);
    }

    ul li .shopPrice{
      padding:0 14/@rem;
    }
    ul li .left{
      font-size: 0;
      color: #ff5000;
    }
    ul li .symbol{
      font-size: 10/@rem;
    }
    ul li .price{
      font-size: 27/@rem;
    }
    ul li .alreadyPaid{
      color: rgb(153, 153, 153);;
    }
    .page-infinite-loading{
      color: #999;
      font-size: 22/@rem;
    }
  }

</style>