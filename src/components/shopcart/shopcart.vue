<template>
  <div>
    <head-nav title="购物车"></head-nav>

    <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore">
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
        <span v-show="topStatus !== 'loading'" v-text="topStatus === 'drop' ? '释放更新' : '下拉刷新'"></span>
        <span v-show="topStatus === 'loading'">
            <mt-spinner type="fading-circle"></mt-spinner>
            <span>加载中...</span>
          </span>
      </div>
      <div class="shopArea mb">
        <div class="shop " v-for="(item,index) in shopList" :key="index">
          <div class="shopShow">
            <div class="pic ">
              <img :src="item.imgUrl" width="100%" height="100%" alt="">
            </div>
            <div class="des ">{{ item.des }}</div>
          </div>

          <div class="buyNum ">
            <p class=" buyfont">{{ item.symbol }}{{ item.price }}</p>
            <p class="addNum ">
              <a href="javascript:void(0);" class="reduce" @click="shopReduce(index)">-</a>
              <a href="javascript:void(0);" class="num">{{ item.num }}</a>
              <a href="javascript:void(0);" class="add" @click="shopAdd(index)">+</a>
            </p>
            <a href="javascript:void(0);" class="del" @click="del(index)">删除</a>
          </div>
        </div>
        <div class="totalPrice">
          <!--一共 {{totalPrice.num}} 件, 共计 {{totalPrice.sum}} 元-->
          <!--<div class="all">
              <i></i>
              <span>全选</span>
          </div>-->
          <div class="total">
            <p class="totalMoney">
              <span class="font">总计:</span>
              <span>￥{{totalPrice.sum}}</span>
            </p>
            <p class="preferential">总金额￥{{totalPrice.sum}} 优惠￥0.00</p>
          </div>
          <div class="goPayment">
            <span class="font">去结算</span>
            <span class="num">({{totalPrice.num}}件)</span>
          </div>
        </div>
      </div>
    </mt-loadmore>


  </div>
</template>

<script>
import connect from "../../util/connect";
import shoputil from "../../util/shoputil";

export default {
  data() {
    return {
      shopList: [],
      topStatus: ''
    }
  },
  created() {
    // 获取购物车的商品
    let goods = shoputil.getShop();
    // 取出购物车商品对应的商品id
    let idArr = Object.keys(goods);
    //console.log(idArr);
    // 通过购物车中存储的商品id请求商品数据信息
    idArr.forEach((item, index) => {
      this.axios.get(`shop/detail/${item}`)
      .then(res => {
        //console.log(res);
        this.shopList.push(res.data);
        // 显示购物车中每个商品的数量
        this.shopList.forEach((item, index) => {
          //console.log(item)
          if(goods[item._id]){
            // 不能通过item.num = goods[item._id]来设置
            this.$set(item, "num", goods[item._id]);
          }
        })
      })
      .catch(err => err);
    })

  },
  computed: {
    totalPrice() {   // 总价格
      let sum = 0, num = 0;
      this.shopList.forEach(item => {
        sum += item.num * item.price;
        num += item.num;
      })
      return {
        sum: sum,
        num: num
      }
    }
  },
  methods: {
    shopReduce(i) {   //  商品数量减少
      // 减到剩下1件商品就不允许再减了
      if(this.shopList[i].num <= 1) return;
      this.shopList[i].num --;
      // 通知父组件更改购物车商品数量
      connect.$emit("addCart", -1);
      // 把更改后的商品数量保存到本地存储
      shoputil.addUpdate({
        id: this.shopList[i]._id,
        num: -1
      });
    },
    shopAdd(i) {     //   商品数量增加
      // 防止黄牛不允许无上限的往上加
      if(this.shopList[i].num >= 99) return;
      this.shopList[i].num ++;
      // 通知父组件更改购物车商品数量
      connect.$emit("addCart", 1);
      // 把更改后的商品数量保存到本地存储
      shoputil.addUpdate({
        id: this.shopList[i]._id,
        num: 1
      });
    },
    del(i) {
      const goods = this.shopList[i];
      // 删除对应本地存储的商品
      shoputil.delete(goods._id);
      // 通知父组件更改购物车商品数量
      connect.$emit("addCart", -goods.num);
      // 删除对应的对象
      this.shopList.splice(i, 1);
    },
    handleTopChange(status){
      //console.log(status)
      this.topStatus = status;
    },
    loadTop(){
      // setTimeout(() => {
      //
      //   this.$refs.loadmore.onTopLoaded();
      // }, 3000)

      // 获取购物车的商品
      let goods = shoputil.getShop();
      // 取出购物车商品对应的商品id
      let idArr = Object.keys(goods);
      //console.log(idArr);
      this.shopList = [];
      // 通过购物车中存储的商品id请求商品数据信息
      idArr.forEach((item, index) => {
        this.axios.get(`shop/detail/${item}`)
            .then(res => {
              //console.log(res);
              this.shopList.push(res.data);
              // 显示购物车中每个商品的数量
              this.shopList.forEach((item, index) => {
                //console.log(item)
                if(goods[item._id]){
                  // 不能通过item.num = goods[item._id]来设置
                  this.$set(item, "num", goods[item._id]);
                }
              })
              this.$refs.loadmore.onTopLoaded();
            })
            .catch(err => err);
      })
    }
  }
}
</script>

