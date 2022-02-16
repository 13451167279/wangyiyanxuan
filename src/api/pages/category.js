// 分类
import request from '@/utils/request';
export default {
  // 获取商品的总数
  // /xhr/search/getTotalNumbersOfProducts.json
  getTotalNumber() {
    return request.post('/wy/xhr/search/getTotalNumbersOfProducts.json');
  },
  // 获取导肮信息 参数  categoryId=
  // //m.you.163.com/item/cateList.json?__timestamp=1630329192155&categoryId=
  getCateList(id) {
    return request.get(`/wy/item/cateList.json?categoryId=${id}`);
  },

  // 获取subCateList的列表数据
  // /item/list.json?__timestamp=1630427345256&categoryType=0&subCategoryId=109293000&categoryId=1005000
  getSubCateInfo(type, subId, cateId) {
    return request.get(`/wy/item/list.json?categoryType=${type}&subCategoryId=${subId}&categoryId=${cateId}`);
  },
  // getSubCateInfo(type, subId, cateId) {
  //   return request.get('/wy/item/list.json', {
  //     categoryType: type,
  //     subCategoryId: subId,
  //     categoryId: cateId,
  //   });
  // },
};
