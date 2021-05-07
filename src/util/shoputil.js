const shop = JSON.parse(window.localStorage.getItem("shopInfo") || "{}");
const shoputil = {
  // 增加购物车商品
  addUpdate(goods){
    // 判断商品是否已存在
    if(shop[goods.id]){
      shop[goods.id] += goods.num;
    }else{
      shop[goods.id] = goods.num;
    }
    // 把更新后的数据保存到本地存储
    this.saveShops(shop);
  },
  // 删除购物车商品
  delete(id){
    delete shop[id];
    this.saveShops(shop);
  },
  // 修改购物车商品

  // 查找/获取购物车商品
  getShop(){
    return JSON.parse(window.localStorage.getItem("shopInfo") || "{}");
  },
  // 获取购物车商品总数
  getShopCount(){
    let sum = 0;
    for(let id in shop){
      sum += shop[id];
    }
    return sum;
  },
  // 存储添加进购物车的商品到H5本地存储
  saveShops(){
    window.localStorage.setItem("shopInfo", JSON.stringify(shop));
  }
}

export default shoputil