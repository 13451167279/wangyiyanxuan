// 登录
import request from '@/utils/request'
export default {
    // 首页推荐： https://m.you.163.com/xhr/index.json?__timestamp=1630131808529&
	login(userInfo){

		// /api/user/passport/register
		return request({
			url: `/api/user/passport/login`,
			method: 'post',
			data:userInfo
		})
	},
	reqGetUserInfo(){
		// /api/user/passport/register
		return request({
			url: `/api/user/passport/auth/getUserInfo`,
			method: 'get'
		})
	
	},
	reqLoginOut(){
		return request({
			url: `/api/user/passport/logout`,
			method: 'get'
		})
	}

}
