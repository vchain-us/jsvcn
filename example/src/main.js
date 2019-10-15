import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Verify from "./components/Verify.vue";
import Sign from "./components/Sign.vue";

Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/sign', component: Sign, name: 'sign' },
    { path: '/', component: Verify, name: 'verify' }
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
