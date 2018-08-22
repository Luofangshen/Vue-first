import Mock from 'mockjs'
import data from './data'

Mock.mock('/foods', {code: 0, data: data.goods})

Mock.mock('/info', {code: 0, data: data.info})

Mock.mock('/comments', {code: 0, data: data.ratings})
