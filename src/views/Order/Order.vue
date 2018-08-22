<template>
    <div class="order border-1px">
      <Header title="订单" />
      <div class="main">
        <img src="./person.png" alt="外卖" >
        <h2>登陆后查看外卖订单</h2>
        <mt-button type="primary">立即登录</mt-button>
      </div>
    </div>
</template>

<script>
import Header from '../../components/Header/Header'
export default {
  components: {
    Header
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .order
    .main
      text-align center
      img
        padding-top 100px
        width 60%
      .mint-button--primary
        background-color green
      h2
        padding 10px 0 10px 0
        color: #6a6a6a
</style>
