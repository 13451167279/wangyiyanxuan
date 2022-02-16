const state = {}
const mutations = {}
const actions = {
	getHomeList(){

		this.$API.home.getHomeList()
	}
}
const getters = {}

export default {
	state,
	mutations,
	actions,
	getters
}
