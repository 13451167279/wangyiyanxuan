import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from './store';
import './styles/index.css'; // 全局公共样式

import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

//@代表src目录的绝对路径
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router, //所有的组件都可以this.$router获取到路由器对象，this.$route获取到当前匹配的路由对象
  store,
}).$mount('#app');
