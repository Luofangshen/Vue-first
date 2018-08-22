import Vue from 'vue'
import {Header, Cell, Search, Button} from 'mint-ui'

import App from './App'
import router from './router'
import store from './store'
import './mock/mockServer'
import VueLazyload from 'vue-lazyload'
import './filters/filter'

Vue.use(VueLazyload, {
  loading: './static/imgs/loading.gif'
})
Vue.component(Button.name, Button)
Vue.component(Search.name, Search)
Vue.component(Cell.name, Cell)
Vue.component(Header.name, Header)

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
