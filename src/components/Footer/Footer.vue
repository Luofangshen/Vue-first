<template>
   <div class="footer border-1px">
     <div :class="{on: '/home' === $route.path}" @click="goTo('/home')">
       <i class="iconfont icon-waimai"></i>
       <span>外卖</span>
     </div>
     <div :class="{on: '/search' === $route.path}" @click="goTo('/search')">
       <i class="iconfont icon-sousuo"></i>
       <span>搜索</span>
     </div>
     <div :class="{on: '/order' === $route.path}" @click="goTo('/order')">
       <i class="iconfont icon-dingdan"></i>
       <span>订单</span>
     </div>
     <div :class="{on: '/personal' === $route.path}"  @click="goTo('/personal')">
       <i class="iconfont icon-accountfilling"></i>
       <span>我的</span>
     </div>
   </div>
</template>

<script>
export default {
  methods: {
    goTo (path) {
      this.$router.replace(path)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/stylus/mixins.styl"
  .footer
    top-border-1px(#e4e4e4)
    position fixed
    width 100%
    height 50px
    bottom 0
    display flex
    flex-flow row
    background-color #fff
    & > div
      text-align center
      flex 1
      display flex
      justify-content center
      flex-flow column
      margin 5px
      color #999
      i
        font-size 22px
        font-color #999
      span
        margin-top 2px
        font-size 12px
    & > .on
      color: green
</style>
