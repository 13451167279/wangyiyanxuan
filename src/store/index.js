import Vue from 'vue';
import Vuex from 'vuex';
import cart from './modules/cart';
import category from './modules/category';
import center from './modules/center';
import detail from './modules/detail';
import home from './modules/home';
import worthBuy from './modules/worthBuy';
import login from './modules/login';
import pay from './modules/pay';

import search from './modules/search';
import register from './modules/register';

import getters from '@/store/getters';
import * as API from '@/api/index';
Vue.use(Vuex);

const store = new Vuex.Store({
  getters,

  //合并小的vuex module组件合并到总的store
  modules: {
    cart,
    category,
    center,
    detail,
    home,
    worthBuy,
    login,
    pay,
    search,
    register,
  },
});
store.$API = API;
export default store;
