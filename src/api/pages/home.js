//首页
import request from '@/utils/request'
export default {
	// 首页推荐： https://m.you.163.com/xhr/index.json?__timestamp=1630131808529&
	getHomeList(){
		return request.get(`/wy/xhr/index.json?__timestamp=1630131808529&`)
	},

}
