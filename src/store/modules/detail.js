const state = {
	goodsInfo:{}
}
const mutations = {
	SET_GOODSINFO(state,goodsInfo){
		state.goodsInfo=goodsInfo;
	}
}
const actions = {
	async getUserInfo({commit},skuId){
		const result = await this.$API.detail.reqGoodsInfo(skuId);
		if(result.code===200){
			commit('SET_GOODSINFO',result.data)
		}
	},
}
const getters = {
	categoryView(state){
		return state.goodsInfo.categoryView || {}
	  },
	  skuInfo(state){
		return state.goodsInfo.skuInfo || {}
	  },
	  spuSaleAttrList(state){
		return state.goodsInfo.spuSaleAttrList || []
	  }
}

export default {
	state,
	mutations,
	actions,
	getters
}
