<template>
  <div class="subCateList">
    <Header></Header>
    <!-- 滚动导航 -->
    <van-tabs v-model="activeIndex" @change="changeNavItem" swipeable>
      <van-tab :title="navItem.name" v-for="navItem in topNavList" :key="navItem.id"></van-tab>
    </van-tabs>
    <!-- 商品内容 -->
    <div class="itemListFloor">
      <!-- 标题 -->
      <header class="hd">
        <p class="desc">
          <span v-if="category.frontName" style="height: 13.5px; line-height: 14.5px;">{{category.frontName}}</span>
        </p>
      </header>
      <!-- 商品列表 -->
      <div class="goodsGrid">
        <van-grid :border="false" gutter='10px' :column-num="2">
          <van-grid-item v-for="item in itemList" :key="item.id">
            <div class="goods">
              <!-- 图片 -->
              <div class="goodsHd">
                <div class="wraper">
                  <img :src="item.listPicUrl" alt="">
                </div>
                <!-- 销售标签 判断数据是否渲染 -->
                <div class="saleAttr" v-if="item.listPromBanner">
                  <div class="saleTitle">
                    <div class="title">{{item.listPromBanner.promoTitle}}</div>
                    <div class="salePrice">￥{{item.listPromBanner.promoSubTitle}}</div>
                  </div>
                  <div class="desc">{{item.listPromBanner.content}}</div>
                </div>
                <div class="saleDesc" v-else>
                  {{item.simpleDesc}}
                </div>
              </div>
              <div class="name">{{item.name}}</div>
              <div class="price">
                <span class="">￥{{item.retailPrice}}</span>
                <span v-if="item.counterPrice" class="oldPrice">￥{{item.counterPrice}}</span>
              </div>
              <div v-if="item.itemTagList.length >0" class="tag">
                <span>{{item.itemTagList[0].name}}</span>
              </div>
              <div class="specColor" v-if="item.productPlace">
                {{item.productPlace}}
                <!-- <div>4</div>
                <div>色</div>
                <div>可</div>
                <div>选</div> -->
              </div>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 底部 -->
      <div class="m-statusbar">
        <div class="statusCnt">更多内容，敬请期待</div>
      </div>
    </div>

  </div>
</template>

<script>
import Header from '../../../components/Header'
import { mapGetters } from 'vuex'
export default {
  name: 'SubCateList',
  components: {
    Header,
  },
  data() {
    return {
      activeIndex: 0,
      query: {},
    }
  },
  mounted() {
    this.query = this.$route.query
    this.getSupCateInfo(this.query);
  },
  methods: {
    // 获取分类的商品
    getSupCateInfo(query) {
      this.$store.dispatch('reqSubCateInfo', query)
    },
    // 改变导航选项
    changeNavItem() {
      let currentCate = this.topNavList[this.activeIndex]
      // 重新跳转到分类列表页
      this.$router.push({
        path: '/subcateList',
        query: {
          categoryId: currentCate.superCategoryId,
          subCategoryId: currentCate.id,
          categoryType: currentCate.categoryType,
        }
      });
    }
  },
  computed: {
    ...mapGetters(['topNavList', 'category', 'itemList'])
  },
  watch: {
    $route: {
      handler(newValue) {
        this.getSupCateInfo(newValue.query)
      },
    }
  }

}
</script>

