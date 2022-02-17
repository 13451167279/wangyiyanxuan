<template>

  <div>
    <!-- 头部 -->
    <form action="/">
      <van-search
        v-model="value"
        :show-action ="showAction"
        :placeholder="defaultKeyword.keyword"
        @input="getSearchList"
        @click="showHistoryList"
        @cancel="onCancel"
        @clear="clearKeyword"
      />
    </form>
    <van-loading type="spinner" v-if="loading" vertical />
    <!-- 搜索列表 -->
    <van-list>
      <van-cell
        v-for="item in searchList"
        :key="item"
        :title="item"
        @click="search(item)"
      />
    </van-list>
    <SearchDetail
      :hotKeywordList="hotKeywordList"
      :showHistory.sync="showHistory"
      :search="search"
      :historyList.sync = "historyList"
      ref="Detail"
      v-if="showSearchDetail"
    ></SearchDetail>
    <Product v-else :productList.sync = "productList" :value="value"></Product>
  </div>
</template>

<script>
import SearchDetail from "./components/SearchDetail/SearchDetail.vue";
import Product from "./components/Product/Product";
import _ from "lodash";
export default {
  // 组件名称
  name: "Search",
  data() {
    return {
      value: "",
      defaultKeyword: {}, //默认关键字
      // defaultKeywords: [],
      hotKeywordList: [], //热门关键字
      searchList: [],//用户搜索出来的关键字列表
      historyList: [],//历史记录列表
      showHistory: false,//控制历史记录打开的开关
      productList:{},//产品列表
      loading:false,//是否开启加载
      showSearchDetail:true,//控制搜索页面和产品页面的开关
      showAction:true//控制搜索栏取是否显示消按钮的开关
    };
  },
  mounted() {
    this.getKeywordList();
  },
  methods: {
    //获取关键字列表
    async getKeywordList() {
      const result = await this.$API.search.getKeywordList();
      // commit('RECEIVE_KEYS',result.data)
      this.defaultKeyword = result.data.defaultKeyword;
      this.hotKeywordList = result.data.hotKeywordVOList;
    },

    //使用lodash防抖,input事件
    getSearchList: _.debounce(async function () {
      //去空格
      let value = this.value.trim();
      // let historyList = [];
      //判断输入框是否有值
      if (value !== "") {
        const result = await this.$API.search.getSearchList(this.value);
        //数据兜底（类似默认值）
        this.searchList = _.get(result, "data", _.get(result, "data", "没有"));
      } else {
        //当搜索框没内容时清空搜索列表
        this.searchList = [];
      }
      // this.$store.dispatch("getSearchList", this.value);
    }, 2000),

    //点击关键字显示历史记录
    showHistoryList() {
      // var obj  = {}
      // var newObje = _.get(obj,'age',_.get(obj,'name','没有'))
      // console.log(newObje,2232)
      this.historyList = JSON.parse(
        localStorage.getItem("historyList_key")
      ) || [];
      if (this.historyList.length) {
        //如果有历史记录，则打开显示
        this.showHistory = true;
        //在子组件里更新数据
        // this.$refs.Detail.pushHistoryList(historyListAdd);
      }
    },

    //点击关键字进行搜索
    async search(value) {
      this.showHistoryList();
      //打开加载按钮
      this.loading = true
      const result = await this.$API.search.search(value);
      this.productList = result.data
      //把点击的关键字添加到历史记录列表
      // this.historyList.unshift(value);
      // //调用去重
      // this.historyList = this.unique(this.historyList);
      // if (this.historyList.length > 10) {
      //   //最多保存10条
      //   this.historyList = this.historyList.slice(0, 10);
      // }
      // //存储历史记录在本地
      // localStorage.setItem("historyList_key", JSON.stringify(this.historyList));
         let historyList = []
         historyList.unshift(value);
      //调用去重
      historyList = this.unique(historyList);
      if (historyList.length > 10) {
        //最多保存10条
        historyList = historyList.slice(0, 10);
      }
      //存储历史记录在本地
      localStorage.setItem("historyList_key", JSON.stringify(historyList));
      this.historyList = historyList
      //让ipt的值同步显示
      this.value = value;
      this.loading = false //关闭
      this.showSearchDetail=false
      //关闭搜索栏取消按钮
      this.showAction = false
    },

    //封装去重
    unique(arr) {
      return arr.filter(function (item, index, arr) {
        return arr.indexOf(item, 0) === index;
      });
    },

    //点击搜索栏的取消
    onCancel() {
      this.$router.back();
    },
    //点击搜索栏的清除按钮
    clearKeyword(){
      this.showSearchDetail=true
    }
  },
  components: {
    SearchDetail,
    Product,
  },
};
</script>

<style scoped>

</style>
