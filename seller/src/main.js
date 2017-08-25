// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueRouter from 'vue-router'
//注册VueRouter script src="../vue-router.js"
Vue.use(VueRouter);

import VueResource from 'vue-resource';
//注册VueResource script src="../vue-resource.js"
Vue.use(VueResource);

//组件
import goods from './components/goods/goods.vue'
import ratings from './components/ratings/ratings.vue'
import seller from './components/seller/seller.vue'

Vue.config.productionTip = false

//定义组件路由
const routes = [
  { path: '/', redirect:'/goods '},
  { path: '/goods', component: goods },
 	{ path: '/ratings', component: ratings },
 	{ path: '/seller', component: seller },
]

//实例 注册主键
const router = new VueRouter({
  routes ,
  linkActiveClass:'active'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app');

