<template>
  <div class="control">
    <transition name="move">
      <span class="iconfont icon-jianhao" v-if="Item.count" @click.stop="updateCount(false)"></span>
    </transition>
    <span class="font" v-if="Item.count">{{Item.count}}</span>
    <span class="iconfont icon-jiahao2" @click.stop="updateCount(true)"></span>
  </div>
</template>

<script>
export default {
  props: {
    Item: Object
  },
  methods: {
    updateCount (isAdd) {
      this.$store.dispatch('updateCount', {isAdd, Item: this.Item})
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .control
    span
      text-align center
      width 20px
      height 20px
      font-size 20px
      display inline-block
      margin-right 4px
      color: forestgreen
      &.font
        color: #000
      &.move-enter-acetive, &.move-leave-active
        transition .8s
      &.move-enter, &.move-leave-to
        transform translateX(40px)
        opacity 0

</style>