<style scoped lang="less">
@rem: 750/10rem;
.mb {
  margin-bottom: 130/@rem;
}

.shopArea {
  text-align: justify;
  background: #fff;

  .location {
    font-size: 32/@rem;
    color: #ccc;
    padding: 10/@rem;
    padding: 20/@rem 55/@rem;
  }

  .shop {
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
    padding: 0 55/@rem;

    .shopShow {
      display: flex;
      justify-content: space-between;
      align-items: center;
      overflow: hidden;
      padding: 25/@rem 0;

      .pic {
        width: 200/@rem;
        height: 200/@rem;
      }

      .des {
        width: 400/@rem;
        font-size: 35/@rem;
      }
    }

    .buyNum {
      border-top: 1px solid #ddd;
      border-left: none;
      border-right: none;
      padding: 20/@rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .buyfont {
        font-size: 40/@rem;
      }

      .addNum {
        font-size: 40/@rem;

        a {
          width: 60/@rem;
          height: 60/@rem;
          line-height: 60/@rem;
          background: #f1f1f1;
          display: inline-block;
          color: #878787;
          text-align: center;
        }

        a:active {
          background: #ddd;
        }
      }

      .del {
        color: skyblue;
        font-size: 40/@rem;
      }
    }
  }

  .totalPrice {
    height: 100/@rem;
    text-align: center;
    display: flex;
    justify-content: space-between;
    margin-top: 20/@rem;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0 -1px 2px #d7d7d7;
    /*align-items: center;*/

    .all {

      color: #999;
      font-size: 20/@rem;

      i {
        width: 40/@rem;
        height: 40/@rem;
        border-radius: 50%;
        background: #e93b3d;
      }

      i::after {
        content: '';
      }
    }

    .total {
      text-align: left;
      text-indent: 1em;

      p {
        height: 50%;
        font-size: 32/@rem;
        line-height: 50/@rem;
        color: #999;
      }

      .totalMoney {
        color: #e4393c;
        font-weight: bold;

        .font {
          color: #333;
        }
      }

      .preferential {
        font-size: 18/@rem;
      }
    }

    .goPayment {
      width: 220/@rem;
      background: #e4393c;
      color: #fff;

      span {
        vertical-align: middle;
      }

      .font {
        font-size: 32/@rem;
      }

      .num {
        font-size: 23/@rem;
      }

    }
  }
}
.mint-loadmore-top span {
  display: inline-block;
  -webkit-transition: .2s linear;
  transition: .2s linear;
  vertical-align: middle;
  font-size: 24/@rem;
  color: #999;
}
.mint-loadmore-top span.is-rotate {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}
</style>
