<template>
  <div class="mb">
    <head-nav title="商品详情"></head-nav>
    <div v-if="goods">
      <div class="pic">
        <img width="100%" :src="goods.imgUrl" :alt="goods.des">
      </div>
      <div class="shopdedatils">
        <h3 v-text="goods.des"></h3>
        <p class="money">
          <span class="symbol" v-text="goods.symbol"></span>
          <span class="price" v-text="goods.price"></span>
        </p>
        <p class="courier">快递：包邮
          <span class="fr" v-text="goods.alreadyPaid"></span>
        </p>
        <div class="buyNum clearFix">
          <p class="fl buyfont">购买数量</p>
          <p class="addNum fr">
            <a href="javascript:void(0);" class="reduce" @click="shopReduce">-</a>
            <a href="javascript:void(0);" class="num">{{num}}</a>
            <a href="javascript:void(0);" class="add" @click="shopAdd">+</a>
          </p>
        </div>
        <div class="buy">
          <a href="javascript:void(0);" class="addCart" @click="addCart">加入购物车</a>
<!--          <router-link :to="{name:'shopcart'}" class="nowBuy" @click.native="nowBuy">立即购买</router-link>-->
          <a href="javascript:void(0);" class="nowBuy" @click="nowBuy">立即购买</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import connect from '../../util/connect';
  import shoputil from "../../util/shoputil";
  export default {
    name: "shopdetails",
    data(){
      return {
        goods: {},
        num: 0
      }
    },
    created() {
      // 商品id
      const id = this.$route.query.id;
      this.axios.get(`shop/detail/${id}`)
      .then(res => {
        this.goods = res.data;
      })
      .catch(err => err);
    },
    methods: {
      shopReduce(){ // 商品数量减少
        if(this.num <= 0) return;
        this.num --;
      },
      shopAdd(){ // 商品数量增加
        if(this.num >= 99) return;
        this.num ++;
      },
      addCart(){ // 添加到购物车
        connect.$emit("addCart", this.num);
        shoputil.addUpdate({
          id: this.goods._id,
          num: this.num
        })
      },
      nowBuy(){ // 立即购买
        this.num = this.num || 1;
        connect.$emit("addCart", this.num);
        shoputil.addUpdate({
          id: this.goods._id,
          num: this.num
        });
        this.$router.push({name: 'shopcart'});
      }
    }
  }
</script>

<style scoped lang="less">
  @rem: 750/10rem;
  .mb{
    margin-bottom: 130/@rem;
  }
  .pic{
    width: 750/@rem;
    img{
      display: block;
      margin: auto;
    }
  }
  .shopdedatils{
    padding: 22/@rem;
    position: relative;
    text-align: justify;
    background: white;

    h3{
      font-size: 33/@rem;
    }
    .money{
      font-size: 0;
      color: red;
      .symbol{
        font-size: 22/@rem;
      }
      .price{
        font-size: 32/@rem;
      }
    }
    .courier{
      font-size: 25/@rem;
      color: #999;
    }
    .buyNum{
      border: 1px solid #e7e7e7;
      border-left: none;
      border-right: none;

      padding: 20/@rem;
      .buyfont{
        font-size: 40/@rem;
      }
      .addNum{
        font-size: 40/@rem;
        a{
          width: 60/@rem;
          height: 60/@rem;
          line-height: 60/@rem;
          background: #f1f1f1;
          display: inline-block;
          color: #878787;
          text-align: center;
        }
        a:active{
          background: #ddd;
        }
      }
    }
    .buy{
      display: flex;
      height: 96/@rem;
      text-align: center;
      line-height: 96/@rem;
      a{
        flex: 1;
        color: white;
        font-size: 31/@rem;
      }
      .addCart{
        background: #ff9402;
      }
      .nowBuy{
        background: #ff5000;
      }
    }
  }
</style>