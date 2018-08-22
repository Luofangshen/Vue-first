/*
基于state计算的属性对象
 */
export default {
  foodListArr (state) {
    const {foodList} = state
    let arr = []
    let minArr = []
    for (let i = 0; i < (foodList.length % 8 !== 0 ? Math.floor(foodList.length / 8 + 1) : Math.floor(foodList.length / 8 + 1)); i++) {
      minArr = []
      for (let j = 0; j < 8; j++) {
        if (foodList[i * 8 + j] === undefined) {
          break
        }
        minArr.push(foodList[i * 8 + j])
      }
      if (minArr.length !== 0) {
        arr.push(minArr)
      }
    }
    return arr
  },
  positive (state) {
    return state.comments.reduce((preTotal, comment) => preTotal + (comment.rateType === 0 ? 1 : 0), 0)
  }
}
