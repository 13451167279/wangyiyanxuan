const state = {
  navBannerList: [],
  recAutoList: [],
};
const mutations = {
  SET_NAVBANNERLIST(state, navBannerList) {
    state.navBannerList = navBannerList;
  },
  SET_RECAUTOLIST(state, recAutoList) {
    state.recAutoList = recAutoList;
  },
};
const actions = {
  // 轮播导肮
  async reqNavBannerList({ commit }) {
    const res = await this.$API.worthBuy.getNavBannerList();
    commit('SET_NAVBANNERLIST', res.data.navList);
  },
  // 瀑布流
  async reqRecAutoList({ commit }, { page, size }) {
    const res = await this.$API.worthBuy.getRecAutoList(page, size);
    commit('SET_RECAUTOLIST', res.data.result);
  },
};
const getters = {
  bannerList(state) {
    let navList = state.navBannerList || [];
    let newList = [];
    while (navList.length > 0) {
      newList.push(navList.splice(0, 2));
    }
    return newList;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
