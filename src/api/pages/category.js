// 分类
import request from '@/utils/request';
export default {
  // 获取subCateList的列表数据
  // /item/list.json?__timestamp=${new Date().getTime()}&categoryType=0&subCategoryId=109293000&categoryId=1005000
  getSubCateInfo(type, subId, cateId) {
    return request.get(`/wy/item/list.json?__timestamp=${new Date().getTime()}&categoryType=${type}&subCategoryId=${subId}&categoryId=${cateId}`);
  },
  // 获取商品的总数
  // /xhr/search/getTotalNumbersOfProducts.json
  getTotalNumber() {
    return request.post('/wy/xhr/search/getTotalNumbersOfProducts.json');
  },
  // 获取导肮信息 参数  categoryId=
  // //m.you.163.com/item/cateList.json?__timestamp=1630329192155&categoryId=
  getCateList(id) {
    return request.get(`/wy/item/cateList.json?__timestamp=${new Date().getTime()}&categoryId=${id}`);
  },
  // 为你推荐和 分类列表数据
  RecommendForList() {
    return request.get(`/wy/item/cateList.json?__timestamp=${new Date().getTime()}&categoryId=`);
  },

  // 根据分类ID获取分类的列表：
  // https://m.you.163.com/item/cateList.json?__timestamp=1630131455012&categoryId=1005000
  getIdCatelist(id) {
    return request.get(`/wy/item/cateList.json?__timestamp=${new Date().getTime()}&category` + `&categoryId=${id}`);
  },

  // /获取某个分类下的商品列表：
  // https://m.you.163.com/item/list.json?__timestamp=1630133942864&categoryType=0&subCategoryId=1008009&categoryId=1005000
  getCateShopList(subId, cateId) {
    // console.log(subId, cateId)
    return request.get(`/wy/item/list.json?__timestamp=${new Date().getTime()}&categoryType=0&subCategoryId=${subId}&categoryId=${cateId}`);
    // return request.get('/wy/item/list.json?__timestamp=1630133942864&categoryType=0' + `&subCategoryId=${subId}` + `&categoryId=${cateId}`)
  },
};

// getSubCateInfo(type, subId, cateId) {
//   return request.get('/wy/item/list.json', {
//     categoryType: type,
//     subCategoryId: subId,
//     categoryId: cateId,
//   });
// },
