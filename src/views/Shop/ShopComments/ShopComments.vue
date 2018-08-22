 <template>
    <div class="ratings" ref="ratings">
      <div class="ratings-content">
        <div class="overview">
          <div class="overview-left">
            <h1 class="score">{{info.score}}</h1>
            <div class="title">综合评分</div>
            <div class="rank">高于周边商家 {{info.rankRate}}%</div>
          </div>
          <div class="overview-right">
            <div class="score-wrapper">
              <span class="title">服务态度</span>
              <Star :score="info.serviceScore" :size="36" />
              <span class="score">{{info.serviceScore}}</span>
            </div>
            <div class="score-wrapper">
              <span class="title">商品评分</span>
              <Star :score="info.foodScore" :size="36" />
              <span class="score">{{info.foodScore}}</span>
            </div>
            <div class="delivery-wrapper">
              <span class="title">送达时间</span>
              <span class="delivery">{{info.deliveryTime}} 分钟</span>
            </div>
          </div>
        </div>
        <div class="split"></div>
        <div class="ratingselect">
          <div class="rating-type border-1px">
            <span class="block positive" :class="{active: isPositive === 2}" @click="isPositive = 2">
              全部<span class="count">{{comments.length}}</span>
            </span>
            <span class="block positive" :class="{active: isPositive === 0}" @click="isPositive = 0">
              满意<span class="count">{{positive}}</span>
            </span>
            <span class="block negative" :class="{active: isPositive === 1}" @click="isPositive = 1">
              不满意<span class="count">{{comments.length - positive}}</span>
            </span>
          </div>
          <div class="switch" :class="{on: isOn}" @click="toggleOn">
            <span class="iconfont icon-dagou"></span>
            <span class="text">只看有内容的评价</span>
          </div>
        </div>
        <div class="rating-wrapper">
          <ul>
            <li class="rating-item" v-for="(comment, index) in commentsFilter" :key="index">
              <div class="avatar">
                <img width="28" height="28"
                     :src="comment.avatar">
              </div>
              <div class="content">
                <h1 class="name">{{comment.username}}</h1>
                <div class="star-wrapper">
                  <Star :score="comment.score" :size="24" />
                  <span class="delivery">{{comment.deliveryTime}}</span>
                </div>
                <p class="text">{{comment.text}}</p>
                <div class="recommend">
                  <span class="iconfont" :class="{'icon-zan1': comment.rateType === 0, 'icon-zan': comment.rateType === 1}" ></span>
                  <span class="item" v-for="(Item, index) in comment.recommend" :key="index">
                    {{Item}}
                  </span>
                </div>
                <div class="time">{{comment.rateTime|Time}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
import Star from '../../../components/Star/Star'
import {mapState, mapGetters} from 'vuex'
import BSroll from 'better-scroll'
export default {
  data () {
    return {
      isOn: false,
      // 2表示全部，1表示不满意，0表示满意
      isPositive: 2
    }
  },
  computed: {
    ...mapState(['info', 'comments']),
    ...mapGetters(['positive']),
    commentsFilter () {
      const {comments} = this
      return comments.filter((comment, index) => {
        if (this.isOn) {
          if (this.isPositive === 2) {
            return comment.text
          } else {
            return comment.text && comment.rateType === this.isPositive
          }
        } else {
          if (this.isPositive === 2) {
            return !comment.text
          } else {
            return !comment.text && comment.rateType === this.isPositive
          }
        }
      })
    }
  },
  methods: {
    toggleOn () {
      this.isOn = !this.isOn
    }
  },
  components: {
    Star
  },
  mounted () {
    console.log('BS')
    if (!this.ratingScroll) {
      this.ratingScroll = new BSroll('.rating-wrapper', {
        click: true
      })
    }
  },
  watch: {
    commentsFilter: function () {
      this.$nextTick(() => {
        console.log('BSC')
        this.ratingScroll.refresh()
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../../assets/stylus/mixins.styl"
    .ratings
      position: absolute
      top: 195px
      bottom: 0
      left: 0
      width: 100%
      overflow: hidden
      background: #fff
      .overview
        display: flex
        padding: 18px 0
        .overview-left
          flex: 0 0 137px
          padding: 6px 0
          width: 137px
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          text-align: center
          @media only screen and (max-width: 320px)
            flex: 0 0 120px
            width: 120px
          .score
            margin-bottom: 6px
            line-height: 28px
            font-size: 24px
            color: rgb(255, 153, 0)
          .title
            margin-bottom: 8px
            line-height: 12px
            font-size: 12px
            color: rgb(7, 17, 27)
          .rank
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
        .overview-right
          flex: 1
          padding: 6px 0 6px 24px
          @media only screen and (max-width: 320px)
            padding-left: 6px
          .score-wrapper
            margin-bottom: 8px
            font-size: 0
            .title
              display: inline-block
              line-height: 18px
              vertical-align: top
              font-size: 12px
              color: rgb(7, 17, 27)
            .star
              display: inline-block
              margin: 0 12px
              vertical-align: top
            .score
              display: inline-block
              line-height: 18px
              vertical-align: top
              font-size: 12px
              color: rgb(255, 153, 0)
          .delivery-wrapper
            font-size: 0
            .title
              line-height: 18px
              font-size: 12px
              color: rgb(7, 17, 27)
            .delivery
              margin-left: 12px
              font-size: 12px
              color: rgb(147, 153, 159)
      .split
        width: 100%
        height: 16px
        border-top: 1px solid rgba(7, 17, 27, 0.1)
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        background: #f3f5f7
      .ratingselect
        .rating-type
          padding: 18px 0
          margin: 0 18px
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 0
          .block
            display: inline-block
            padding: 8px 12px
            margin-right: 8px
            line-height: 16px
            border-radius: 1px
            font-size: 12px
            color: rgb(77, 85, 93)
            background: rgba(77, 85, 93, 0.2)
            &.active
              background: $green
              color: #fff
            .count
              margin-left: 2px
              font-size: 8px
        .switch
          padding: 12px 18px
          line-height: 24px
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
          color: rgb(147, 153, 159)
          font-size: 0
          &.on
            .icon-dagou
              color: $green
          .icon-dagou
            display: inline-block
            vertical-align: top
            margin-right: 4px
            font-size: 24px
          .text
            display: inline-block
            font-size: 15px
      .rating-wrapper
        padding: 0 18px
        width 100%
        box-sizing border-box
        position: absolute
        top: 257px
        bottom: 0
        left: 0
        overflow: hidden
        background: #fff
        .rating-item
          padding: 18px 0
          display flex
          flex-direction row
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .avatar
            width: 28px
            margin-right: 12px
            img
              border-radius: 50%
          .content
            width 100%
            box-sizing border-box
            position: relative
            .name
              margin-bottom: 4px
              line-height: 12px
              font-size: 10px
              color: rgb(7, 17, 27)
            .star-wrapper
              margin-bottom: 6px
              font-size: 0
              .star
                display: inline-block
                margin-right: 6px
                vertical-align: top
              .delivery
                display: inline-block
                vertical-align: top
                line-height: 12px
                font-size: 10px
                color: rgb(147, 153, 159)
            .text
              text-align left
              margin-top 5px
              margin-bottom: 8px
              line-height: 18px
              color: rgb(7, 17, 27)
              font-size: 15px
            .recommend
              font-size: 0
              text-align left
              margin-top 5px
              icon-zan1, .icon-zan, .item
                display: inline-block
                margin: 0 8px 4px 0
              icon-zan1
                color: $yellow
              .icon-zan
                color: rgb(147, 153, 159)
              .item
                width 15px
                height 15px
                padding: 0 6px
                border: 1px solid rgba(7, 17, 27, 0.1)
                border-radius: 1px
                color: rgb(147, 153, 159)
                background: #fff
            .time
              position: absolute
              top: 0
              right: 0
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
</style>
