import {getUserTempId} from '@/utils/userabout'

const state = {
	//临时标识
	userTempId:getUserTempId(),
	// token:'',
	userInfo:{},
	token:localStorage.getItem('token_key')//自动登录
}
const mutations = {
	SET_TOKEN(state,token){
		state.token=token;
	},
	SET_USERINFO(state,userInfo){
		state.userInfo=userInfo;
	},
	REMOVE_TOKEN(state){
		state.token=''
	},
	REMOVE_USERINFO(state){
		state.userInfo={}
	}
}
const actions = {
	async login({commit},userInfo){
		const result = await this.$API.login.login(userInfo);
		if(result.code===200){
			commit('SET_TOKEN',result.data.token)
			localStorage.setItem('token_key',result.data.token)
			return 'ok'
		}else{
			return Promise.reject(new Error('failed'))
		}
	},
	async getUserInfo({commit}){
		const result = await this.$API.login.reqGetUserInfo();
		if(result.code===200){
			commit('SET_USERINFO',result.data)
		}
		// console.log(result.data)
	},
	async removeToken({commit}){
		localStorage.removeItem('token_key')
		await commit('REMOVE_TOKEN')
	},
	async userLoginOut({commit,dispatch}){
		const result = await this.$API.login.reqLoginOut();
		if(result.code===200){
			
			commit('REMOVE_USERINFO')
			dispatch('removeToken')
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