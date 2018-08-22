/*
直接修改状态数据的n个函数
 */
import Vue from 'vue'
import {RECEVIE_ADDRESS, RECEVIE_FOODLIST, RECEVIE_SHOPS, RECEVIE_USER, RESET_USER, RECEVIE_SHOPCOMMENTS, RECEVIE_SHOPFOODS, RECEVIE_SHOPINFO, DECREMENT_FOOD_COUNT, INCREMENT_FOOD_COUNT, CLEAR_CAR, RECEVIE_KEYWORD_SHOPS} from './mutation-types'
export default {
  [RECEVIE_ADDRESS] (state, {address}) {
    state.address = address
  },
  [RECEVIE_FOODLIST] (state, {foodList}) {
    state.foodList = foodList
  },
  [RECEVIE_SHOPS] (state, {shops}) {
    state.shops = shops
  },
  [RECEVIE_USER] (state, {user}) {
    state.user = user
  },
  [RESET_USER] (state) {
    state.user = {}
  },
  [RECEVIE_SHOPCOMMENTS] (state, {comments}) {
    state.comments = comments
  },
  [RECEVIE_SHOPFOODS] (state, {foods}) {
    state.foods = foods
  },
  [RECEVIE_SHOPINFO] (state, {info}) {
    state.info = info
  },
  [INCREMENT_FOOD_COUNT] (state, {Item}) {
    if (!Item.count) {
      Vue.set(Item, 'count', 1)
      state.cartFoods.push(Item)
    } else {
      Item.count++
    }
  },
  [DECREMENT_FOOD_COUNT] (state, {Item}) {
    if (Item.count) {
      Item.count--
      if (Item.count === 0) {
        state.cartFoods.splice(state.cartFoods.indexOf(Item), 1)
      }
    }
  },
  [CLEAR_CAR] (state) {
    state.cartFoods.forEach(food => {
      food.count = 0
    })
    state.cartFoods = []
  },
  [RECEVIE_KEYWORD_SHOPS] (state, {shops}) {
    state.keywordShops = shops
  }
}
