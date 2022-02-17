const state = {
	HomeList:{},
	categoryInfo:{},
	globalInfo:{}
}
const mutations = {
	SET_HOMELIST(state,HomeList){
		state.HomeList = HomeList;
	},
	SET_GLOBALINFO(state,globalInfo){
		state.globalInfo=globalInfo
	},
	SET_CATEGORYINFO(state,categoryInfo){
		state.categoryInfo=categoryInfo
	}
}
const actions = {

	async getHomeList({commit}){
		 const result = await this.$API.home.getHomeList()
		 commit('SET_HOMELIST',result.data)
	},
	async getGlobalList({commit}){
		const result = await this.$API.home.getGlobalList()
		commit('SET_GLOBALINFO',result.data)
	},
	async getCategoryList({commit},categoryId){
		const result = await this.$API.home.getCategoryList(categoryId)
		commit('SET_CATEGORYINFO',result.data)
		console.log(result);
		
	}

}
const getters = {}

export default {
	state,
	mutations,
	actions,
	getters
}
