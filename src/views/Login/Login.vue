<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
      </div>
      <div class="login_content">
        <form>
          <div >
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-if="hidePwd">
                <input type="text" maxlength="8" placeholder="密码" v-model="pwd" v-else>
                <div class="switch_button" :class="hidePwd ? 'off' : 'on'" @click="hidePwd = !hidePwd">
                  <div class="switch_circle" :class="{right: !hidePwd}"></div>
                  <span class="switch_text">
                    {{hidePwd ? '...' : 'abc'}}
                  </span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="./images/captcha.svg" alt="captcha" @click="getCaptcha" ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a  class="go_back" @click.prevent="$router.back()">
        <i class="iconfont icon-fanhui"></i>
      </a>
    </div>
    <AlertTip :alertText="alertText" @closeTip="closeTip" v-show="alertText"/>
  </section>
</template>

<script>
import AlertTip from '../../components/AlertTip/AlertTip'
import {reqLogin} from '../../api'
export default {
  data () {
    return {
      // loginway分为二种 1：是短信登录 2：是密码登录
      name: '',
      pwd: '',
      captcha: '',
      hidePwd: true,
      alertText: ''
    }
  },
  methods: {
    closeTip () {
      this.alertText = ''
    },
    async login () {
      if (!this.name) {
        // 请输入用户名
        this.alertText = '输入用户名'
        return
      } else if (!this.pwd) {
        // 请输入密码
        this.alertText = '请输入密码'
        return
      } else if (!this.captcha) {
        // 请输入验证码
        this.alertText = '请输入验证码'
        return
      }
      // 发送ajax请求登录
      let result = await reqLogin(this.name, this.pwd, this.captcha)
      if (result.code === 0) {
        const user = result.data
        this.$store.dispatch('codeUser', user)
        this.$router.replace('/personal')
      } else if (result.code === 1) {
        this.alertText = result.msg
        this.getCaptcha()
      }
    },
    getCaptcha () {
      this.$refs.captcha.src = 'http://localhost:4002/captcha?time=' + Date.now()
    }
  },
  components: {
    AlertTip
  },
  mounted () {
    this.getCaptcha()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
      .login_content
        margin-top 60px
        >form
          >div
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                font-size 14px
                background transparent
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 50px
        height 50px
        >.iconfont
          font-size 40px
          color #999
</style>
