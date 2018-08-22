<template>
  <div>
    <ShopHeader/>
    <div class="tab border-1px">
      <router-link to="/shop/foods" class="on" replace>点餐</router-link>
      <router-link to="/shop/comments" replace>评论</router-link>
      <router-link to="/shop/info" replace>关于</router-link>
    </div>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import ShopHeader from '../../components/ShopHeader/ShopHeader'
export default {
  components: {
    ShopHeader
  },
  mounted () {
    this.$store.dispatch('getShopInfo')
    this.$store.dispatch('getShopComments')
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    display flex
    flex-flow row
    background-color #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    a
      display block
      flex 1
      text-align center
      position: relative
      color: rgba(7, 17, 27, 0.5)
      &.router-link-active
        color #02a774
        &:after
          content ""
          position absolute
          height 2px
          width 40%
          background-color #02a774
          bottom 1px
          right 50%
          transform translateX(50%)
</style>
