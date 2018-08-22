<template>
    <section class="search">
      <Header title="搜索"/>
      <form class="search_form" @submit.prevent="search">
        <input type="search" placeholder="请输入商家名称" class="search_input" v-model="searchName">
        <input type="submit" class="search_submit">
      </form>
      <section class="list">
        <ul class="list_container">
          <li class="list_li" v-for="(shop, index) in keywordShops" :key="index" @click="pathTo(shop.id)">
            <section class="item_left">
              <img :src="imgBaseUrl+shop.image_path"
                   class="restaurant_img">
            </section>
            <section class="item_right">
              <div class="item_right_text">
                <p>
                  <span>{{shop.name}}</span>
                </p>
                <p>月售 {{shop.recent_order_num}} 单</p>
                <p>{{shop.float_minimum_order_amount}} 元起送 / 距离 {{shop.distance}} 公里</p>
              </div>
            </section>
          </li>
        </ul>
        <p v-if="showMessage">搜索不到相关内容</p>
      </section>
    </section>
</template>

<script>
import Header from '../../components/Header/Header'
import BSroll from 'better-scroll'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      searchName: '',
      imgBaseUrl: 'http://cangdu.org:8001/img/',
      showMessage: false
    }
  },
  computed: {
    ...mapState(['keywordShops'])
  },
  methods: {
    search () {
      this.showMessage = false
      const searchName = this.searchName.trim()
      if (/^[_a-zA-Z0-9]+$/.test(searchName)) {
        this.$store.dispatch('searchShops', searchName)
      }
    },
    pathTo (id) {
      this.$router.push({path: '/shop', query: {id}})
    }
  },
  watch: {
    keywordShops: function (value) {
      this.$nextTick(() => {
        this.shopScroll = new BSroll('.list', {
          click: true
        })
        if (!value.length) {
          this.showMessage = true
        }
      })
    }
  },
  components: {
    Header
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../assets/stylus/mixins.styl"
  .search
    width 100%
    height 100%
    overflow hidden
    position relative
    .search_form
      clearFix()
      margin-top 45px
      background-color #fff
      padding 12px 8px
      input
        height 35px
        padding 0 4px
        border-radius 2px
        font-weight bold
        outline none
        &.search_input
          float left
          width 79%
          border 4px solid #f2f2f2
          font-size 14px
          color #333
          background-color #f2f2f2
        &.search_submit
          float right
          width 18%
          border 4px solid #02a774
          font-size 16px
          color #fff
          background-color #02a774

    .list
      position absolute
      width 100%
      left 0
      top 100px
      bottom 50px
      overflow hidden
      .list_container
        background-color: #fff;
        .list_li
          display flex
          justify-content center
          padding: 10px
          border-bottom: 1px solid $bc;
          .item_left
            margin-right: 10px
            .restaurant_img
              width 50px
              height 50px
              display block
          .item_right
            font-size 12px
            flex 1
            .item_right_text
              p
                line-height 12px
                margin-bottom 6px
                &:last-child
                  margin-bottom 0
    .search_none
      margin: 0 auto
      color: #333
      background-color: #fff
      text-align: center
      margin-top: 0.125rem
</style>
