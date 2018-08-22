<template>
    <div class="app border-1px">
        <router-view />
        <Footer v-show="$route.meta.show"/>
    </div>
</template>

<script>
import Footer from './components/Footer/Footer'
export default {
  components: {
    Footer
  },
  mounted () {
    this.$store.dispatch('getUser')
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "assets/stylus/mixins.styl"
  .app
    width 100%
    height 100%
    background #f5f5f5
    position relative
</style>
