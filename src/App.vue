<template>
  <div id="app">
    <header v-if="visible"></header>
    <header class="hd fixed" v-if="visible" v-text="title"></header>
    <router-view/>
    <!--  footNav start  -->
    <footer class="ft">
      <router-link class="link" :to="{name: 'index'}">
        <svg class="icon svg" aria-hidden="true">
          <use xlink:href="#icon-home"></use>
        </svg>
        <p>首页</p>
      </router-link>
      <router-link class="link" :to="{name: 'map'}">
        <svg class="icon svg" aria-hidden="true">
          <use xlink:href="#icon-ditu"></use>
        </svg>
        <p>潭州</p>
      </router-link>
      <router-link class="link" :to="{name: 'weather'}">
        <svg class="icon svg" aria-hidden="true">
          <use xlink:href="#icon-tianqi_select"></use>
        </svg>
        <p>天气</p>
      </router-link>
      <router-link class="link count" :to="{name: 'shopcart'}">
        <svg class="icon svg" aria-hidden="true">
          <use xlink:href="#icon-iconset0308"></use>
        </svg>
        <i class="showNum" v-if="pickNum">{{pickNum}}</i>
        <p>购物</p>
      </router-link>
      <router-link class="link" :to="{name: 'my'}">
        <svg class="icon svg" aria-hidden="true">
          <use xlink:href="#icon-wode3-copy"></use>
        </svg>
        <p>我的课程</p>
      </router-link>
    </footer>
    <!--  footNav end  -->
  </div>
</template>

<script>
  import connect from "./util/connect";
  import shoputil from "./util/shoputil";
  export default {
    data(){
      return {
        title: '',
        pickNum: shoputil.getShopCount()
      }
    },
    computed: {
      num(){
        return this.$store.state.num
      },
      visible(){
        return ['/', '/index.html', '/map'].indexOf(this.$route.path) > 0;
      }
    },
    created() {
      // 移动端适配开始
      function remChange(){
        let html = document.getElementsByTagName("html")[0];
        let width = html.getBoundingClientRect().width;
        if( width >= 750 ){
          width = 750;
        }
        html.style.fontSize = width/10 + "px";
      }
      remChange();
      window.addEventListener("resize", remChange);
      // 移动端适配结束
      this.axios.get('title')
      .then(res => {
        this.title = res.data.title;
      }).catch(err => err);

      connect.$on("addCart", res => {
        this.pickNum += res;
      })
    }
  }
</script>

<style scoped lang="less">
  @rem: 750/10rem;

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    max-width: 750px;
    height: 100%;
    margin: auto;
    position: relative;

    header {
      height: 80/@rem;
      line-height: 80/@rem;
      font-size: 30/@rem;
      background-color: #26a2ff;
      color: white;
    }
    header.fixed{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      margin: auto;
      width: 100%;
      z-index: 999;
    }
  }

  .ft{
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9;
    height: 130/@rem;
    background-image: -webkit-gradient(linear, left top, left bottom, from(#d9d9d9), color-stop(50%, #d9d9d9), color-stop(50%));
    background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-size: 100% 1px;
    background-repeat: no-repeat;
    background-position: top left;
    background-color: #fafafa;
    display: flex;
    text-align: center;

    a{
      color: #18b4ed;
      text-decoration: none;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
    }

    .link{
      display: block;
      /*padding: 7px 0;*/
      flex: 1;
      text-decoration: none;
    }

    .link .svg{
      margin: 15/@rem auto 5/@rem;
      font-size: 60/@rem;
    }

    .link p{
      color: inherit;
      font-size: 24/@rem;
      line-height: 1;
    }

    .icon{
      width: 1em;
      height: 1em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }

    .count{
      position: relative;
    }

    .count .showNum{
      position: absolute;
      top: 10/@rem;
      margin: auto;
      width: 40/@rem;
      height: 40/@rem;
      line-height: 40/@rem;
      background-color: red;
      color: #fff;
      font-size: 24/@rem;
      border-radius: 50%;
      font-style: normal;
    }

    .fade-enter-active, .fade-leave-active{
      transition: opacity 0.2s;
    }

    .fade-enter, .fade-leave-to, .fade-leave-active below version {
      opacity: 0;
    }
  }
</style>
