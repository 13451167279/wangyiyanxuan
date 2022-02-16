<template>
  <div class="rightGoods">
    <!-- 图片 -->
    <div class="banner" v-if="bannerList.length ===1">
      <img class="bannerImg" :src="bannerList[0].picUrl" alt="">
    </div>
    <!--轮播 -->
    <div class="banner" v-else>
      <van-swipe class="my-swipe" ref="swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="banner in bannerList" :key="banner.id">
          <img :src="banner.picUrl" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 商品 -->
    <div class="cateList" v-for="categoryGroup in categoryGroupList" :key="categoryGroup.id">
      <div class="title" v-if='categoryGroup.name'>{{categoryGroup.name}}</div>
      <ul class="list">
        <li class="cateItem" @click="toSubCateList(category)" v-for="category in categoryGroup.categoryList" :key="category.id">
          <div>
            <div class="itemImg">
              <img :src="category.wapBannerUrl" alt="">
            </div>
            <div class="name">{{category.name}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template> 

<script>
export default {
  name: 'CateList',
  props: ['categoryGroupList', 'bannerList'],

  // watch: {
  //   navActiveIndex: () => {
  //     console.log(this.navActiveIndex);
  //   }
  // },
  methods: {
    toSubCateList(category) {
      this.$router.push({
        path: '/subcateList',
        query: {
          categoryId: category.superCategoryId,
          subCategoryId: category.id,
          categoryType: category.categoryType,
        }
      });
    }
  },
  computed: {

  },
}
</script>

<style lang="less" scoped>
.rightGoods {
  margin-left: 81px;
}
.cateList {
  // margin-left: 81px;
  width: 264px;
  .title {
    text-align: left;
    overflow: hidden;
    text-align: left;
    font-size: 14px;
    padding-bottom: 4px;
    margin-bottom: 12px;
    border-bottom: 1px solid #d9d9d9;
    color: #333;
    font-weight: 700;
    font-family: PingFangSC-Light, helvetica, Heiti SC;
  }
}
.rightGoods {
  padding: 15px 15px 50px;
  height: 100%;
  // overflow: hidden;
  box-sizing: border-box;
  .banner {
    width: 264px;
    height: 96px;
    margin-bottom: 16px;
    .bannerImg {
      width: 264px;
      height: 96px;
    }
    .my-swipe {
      width: 264px;
      height: 100%;
      .van-swipe-item {
        width: 264px;
        height: 100%;
        img {
          width: 264px;
          height: 100%;
        }
      }
      ::v-deep .van-swipe__indicator {
        width: 20px;
        height: 1.5px;
        border-radius: 0;
      }
    }
  }
  .cateList {
    margin-bottom: 6px;
    .list {
      width: 264px;
      .cateItem {
        display: inline-block;
        width: 72px;
        margin-right: 24px;
        &:nth-child(3n) {
          margin-right: 0;
        }
        .itemImg {
          width: 72px;
          height: 72px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .name {
          height: 34px;
          text-align: center;
          line-height: 34px;
          color: #333;
          display: block;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
