const state = {
	shopCartList: []
}
const mutations = {
	SET_SHOPCARTLIST(state, shopCartList) {
		state.shopCartList = shopCartList
	}
}
const actions = {
	async addOrUpdateShopCart({
		commit
	}, {
		skuId,
		skuNum
	}) {
		const result = await this.$API.cart.reqAddOrUpdateShopCart(skuId, skuNum)
		if (result.code === 200) {
			// 代表添加购物车成功
			return 'ok'
		} else {
			return Promise.reject(new Error('failed'))
		}
	},
	async getShopCartList({
		commit
	}) {
		const result = await this.$API.cart.reqShopCartList()
		if (result.code === 200) {
			commit('SET_SHOPCARTLIST', result.data)
		}
	},
	async updateOneIsCheck({
		commit
	}, {
		skuId,
		isChecked
	}) {
		const result = await this.$API.cart.reqUpdateOneIsCheck(skuId, isChecked)
		console.log(111111111111);
		if (result.code === 200) {
			// 代表添加购物车成功
			return 'ok'
		} else {
			return Promise.reject(new Error('failed'))
		}
	},
	async updateAllIsCheck({
		commit
	}, {
		isChecked,
		skuIdList
	}) {
		const result = await this.$API.cart.reqUpdateAllIsCheck(isChecked, skuIdList)
		if (result.code === 200) {
			// 代表添加购物车成功
			return 'ok'
		} else {
			return Promise.reject(new Error('failed'))
		}
	},
	async deleteOneCart({
		commit
	}, skuId) {
		const result = await this.$API.cart.reqDeleteOneCart(skuId)
		if (result.code === 200) {
			// 代表添加购物车成功
			return 'ok'
		} else {
			return Promise.reject(new Error('failed'))
		}
	},

	async deleteAllCart({
		commit
	}, skuIdList) {
		const result = await this.$API.cart.reqDeleteAllCart(skuIdList)
		if (result.code === 200) {
			// 代表添加购物车成功
			return 'ok'
		} else {
			return Promise.reject(new Error('failed'))
		}
	},

}
const getters = {}

export default {
	state,
	mutations,
	actions,
	getters
}