// 商品详情
import request from '@/utils/request'
export default {
    reqGoodsInfo(skuId){
		return request({
			url: `/api/item/${ skuId }`,
			method: 'get'
		})
	},

}
