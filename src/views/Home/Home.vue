<template>
  <section class="msite border-1px">
      <!--首页头部-->
      <Header :title="address.name">
        <router-link slot="left" class="header_search" to="/search">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
        <router-link slot="right" class="header_login" :to="user._id ? '/user' : '/login'">
          <span class="header_login_text" v-if="user._id">
            <i class="iconfont icon-ai-list"></i>
          </span>
          <span class="header_login_text" v-else>
            登录/注册
          </span>
        </router-link>
      </Header>
      <!--首页导航-->
      <nav class="msite_nav">
        <div class="swiper-container" v-if="foodListArr.length">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(foodList, index) in foodListArr" :key="index">
              <a href="javascript:" class="link_to_food" v-for="(food, index) in foodList" :key="index">
                <div class="food_container">
                  <img :src="baseImageUrl+food.image_url">
                </div>
                <span>{{food.title}}</span>
              </a>
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
        <img src="./images/msite_back.svg" alt="back" v-else>
      </nav>
      <!--首页附近商家-->
      <div class="msite_shop_list">
        <div class="shop_header">
          <i class="iconfont icon-ai-list"></i>
          <span class="shop_header_title">附近商家</span>
        </div>
        <div class="warper">
          <ShopList class="pad"/>
        </div>
      </div>
  </section>
</template>

<script>
import Swiper from 'swiper'
import {mapState, mapGetters} from 'vuex'
import BScroll from 'better-scroll'

import ShopList from '../../components/ShopList/ShopList'
import Header from '../../components/Header/Header'
import 'swiper/dist/css/swiper.min.css'
export default {
  data () {
    return {
      baseImageUrl: 'https://fuss10.elemecdn.com'
    }
  },
  components: {
    Header,
    ShopList
  },
  mounted () {
    this.$store.dispatch('getAddress')
    this.$store.dispatch('getFoodList')
    this.$store.dispatch('getShops', () => {
      this.$nextTick(() => {
        this.scroll = new BScroll('.warper', {
          click: true
        })
      })
    })
  },
  computed: {
    ...mapState(['address', 'foodList', 'user']),
    ...mapGetters(['foodListArr'])
  },
  watch: {
    foodListArr () {
      this.$nextTick(() => {
        this.Swiper = new Swiper('.swiper-container', {
          pagination: {
            el: '.swiper-pagination'
          }
        })
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/stylus/mixins.styl"
  .msite  //首页
    width 100%
    overflow hidden
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 50px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
      .warper
        position absolute
        top 290px
        left 0px
        right 0px
        bottom 50px
        overflow hidden
        background-color #fff
</style>
