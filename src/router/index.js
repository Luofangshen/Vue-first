import Vue from 'vue'
import VueRouter from 'vue-router'
import User from '../views/User/User'
import Shop from '../views/Shop/Shop'
import ShopFoods from '../views/Shop/ShopFoods/ShopFoods'
import ShopComments from '../views/Shop/ShopComments/ShopComments'
import ShopInfo from '../views/Shop/ShopInfo/ShopInfo'

Vue.use(VueRouter)

const Home = () => import('../views/Home/Home')
const Search = () => import('../views/Search/Search')
const Order = () => import('../views/Order/Order')
const Personal = () => import('../views/Personal/Personal')
const Login = () => import('../views/Login/Login')
export default new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home,
      meta: {
        show: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        show: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        show: true
      }
    },
    {
      path: '/personal',
      component: Personal,
      meta: {
        show: true
      }
    },
    {
      path: '/user',
      component: User
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: 'foods',
          component: ShopFoods
        },
        {
          path: 'comments',
          component: ShopComments
        },
        {
          path: 'info',
          component: ShopInfo
        },
        {
          path: '',
          redirect: 'foods'
        }
      ]
    }
  ]
})
