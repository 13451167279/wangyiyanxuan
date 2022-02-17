
// z注册

import request from '@/utils/request'
export default {
    
	getCode(phone){
		// console.log(11111111111);
		// return request.post(`/api/user/passport/sendCode/${phone}`,phone)
		return request({
			url: `/api/user/passport/sendCode/${phone}`,
			method: 'get'
		})
	},
	// 注册用户
	register(userInfo){

		// /api/user/passport/register
		return request({
			url: `/api/user/passport/register`,
			method: 'post',
			data:userInfo
		})
	}

}
