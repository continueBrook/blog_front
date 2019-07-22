import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from '../store/index'
import uuid from 'uuid/v4'
import method from '../src/libs/method'

Vue.prototype.uuid = uuid
Vue.prototype.method = method

new Vue({
  el:'#app',
  router,
  store,
  components:{App},
  template:'<app/>'
})