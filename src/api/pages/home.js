//首页
import request from '@/utils/request'
export default {
	// 首页推荐： https://m.you.163.com/xhr/index.json?__timestamp=1630131808529&
	getHomeList(){
		return request.get(`/wy/xhr/index.json?__timestamp=1630131808529&`)
	},
   // 分类列表 // https://m.you.163.com/item/list.json?__timestamp=1630379110748&categoryId=1005000
   getCategoryList(categoryId){
	return request.get(`/item/list.json?__timestamp=1630379110748&categoryId=${categoryId}`)
   },
   // 全局列表  /xhr/page/global.json
   getGlobalList(){
	   return request.post('/xhr/page/global.json')
   }

}
