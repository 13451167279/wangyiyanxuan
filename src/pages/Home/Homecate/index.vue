<template>

  <div>
    <div class="container" v-if="bannerList&&categoryItemList">
      <van-swipe class="swiper" indicator-color="white">
        <van-swipe-item v-for="(banner, index) in bannerList" :key="index">
          <img :src="banner.picUrl" alt="" />
        </van-swipe-item>
      </van-swipe>

      <div class="goodsGrid">
        <div class="gridList" v-for="(item1,index) in categoryItemList" :key="index">
          <div class="header" v-if="categoryItemList">
            <div class="title">{{ categoryItemList[index].category.name }}</div>
            <div class="desc">{{ categoryItemList[index].category.frontDesc }}</div>
          </div>
          <div class="content">
            <div class="gridItem" v-for="(item2,index) in item1.itemList" :key="item2.id">
              <div class="img">
                <img :src="item2.listPicUrl" alt="" v-lazy="item2.listPicUrl" />

                <div class="picPrice">
                  <div class="specialPrice">
                    <div>特价</div>
                    <div v-if="item2.counterPrice">￥{{item2.counterPrice}}</div>
                  </div>
                  <div class="remainingTime" v-if="item2.listPromBanner">{{item2.listPromBanner.content}}</div>
                  <div class="remaining" v-if="!item2.listPromBanner">{{item2.simpleDesc}}</div>
                </div>
              </div>

              <div class="desc">{{ item2.name }}</div>
              <div class="price">
                <span class="currentPrice">￥{{item2.retailPrice}}</span>
                <span class="originPrice" v-if="item2.counterPrice">￥{{item2.counterPrice}}</span>
              </div>
              <div class="price2" v-if="item2.counterPrice">特价</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Other",
  props: ['bannerList', 'categoryItemList'],
  data() {
    return {
      categoryId: "",
    };
  },
  mounted() {
    // this.categoryId = this.$route.query.categoryId;
    // this.getCategoryList();
  },
  methods: {
    getCategoryList() {
      if (this.categoryId == 0) return;
      this.$store.dispatch("getCategoryList", this.categoryId);
    },
  },
  computed: {
    // ...mapState({ categoryInfo: (state) => state.home.categoryInfo }),
    // bannerList() {
    //   return (this.categoryInfo.currentCategory || {}).bannerList;
    // },
    // categoryItemList() {
    //   return this.categoryInfo.categoryItemList;

    // },
  },
  watch: {
    // $route: {
    //   handler() {
    //     this.categoryId = this.$route.query.categoryId;
    //     this.getCategoryList();
    //   },
    // },
  },
};
</script>

<style scoped lang="less">
.container {
  .swiper {
    position: relative;
    height: 2.96rem;
    .van-swipe-item {
      height: 100%;
      height: 2.96rem;
      img {
        width: 100%;
        height: auto;
      }
    }
  }
  // .header {
  //   margin-top: 20px;
  //   text-align: center;
  //   .title {
  //     font-size: 16px;
  //     color: #333;
  //     margin-bottom: 5px;
  //   }
  //   .desc {
  //     font-size: 12px;
  //     color: #999;
  //   }
  // }
  .goodsGrid {
    .gridList {
      .header {
        margin-top: 20px;
        text-align: center;
        .title {
          font-size: 16px;
          color: #333;
          margin-bottom: 5px;
        }
        .desc {
          font-size: 12px;
          color: #999;
        }
      }
      .content {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        .gridItem {
          margin-top: 20px;
          .img {
            background-color: #dfd7ce;
            position: relative;
            display: flex;
            flex-direction: column;
            img {
              height: 172px;
              width: 172px;
            }
            .picPrice {
              color: #fff;
              font: size 12px;

              .specialPrice {
                position: absolute;
                left: 0;
                bottom: 18px;
                text-align: center;
                background-color: #ed6d2a;
                font-weight: 400;
                padding: 0.05rem;
                border-top-right-radius: 0.26rem;
                width: 1.2rem;
              }
              .remainingTime {
                position: absolute;
                right: 0px;
                bottom: 0;
                width: 78%;
                height: 20px;
                line-height: 22px;
                background-color: #f38245;
              }
              .remaining {
                position: absolute;
                right: 0px;
                bottom: 0;
                padding-left: 3px;
                width: 100%;
                height: 18px;
                line-height: 22px;
                background-color: #9f8a60;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
              }
            }
          }
          &::after {
            content: "";
            width: 172px;
          }
          .desc {
            height: 20px;
            line-height: 20px;
            width: 172px;
            margin-top: 8px;
            color: #333;
            font-size: 14px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }
          .price {
            .currentPrice {
              color: #dd1a21;
              font-size: 16px;
            }
            .originPrice {
              color: #999;
              font-size: 12px;
              margin-left: 2px;
              text-decoration: line-through;
            }
          }
          .price2 {
            display: inline-block;
            text-align: center;
            margin-top: 3px;
            width: 30px;
            line-height: 15px;
            color: #dd1a21;
            background: hsla(0, 0%, 100%, 0.9);
            border: 1px solid #dd1a21;
            font-size: 12px;
            border-radius: 5rem;
          }
        }
      }
    }
  }
}
</style>
