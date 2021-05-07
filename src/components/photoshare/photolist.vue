<template>
  <div class="mb">
    <head-nav title="图文分享"></head-nav>
    <div class="tabItem">
      <a href="javascript:void(0);" v-for="(item, index) in photoNav" @click="getImgs(item.tip)" v-text="item.title" :class="item.tip===change?'active':''" :key="index"></a>
    </div>
    <div class="tabCon">
      <div class="conList" :class="'womanStar'===change ? 'show':''">
        <ul>
          <li v-for="item in womanStar" :key="item._id">
            <router-link :to="{name: 'photo.detail', query: {id: item._id}}">
              <div class="pic">
                <img :src="item.picUrl" v-lazy="item.picUrl" :alt="item.title" width="100%" height="100%">
              </div>
              <div class="con">
                <h2 v-text="item.title"></h2>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="conList" :class="'manStar'===change ? 'show':''">
        <ul>
          <li v-for="item in manStar" :key="item._id">
            <router-link :to="{name: 'photo.detail', query: {id: item._id}}">
              <div class="pic">
                <img :src="item.picUrl" v-lazy="item.picUrl" :alt="item.title" width="100%" height="100%">
              </div>
              <div class="con">
                <h2 v-text="item.title"></h2>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="conList" :class="'scenery'===change ? 'show':''">
        <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="Loading" infinite-scroll-immediate-check="false" infinite-scroll-distance="5">
          <li v-for="item in scenery" :key="item._id">
            <router-link :to="{name: 'photo.detail', query: {id: item._id}}">
              <div class="pic">
                <img :src="item.picUrl" v-lazy="item.picUrl" :alt="item.title" width="100%" height="100%">
              </div>
              <div class="con">
                <h2 v-text="item.title"></h2>
              </div>
            </router-link>
          </li>
        </ul>
        <p v-show="loading" class="page-infinite-loading">
          <mt-spinner type="fading-circle"></mt-spinner>
          加载中...
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast} from "mint-ui";
  let nowdate = new Date();
  export default {
    name: "photolist",
    data(){
      return {
        photoNav: [],
        womanStar: [],
        manStar: [],
        scenery: [],
        change: "womanStar",
        loading: false,
        data: []
      }
    },
    created() {
      // 创建图文分享导航列表
      this.photoNav = [
        {title: "女明星", tip: "womanStar"},
        {title: "男明星", tip: "manStar"},
        {title: "风景图", tip: "scenery"}
      ]
      this.getImgs("womanStar")
    },
    methods: {
      getImgs(tip){
        this.change = tip;
        let page = 1;
        this.axios.get(`photo/list?page=${page}&tip=${tip}`)
        .then(res => {
          //console.log(res)
          this[tip] = res.data.photolist;
          this.data = res.data;
        })
      },
      loadMore(){
        if(new Date() - nowdate < 800) return;
        nowdate = new Date();
        this.loading = true;
        if(!this.data.hasData) return this.loading = false;
        this.axios.get(`photo/list?page=${this.data.nextPage}&tip=scenery`)
        .then(res => {
          this.data = res.data;
          res.data.photolist.forEach(item => {
            this.scenery.push(item);
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
  .tabItem{
    font-size: 30/@rem;
    display: flex;

    a{
      flex: 1;
      color: #26a2ff;
      padding: 30/@rem 0;
    }
    a.active{
      border-bottom: 3px solid #26a2ff;
      color: #f60;
    }

  }
  .tabCon{
    .conList{
      display: none;
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
        align-items: center;
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
    .conList.show{
      display: block;
    }
  }

</style>