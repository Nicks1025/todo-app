
import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource'
import VueSession from 'vue-session'
import VueRouter from 'vue-router'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.use(VueSession)
Vue.use(VueRouter)
Vue.use(VueResource)
// const cors = require('cors')

Vue.config.productionTip = false;


import Routes from './router'

// creating object of router
const router = new VueRouter({
  routes :Routes,
  mode : "history" 
})

new Vue({
  el: '#app',
  render: h => h(App),
  router : router
})