<style lang="less" scoped>
.subCateList {
  background-color: #eeeeee;
  height: 100%;

  .van-tabs {
    width: 100%;
    height: 30px;
    // position: relative;
    position: fixed;
    top: 43.5px;
    z-index: 999;
    &::after {
      content: "";
      width: 100%;
      height: 1px;
      background-color: #d9d9d9;
      bottom: 0;
      left: 0;
      position: absolute;
    }
    ::v-deep .van-tabs__wrap {
      height: 100%;
      .van-tabs__nav {
        height: 100%;
        padding-bottom: 0;

        .van-tabs__line {
          bottom: 0;
          height: 2px;
          width: 72px;
          background-color: #dd1a21;
        }
        .van-tab {
          display: flex;
          align-items: center;
          text-align: center;
          flex-shrink: 0;
          position: relative;
          margin-left: 24px;
          padding: 0;
          &:first-child {
            margin-left: 0;
          }
          > span {
            display: inline-block;
            padding: 0 8px;
            line-height: 30px;
            font-size: 14px;
            color: #333;
            text-align: center;
            font-family: PingFangSC-Light, helvetica, Heiti SC;
          }
        }
      }
    }
  }
  .itemListFloor {
    position: relative;
    top: 73.5px;
    .hd {
      margin-top: 10px;
      height: 55px;
      background-color: #fff;
      line-height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      .desc {
        color: #333;
        font-size: 14px;
        font-family: PingFangSC-Light, helvetica, Heiti SC;
      }
    }
    .goodsGrid {
      background-color: #fff;
      .van-grid {
        ::v-deep .van-grid-item {
          .van-grid-item__content {
            padding: 0;
            // -webkit-justify-content:
            justify-content: space-between;
          }
        }
      }
      .goods {
        width: 100%;
        .goodsHd {
          border-radius: 2px;
          position: relative;
          z-index: 0;
          background-color: #f4f4f4;
          .wraper {
            position: relative;
            padding-bottom: 113%;
            img {
              position: absolute;
              display: block;
              width: 173px;
              height: 173px;
              border-radius: 2px 2px 0 0;
              background-color: #f4f4f4;
            }
          }
          .saleAttr,
          .saleAttr .saleTitle {
            border-bottom-left-radius: 2px;
            height: 28px;
            background-repeat: no-repeat;
          }
          .saleAttr {
            background-image: url(https://yanxuan.nosdn.127.net/73de0050620397b41099c356292b28c8.png);
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            border-bottom-right-radius: 0.04rem;
            background-size: 100% 24px;
            background-position: bottom;
            .saleTitle {
              background-image: url(https://yanxuan.nosdn.127.net/ce3597696f4c886d1d81a7d94f8cfe6e.png);
              max-width: 120px;
              background-size: auto 100%;
              background-position: right 0.5px;
              float: left;
              z-index: 1;
              border-top-left-radius: 2px;
              .title {
                font-size: 9px;
                color: #fff;
                font-weight: 700;
                height: 15px;
                line-height: 15px;
                overflow: hidden;
                white-space: nowrap;
                text-align: center;
                margin-top: 1px;
                padding-top: 0;
                font-family: PingFangSC-Regular;
                margin-left: 5px;
                margin-right: 11px;
                text-overflow: ellipsis;
              }
              .salePrice {
                font-size: 11px;
                color: #fff;
                height: 20px;
                line-height: 19px;
                margin-left: 2px;
                margin-top: -4px;
                text-align: center;
                white-space: nowrap;
                font-weight: 700;
                padding-left: 5px;
                padding-right: 11px;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
            .desc {
              font-family: PingFangSC-Regular;
              color: #fff;
              text-align: left;
              overflow: hidden;
              height: 24px;
              line-height: 24px;
              font-size: 10px;
              margin-left: 2px;
              margin-top: 4px;
              text-overflow: ellipsis;
              white-space: nowrap;
              padding-left: 3px;
            }
          }
          .saleDesc {
            position: absolute;
            bottom: 0;
            width: 100%;
            background: #f1ece2;
            border-radius: 0 0 2px 2px;
            font-size: 12px;
            color: #9f8a60;
            letter-spacing: 0;
            line-height: 18px;
            padding: 3px 5px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
        .name {
          margin-top: 8px;
          line-height: 20px;
          text-align: left;
          font-size: 14px;
          text-overflow: ellipsis;
          overflow: hidden;
          color: #333;
          font-family: PingFangSC-Regular;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          word-break: break-all;
        }
        .price {
          font-size: 16px;
          line-height: 24px;
          text-align: left;
          color: #dd1a21;
          font-family: PingFangSC-Regular;
          .oldPrice {
            font-size: 12px;
            color: #999;
            text-decoration: line-through;
            margin-left: 5px;
            line-height: 18px;
          }
        }
        .tag {
          width: 100%;
          z-index: 1;
          margin: 2px 0 10px;
          height: 16.5px;
          overflow: hidden;
          > span {
            margin: 0 0 4px 0;
            height: 15px;
            padding: 0 4px;
            line-height: 15px;
            text-align: center;
            color: #dd1a21;
            background: hsla(0, 0%, 100%, 0.9);
            border: 1px solid #dd1a21;
            font-size: 9px;
            border-radius: 7.5px;
            display: inline-block;
            vertical-align: top;
            white-space: nowrap;
          }
        }
        .specColor {
          position: absolute;
          top: 5px;
          left: 5px;
          width: 16px;
          color: #b4a078;
          border: 1px solid #b4a078;
          background-color: #f4f4f4;
          border-radius: 5px;
          display: flex;
          flex-direction: column;
          padding: 6px 0;
          text-align: center;
        }
      }
    }
  }
  .m-statusbar {
    height: 48px;
    background-size: 100%;
    line-height: 48px;
    text-align: center;
    background-color: #eee;
    .statusCnt {
      display: inline-block;
      height: 18px;
      line-height: 18px;
      font-size: 12px;
      color: #999;
      position: relative;
      padding-left: 24px;
    }
  }
}
</style>
