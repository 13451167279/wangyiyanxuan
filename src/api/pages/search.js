
//搜索
import request from '@/utils/request'
export default {
	// 默认关键字和热门关键字： https://m.you.163.com/xhr/search/init.json
	// 	实时关键字列表：https://m.you.163.com/xhr/search/searchAutoComplete.json 
	// 			注意： 请求体参数格式是application/x-www-form-urlencoded; charset=UTF-8
	// 	搜索：https://m.you.163.com/xhr/search/search.json?__timestamp=1630133434953&needPopWindow=true&searchWordSource=7&stillSearch=false&_stat_search=autoComplete&itemId=0&size=40&upperPrice=-1&floorPrice=-1&matchType=0&categoryId=0&descSorted=false&sortType=0&keyword=%E6%8C%89%E6%91%A9
	//用户输入发送搜索请求
	getSearchList(value) {
		return request({
			url: '/wy/xhr/search/searchAutoComplete.json',
			method: 'post',
			data: { keywordPrefix: value },
			transformRequest: [function (data) {
				let ret = ''
				for (let it in data) {
					ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
				}
				return ret
			}],
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			}
		})
	},
	//获取默认和热门关键字
	getKeywordList() {
		return request.get('/wy/xhr/search/init.json')
	},
	//点击关键字进行搜索产品
	search(value) {
		return request.get(`/wy/xhr/search/search.json?__timestamp=${+new Date()}&needPopWindow=true&searchWordSource=7&stillSearch=false&_stat_search=autoComplete&itemId=0&size=40&upperPrice=-1&floorPrice=-1&matchType=0&categoryId=0&descSorted=false&sortType=0&keyword=${value}`)
	},
	searchCate({ value, cateId }) {
		return request.get("/wy/xhr/search/search.json", {
			params: {
				__timestamp: new Date(),
				needPopWindow: true,
				searchWordSource: 7,
				stillSearch: false,
				_stat_search: 'autoComplete',
				itemId: 0,
				size: 40,
				upperPrice: -1,
				floorPrice: -1,
				matchType: 0,
				categoryId: cateId,
				descSorted: false,
				sortType: 0,
				keyword: value
			}
		})
	},
	// searchCate({value,cateId}) {
	// 	return request.get(`/wy/xhr/search/search.json?__timestamp=${+new Date()}&needPopWindow=true&searchWordSource=7&stillSearch=false&_stat_search=autoComplete&itemId=0&size=40&upperPrice=-1&floorPrice=-1&matchType=0&categoryId=${cateId}&descSorted=false&sortType=0&keyword=${value}`)
	// },
	// searchCate(params) {
	// 	return request.get("/wy/xhr/search/search.json", {
	// 		params
	// 	})
	// },


}
