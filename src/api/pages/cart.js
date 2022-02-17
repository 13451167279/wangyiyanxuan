// 购物车
import request from '@/utils/request'
export default {
    reqAddOrUpdateShopCart(skuId,skuNum){
		// /api/user/passport/register
		return request({
			url: `/api/cart/addToCart/${ skuId }/${ skuNum }`,
			method: 'post'
		})
	
	},
    reqShopCartList(){
		return request({
			url: `/api/cart/cartList`,
			method: 'get'
		})
	
	},
    reqUpdateOneIsCheck(skuId,isChecked){
		return request({
			url: `/api/cart/checkCart/${skuId}/${isChecked}`,
			method: 'get'
		})
	
	},
    reqUpdateAllIsCheck(isChecked,skuIdList){
		return request({
			url: `/api/cart/batchCheckCart/${isChecked}`,
			method: 'post',
            data:skuIdList
		})
	
	},
    reqDeleteOneCart(skuId){
		return request({
			url: `/api/cart/deleteCart/${skuId}`,
			method: 'delete'
		})
	
	},
    reqDeleteAllCart(skuIdList){
		return request({
			url: `/api/cart/batchDeleteCart`,
			method: 'delete',
            data:skuIdList
		})
	
	},
}
