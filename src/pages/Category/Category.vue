<template>
  <div class="cateContainer">
    <!-- 头部 -->
    <div class="header">
      <div class="search">
        <i class="icon"></i>
        <span class="placeholder">搜索商品, 共{{totalNumber}}款好物</span>
      </div>
    </div>
    <!--商品  -->
    <!-- <div class="mainComtent" style="height:574px"> -->
    <div class="mainComtent">
      <!-- 左边滚动导航 -->
      <div class="leftNav">
        <van-sidebar v-model="currentShowId">
          <van-sidebar-item @click="changeId(slider.id)" :title="slider.name" v-for="(slider) in sliderList" :key="slider.id" />
        </van-sidebar>
      </div>
      <!-- 右边商品列表 -->

      <CateList :bannerList='bannerList' :categoryGroupList='categoryGroupList'></CateList>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import CateList from './CateList'
export default {
  name: "Category",

  components: {
    CateList,
  },
  data() {
    return {
      // navActiveIndex: 0,
      currentShowId: 0,
    }
  },
  async mounted() {
    const id = await this.$route.query.categoryId * 1 || '';
    this.getTotalNumber();
    this.getCategoryInfo(id);

    this.currentShowId = this.$route.query.index * 1 || 0
  },

  methods: {
    //获取总商品数量请求
    getTotalNumber() {
      this.$store.dispatch('reqTotalNumber');
    },
    // 发请求获取分类信息
    getCategoryInfo(id = '') {
      this.$store.dispatch('reqCategoryInfo', id);
    },
    // 切换导航
    changeId(id) {
      let index = this.sliderList.findIndex(item => item.id === id)
      this.$router.push(`/category?categoryId=${id}&index=${index}`);
    },
  },
  computed: {
    ...mapState({
      totalNumber: state => state.category.totalNumber
    }),
    ...mapGetters(['sliderList', 'currentCategory', 'categoryGroupList']),
    bannerList() {
      return (this.currentCategory || {}).bannerList || [];
    }
  },
  watch: {
    $route: {
      handler(newValue) {
        this.getCategoryInfo(newValue.query.categoryId * 1)
        this.getTotalNumber();
      },

    }

  }

}
</script>


<style lang="less" >
.cateContainer {
  .header {
    display: flex;
    width: 100%;
    align-items: center;
    height: 44px;
    padding: 0 15px;
    box-sizing: border-box;
    background-color: #fff;
    // position: relative;
    position: fixed;
    top: 0;
    left: 0;
    .search {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 28px;
      border-radius: 4px;
      line-height: 28px;
      background-color: #ededed;
      &::after {
        content: "";
        position: absolute;
        background-color: #d9d9d9;
        left: 0;
        width: 100%;
        height: 0.5px;
        -webkit-transform-origin: 50% 100% 0;
        transform-origin: 50% 100% 0;
        bottom: 0;
      }
      .icon {
        width: 14px;
        height: 14px;
        margin-right: 5px;
        background: url("../../assets/images/category/bg.png") no-repeat -70px -28px;
        display: inline-block;
        vertical-align: middle;
        background-size: 119px 101.5px;
        // position: absolute;
        top: 50%;
      }
      .placeholder {
        color: #666;
        font-size: 14px;
      }
    }
  }
  .mainComtent {
    margin-top: 44px;
    box-sizing: border-box;
    display: flex;
    .leftNav {
      width: 81px;
      height: 100%;
      background-color: #fff;
      // position: relative;
      position: fixed;
      left: 0;
      // border-right: 1px solid #d9d9d9;
      // box-sizing: border-box;
      &::after {
        content: "";
        position: absolute;
        background-color: rgba(0, 0, 0, 0.15);
        top: 0;
        bottom: 0;
        width: 1px;
        -webkit-transform-origin: 100% 50% 0;
        transform-origin: 100% 50% 0;
        right: 0;
      }
      .van-sidebar {
        padding: 10px 0 20px;
        width: 100%;
      }
      .van-sidebar-item {
        width: 100%;
        font-size: 14px;
        padding: 10px 12px;
        &.van-sidebar-item--select {
          color: #ab2b2b;
        }
        &.van-sidebar-item--select::before {
          height: 25px;
          width: 3px;
          background-color: #ab2b2b;
        }
      }
    }
  }
}
</style>
