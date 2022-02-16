const state = {
  totalNumber: 0,
  categoryInfo: {},
  // sub
  subCateInfo: {},
};
const mutations = {
  SET_TOTALNUMBER(state, totalNumber) {
    state.totalNumber = totalNumber;
  },
  SET_CATEGORYINFO(state, categoryInfo) {
    state.categoryInfo = categoryInfo;
  },
  //
  SET_SUBCATEINFO(state, subCateInfo) {
    state.subCateInfo = subCateInfo;
  },
};
const actions = {
  // 商品数量
  async reqTotalNumber({ commit }) {
    const res = await this.$API.category.getTotalNumber();
    commit('SET_TOTALNUMBER', res.data);
  },
  // 详细分类
  async reqCategoryInfo({ commit }, id) {
    const res = await this.$API.category.getCateList(id);
    commit('SET_CATEGORYINFO', res.data);
  },
  // sub数据
  async reqSubCateInfo({ commit }, { categoryType, subCategoryId, categoryId }) {
    const res = await this.$API.category.getSubCateInfo(categoryType, subCategoryId, categoryId);
    commit('SET_SUBCATEINFO', res.data);
  },
};
const getters = {
  // 侧边栏
  sliderList(state) {
    return (state.categoryInfo || {}).categoryL1List || [];
  },
  // 右边商品数据
  categoryGroupList(state) {
    return (state.categoryInfo || {}).categoryGroupList || [];
  },
  // 当前商品
  currentCategory(state) {
    return (state.categoryInfo || {}).currentCategory || {};
  },

  // subCateList
  // 顶部导航
  topNavList(state) {
    return (state.subCateInfo || {}).categoryL2List;
  },
  // 每一个分类的子分类当前分类
  category(state) {
    return ((state.subCateInfo || {}).categoryItems || {}).category || {};
  },
  // 每一个分类的子分类的所有商品列表
  itemList(state) {
    return ((state.subCateInfo || {}).categoryItems || {}).itemList || [];
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
