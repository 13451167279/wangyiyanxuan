import { register } from "@/api";

const state = {
	code:'',
}
const mutations = {
	SET_CODE(state,code){
		state.code=code;
	}
}
const actions = {
	async getCode({commit},phone){
		const result = await this.$API.register.getCode(phone);
		// console.log(result)
		if(result.code===200){
			commit('SET_CODE',result.data)
			return result.data
		}else{
			return Promise.reject(new Error('failed'))
		}
	},
	async register({commit},userInfo){
		const result = await this.$API.register.register(userInfo);
		if(result.code===200){
			return 'ok'
		}else{
			return Promise.reject(new Error('failed'))
		}
	}
}
const getters = {}

export default {
	state,
	mutations,
	actions,
	getters
}
