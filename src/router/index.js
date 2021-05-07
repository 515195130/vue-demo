import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import HeadNav from '../components/common/headNav'
import NewsList from '../components/news/newslist'
import NewsDetails from '../components/news/newsdetails'
import PhotoList from '../components/photoshare/photolist'
import Photo from '../components/photoshare/photo'
import ShopList from '../components/shop/shoplist'
import ShooDetails from '../components/shop/shopdetails'
import Map from '../components/map/amap'
import WeaTher from '../components/weather/weather'
import Weather from '../components/common/weather'
import ShopCart from '../components/shopcart/shopcart'
import My from '../components/my/my'
import BannerDetails from '../components/banner/bannerdetails'
import MsgBoard from '../components/msgboard/msgboard'

// 注册全局组件
Vue.component('headNav', HeadNav)
Vue.component('dateWeather', Weather)

// 数据请求
import Axios from 'axios'
Axios.defaults.baseURL = 'http://vue.xiaoyugd.site:6220'
Vue.prototype.axios = Axios

import $ from 'jquery'
Vue.prototype.$jq = $

import vue2Preview from 'vue2-preview'
Vue.use(vue2Preview)


Vue.use(Router)

export default new Router({
  linkActiveClass: 'rlActive',
  routes: [
    {
      path: '/',
      redirect: {name: 'index'}
    },
    {
      path: '/index.html',
      // 或者直接给个空格也可以
      // 例如： path: '/ ',
      name: 'index',
      component: Index
    },
    {
      path: '/news/list',
      name: 'news.list',
      component: NewsList
    },
    {
      path: '/news/details',
      name: 'news.details',
      component: NewsDetails
    },
    {
      path: '/photo/list',
      name: 'photo.list',
      component: PhotoList
    },
    {
      path: '/photo/detail',
      name: 'photo.detail',
      component: Photo
    },
    {
      path: '/shop/list',
      name: 'shop.list',
      component: ShopList
    },
    {
      path: '/shop/detail',
      name: 'shop.detail',
      component: ShooDetails
    },
    {
      path: '/map',
      name: 'map',
      component: Map
    },
    {
      path: '/weather',
      name: 'weather',
      component: WeaTher
    },
    {
      path: '/shopcart',
      name: 'shopcart',
      component: ShopCart
    },
    {
      path: '/my',
      name: 'my',
      component: My
    },
    {
      path: '/banner/details',
      name: 'banner.details',
      component: BannerDetails
    },
    {
      path: '/msgboard',
      name: 'msgboard',
      component: MsgBoard
    }
  ]
})
