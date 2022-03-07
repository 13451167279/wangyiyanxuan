import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from './store';
import './styles/index.css'; // 全局公共样式

import { Lazyload } from 'vant';
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
Vue.use(Lazyload);

import * as API from './api/index';

import Header from '@/components/Header';
//全局注册组件
Vue.component('Header', Header);

Vue.config.productionTip = false;

Vue.filter('RMBformat', (val) => {
  return '￥' + val + '元';
});

//@代表src目录的绝对路径
Vue.config.productionTip = false;

new Vue({
  beforeCreate() {
    Vue.prototype.$API = API;
    Vue.prototype.$bus = this;
  },
  render: (h) => h(App),
  router, //所有的组件都可以this.$router获取到路由器对象，this.$route获取到当前匹配的路由对象
  store,
  render: (h) => h(App),
}).$mount('#app');
