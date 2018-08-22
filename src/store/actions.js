/*
封装了n个函数的对象，通过通知mutations去修改数据,在这里可以进行异步的操作
 */
import {RECEVIE_ADDRESS, RECEVIE_FOODLIST, RECEVIE_SHOPS, RECEVIE_USER, RESET_USER, RECEVIE_SHOPINFO, RECEVIE_SHOPFOODS, RECEVIE_SHOPCOMMENTS, DECREMENT_FOOD_COUNT, INCREMENT_FOOD_COUNT, CLEAR_CAR, RECEVIE_KEYWORD_SHOPS} from './mutation-types'
import {reqShopList, reqFoodList, reqAddress, reqUserInfo, reqLogout, reqShopFoods, reqShopComments, reqShopInfo, reqKeywordShopList} from '../api'

export default {
  async getAddress ({commit, state}) {
    const {latitude, longtitude} = state
    const geohash = latitude + ',' + longtitude
    let result = await reqAddress(geohash)
    if (result.code === 0) {
      const address = result.data
      commit(RECEVIE_ADDRESS, {address})
    }
  },
  async getFoodList ({commit}) {
    let result = await reqFoodList()
    if (result.code === 0) {
      const foodList = result.data
      commit(RECEVIE_FOODLIST, {foodList})
    }
  },
  async getShops ({commit, state}, cb) {
    const {latitude, longtitude} = state
    let result = await reqShopList(latitude, longtitude)
    if (result.code === 0) {
      const shops = result.data
      commit(RECEVIE_SHOPS, {shops})
      cb && cb()
    }
  },
  codeUser ({commit}, user) {
    commit(RECEVIE_USER, {user})
  },
  async getUser ({commit}) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      const user = result.data
      commit(RECEVIE_USER, {user})
    }
  },
  async logout ({commit}) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USER)
    }
  },
  async getShopFoods ({commit}) {
    const result = await reqShopFoods()
    if (result.code === 0) {
      const foods = result.data
      commit(RECEVIE_SHOPFOODS, {foods})
    }
  },
  async getShopInfo ({commit}) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEVIE_SHOPINFO, {info})
    }
  },
  async getShopComments ({commit}) {
    const result = await reqShopComments()
    if (result.code === 0) {
      const comments = result.data
      commit(RECEVIE_SHOPCOMMENTS, {comments})
    }
  },
  updateCount ({commit}, {isAdd, Item}) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, {Item})
    } else {
      commit(DECREMENT_FOOD_COUNT, {Item})
    }
  },
  clearCar ({commit}) {
    commit(CLEAR_CAR)
  },
  async searchShops ({commit, state}, searchName) {
    const {latitude, longtitude} = state
    const geohash = latitude + ',' + longtitude
    const result = await reqKeywordShopList(geohash, searchName)
    if (result.code === 0) {
      const shops = result.data
      commit(RECEVIE_KEYWORD_SHOPS, {shops})
    }
  }
}
