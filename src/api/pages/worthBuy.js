// 值得买
import request from '@/utils/request';
export default {
  // 轮播数据
  // https://m.you.163.com/topic/v1/know/navWap.json
  getNavBannerList() {
    return request.get('/wy/topic/v1/know/navWap.json');
  },

  //商品瀑布流
  // https://m.you.163.com/topic/v1/find/recAuto.json?page=1&size=2&exceptIds=
  getRecAutoList(page, size) {
    return request.get(`/wy/topic/v1/find/recAuto.json?page=${page}&size=${size}`);
  },
};
