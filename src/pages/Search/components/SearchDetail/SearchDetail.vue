<template>
  <div>
    <!-- 历史记录 -->
    <div class="history" v-if="showHistory">
      <div class="up">
        <h4>历史记录</h4>
        <van-icon name="delete-o" @click="clearHistoryList" />
      </div>
      <div class="down">
        <van-tag
          color="#999999"
          plain
          size="large"
          v-for="(history, index) in historyList"
          :key="history"
          @click="search(history)"
          >{{ history }}</van-tag
        >
      </div>
    </div>
    <!-- 热门搜索 -->
    <div class="history">
      <div class="up">
        <h4>热门搜索</h4>
      </div>
      <div class="down">
        <van-tag
          plain
          size="large"
          v-for="(hotKey, index) in hotKeywordList"
          :key="index"
          :style="{ color: hotKey.highlight ? '#DD1A21' : '#999999' }"
          @click="search(hotKey.keyword)"
          >{{ hotKey.keyword }}</van-tag
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchDetail",
  props: ["hotKeywordList", "search", "showHistory", "historyList"],
  data() {
    return {
   
    };
  },
  mounted() {},
  methods: {
    //点击历史记录栏的删除按钮
    clearHistoryList() {
    //   this.historyList = [];
        this.$emit('update:historyList',[])
      localStorage.removeItem("historyList_key");
      //注意不能在子组件直接修改父组件的数据，否则会警告，使用.sync
      this.$emit('update:showHistory',false)
    },
    // 动态更新响应式数据,已使用.sync代替
    // pushHistoryList(list) {
    //   this.historyList = list;
    // },
  },
  computed: {}
};
</script>

<style lang="less" scoped>
.history {
  background-color: #fff;
  padding: 10px;
  .up {
    display: flex;
    justify-content: space-between;
    font-size: 24px;
    h4 {
      font-size: 22px;
    }
  }
  .van-tag {
    margin-right: 10px;
    margin-top: 10px;
  }
}
</style>
