<template>
  <div class="high">
    <!--  banner start -->
    <mt-swipe :auto="4000" :class="[banner]">
      <mt-swipe-item v-for="(item, index) in bannerImg" :key="index">
        <router-link :to="{name: 'banner.details', query:{id: item._id}}">
          <img width="100%" height="100%" :src="item.picUrl" :title="item.title" :alt="item.title">
        </router-link>
      </mt-swipe-item>
    </mt-swipe>
    <!--  banner end -->
    <!--  九宫格开始  -->
    <div class="grids clearFix">
      <router-link :to="{name: 'news.list'}">
        <div class="center">
          <svg class="icon">
            <use xlink:href="#icon-xinwen"></use>
          </svg>
          <p>新闻资讯</p>
        </div>
      </router-link>
      <router-link :to="{name: 'photo.list'}">
        <div class="center">
          <svg class="icon">
            <use xlink:href="#icon-fenxiang"></use>
          </svg>
          <p class="weui_grid_label">图文分享</p>
        </div>
      </router-link>
      <router-link :to="{name: 'shop.list'}">
        <div class="center">
          <svg class="icon">
            <use xlink:href="#icon-shangpin_A"></use>
          </svg>
          <p class="weui_grid_label">商品展示</p>
        </div>
      </router-link>
      <router-link :to="{name: 'msgboard'}">
        <div class="center">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-liuyan"></use>
          </svg>
          <p class="weui_grid_label">留言反馈</p>
        </div>
      </router-link>
      <a href="sms:10086" class="weui_grid js_grid">
        <div class="center" >
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-zhengzaidingwei"></use>
          </svg>
          <p class="weui_grid_label">短信联系</p>
        </div>
      </a>
      <a href="tel:10086" class="weui_grid js_grid">
        <div class="center" >
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-dianhua"></use>
          </svg>
          <p class="weui_grid_label">电话联系</p>
        </div>
      </a>
    </div>
    <!--  九宫格结束  -->
  </div>
</template>

<script>
  export default {
    data () {
      return {
        banner: 'banner',
        bannerImg: ''
      }
    },
    created() {
      this.axios.get("banner")
      .then(res => {
        this.bannerImg = res.data;
        //console.log(res);
      })
      .catch(err => err);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @rem:750/10rem;
  .high{
    .banner{
      height: 385/@rem;
      background-color: #eee;
    }

    .icon{
      /* 通过设置 font-size 来改变图标大小 */
      width: 1em;
      height: 1em;
      /* 图标和文字相邻时， 垂直对齐 */
      vertical-align: -0.15em;
      /* 通过设置 color 来改变svg的颜色/fill */
      fill: currentColor;
      /* path 和 stroke 溢出 viewBox 部分在 IE 下会显示 normalize.css 中也包含这行*/
      overflow: hidden;
      font-size: 42px;
      line-height: 100px;
      margin: 10px 0;
      color: #18b4ed;
    }
    .grids{
      background-color: white;
      position: relative;

      a{
        position: relative;
        float: left;
        padding: 20px 10px;
        width: 33.33333333%;
        height: 50%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      a::before{
        content: "";
        position: absolute;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 200%;
        height: 200%;
        left: 0;
        top: 0;
        border-bottom: 1px solid #d9d9d9;
        border-right: 1px solid #d9d9d9;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scale(.5);
        transform: scale(.5);
      }
      a:nth-child(3n):before{
        border-right-width: 0;
      }
      a p{
        display: block;
        text-align: center;
        color: #000;
        font-size: 28/@rem;
      }
      .center {
        margin: auto;
      }
    }
  }

</style>
