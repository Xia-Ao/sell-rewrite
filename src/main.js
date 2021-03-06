// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from './components/goods/goods.vue';
import ratings from './components/ratings/ratings.vue';
import seller from './components/seller/seller.vue';

import './common/stylus/index.styl';

// randomName.f2();
// randomName.f3();
import {default as randomName} from './module/test1'
console.log(randomName)
let a=1
if (a) {
  import('./module/test2').then(dj => {
    console.log(dj.age)
  }).catch(() => {
  alert('error')
  })
}

Vue.use(VueRouter);
Vue.use(VueResource);

// 0. 如果使用模块化机制编程，導入Vue和VueRouter，要调用 Vue.use(VueRouter)

// 1. 定义（路由）组件。 可以从其他文件 import 进来


// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是通过 Vue.extend() 创建的组件构造器，或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  {path: '/', redirect: '/goods'},  // 路由重定向，可以设置默认路由
  {path: '/goods', component: goods},
  {path: '/ratings', component: ratings},
  {path: '/seller', component: seller}
];


// 3. 创建 router 实例，然后传 `routes` 配置 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  linkActiveClass: 'active',
  routes // （缩写）相当于 routes: routes
});

// 4. 创建和挂载根实例。记得要通过 router 配置参数注入路由，从而让整个应用都有路由功能

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
