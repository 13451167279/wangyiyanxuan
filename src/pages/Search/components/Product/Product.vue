<template>
  <div>
    <div class="nav">
      <ul class="navItem">
        <li class="comprehensive" @click="search">综合</li>
        <li @click="showList(true)" class="priceDesc">
          价格
          <div class="icon">
            <van-icon name="arrow-up" />
            <van-icon name="arrow-down" />
          </div>
        </li>
        <li @click="showList(false)" class="allCate">分类</li>
      </ul>

      <div v-if="showPrice" class="showPrice">
        <div class="choose">
          <div class="chooseText">筛选</div>
          <input type="text" placeholder="最低价" v-model="floorPrice" />
          <div>--</div>
          <input type="text" placeholder="最高价" v-model="upperPrice" />
        </div>
        <div class="desc">
          <div>排序</div>
          <div class="descText">从低到高</div>
          <div class="descText">从高到低</div>
        </div>
        <div class="foot">
          <div class="cancel">取消</div>
          <div class="determine">确定</div>
        </div>
      </div>
      <div v-if="showCate" class="showCate">
        <van-tag
          plain
          size="large"
          v-for="(cate, index) in categoryL1List"
          :key="cate.id"
          :style="{ color: defaultId === cate.id ? '#DD1A21' : '#7F7F7F' }"
          @click="changeCate(cate.id)"
          >{{ cate.name }}</van-tag
        >
      </div>
    </div>
    <!-- 产品 -->
    <div class="product">
      <van-grid :border="false" gutter="10px" :column-num="2">
        <van-grid-item
          class="productItem"
          v-for="(direct, index) in directlyList"
          :key="direct.id"
          @click="toDetail(direct.id)"
        >
          <div class="goods">
            <div class="hd">
              <div class="wraper">
                <img :src="direct.listPicUrl" alt="" />
              </div>
              <!-- 特价栏 -->
              <div class="promo" v-if="direct.listPromBanner">
                <div class="promoTitle">
                  <div class="activityTitle">
                    {{ direct.listPromBanner.promoTitle }}
                  </div>
                  <div class="promoSubTitle">
                    {{ direct.listPromBanner.promoSubTitle }}
                  </div>
                </div>
                <div class="time">{{ direct.listPromBanner.content }}</div>
              </div>
              <!-- 特价栏（描述） -->
              <div v-else class="simpleDesc">{{ direct.simpleDesc }}</div>
            </div>

            <div class="productName">{{ direct.name }}</div>
            <div class="price">
              <span class="">￥{{ direct.retailPrice }}</span>
              <span v-if="direct.counterPrice" class="oldPrice"
                >￥{{ direct.counterPrice }}</span
              >
            </div>
            <div class="tag">
              <span
                class="tagItem"
                v-for="(tagItem, index) in direct.itemTagList"
                :key="tagItem.tagId"
                >{{ tagItem.name }}</span
              >
            </div>

            <!-- 图片上的竖条产品描述 -->
            <div class="productPlace" v-if="direct.productPlace">
              {{ direct.productPlace }}
            </div>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: "Product",
  data() {
    return {
      showPrice: false,
      showCate: false,
      defaultId: 0,
      desc: true, //判断升序还是降序
      descStyle: false, //用来控制样式
      upperPrice: "",
      floorPrice: "",
    };
  },
  props: ["productList", "value"],
  computed: {
    directlyList() {
      return this.productList.directlyList || [];
    },
    categoryL1List() {
      return this.productList.categoryL1List || [];
    },
  },
  methods: {
    //点击综合按钮
    async search() {
      const result = await this.$API.search.search(this.value);
      //使用.sync语法实时更新组件数据，注意不可以在子组件更改父组件的数据
      this.$emit("update:productList", result.data);
    },
    //点击展示价格或分类
    showList(flag) {
      if (flag) {
        this.showPrice = !this.showPrice;
        this.showCate = false;
      } else {
        this.showCate = !this.showCate;
        this.showPrice = false;
      }
    },
    // 点击切换分类及重新发送请求
    async changeCate(cateId) {
      this.defaultId = cateId;
      // console.log(cateId)
      const result = await this.$API.search.searchCate({
        value: this.value,
        cateId,
      });
      //使用.sync语法实时更新组件数据，注意不可以在子组件更改父组件的数据
      this.$emit("update:productList", result.data);
    },

    // async changeCate(cateId) {
    //   this.defaultId = cateId;
    //   // console.log(cateId)
    //   const result = await this.$API.search.searchCate({
    //     __timestamp:  Date.now(),
    //     keyword: this.value,
    //     categoryId: cateId,
    //   });
    //   //使用.sync语法实时更新组件数据，注意不可以在子组件更改父组件的数据
    //   this.$emit("update:productList", result.data);
    // },

    //排序或降序
    // changeDesc(flag) {
    //
    // },
    //点击确定按钮
    // async order() {

    // },
    //点击商品跳转到详情页
    toDetail(itemId) {
      this.$router.push(`/detail?${itemId}`);
    },
  },
  mounted() {},
};
</script>

<style scoped lang="less">
.nav {
  .navItem {
    height: 40px;
    display: flex;
    > li {
      width: 121px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 15px;
      &.priceDesc {
        width: 133px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: red;
        .icon {
          display: flex;
          flex-direction: column;
          font-size: 12px;
          color: black;
        }
      }
    }
  }
  .showPrice {
    .choose {
      padding: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      > input {
        width: 135px;
        height: 28px;
        border: 1px solid #7f7f7f;
        text-align: center;
      }
    }
    .desc {
      padding: 15px;
      display: flex;
      // justify-content: flex-start;
      align-items: center;
      .descText {
        width: 104px;
        height: 28px;
        line-height: 28px;
        border: 1px solid #7f7f7f;
        text-align: center;
        margin-left: 12px;
      }
    }
    .foot {
      display: flex;
      > div {
        width: 185.5px;
        height: 52px;
        line-height: 52px;
        text-align: center;
        border-top: 1px solid #d9d9d9;
        &.determine {
          color: red;
        }
      }
      .cancel {
        border-right: 1px solid #d9d9d9;
      }
    }
  }
  .showCate {
    padding: 10px;
    .van-tag {
      margin: 5px;
    }
  }
}
.product {
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
    .hd {
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
      .promo,
      .promo .promotitle {
        border-bottom-left-radius: 2px;
        height: 28px;
        background-repeat: no-repeat;
      }

      .promo {
        background-image: url(https://yanxuan.nosdn.127.net/73de0050620397b41099c356292b28c8.png);
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        border-bottom-right-radius: 0.04rem;
        background-size: 100% 24px;
        background-position: bottom;
        .promotitle {
          background-image: url(https://yanxuan.nosdn.127.net/ce3597696f4c886d1d81a7d94f8cfe6e.png);
          max-width: 120px;
          background-size: auto 100%;
          background-position: right 0.5px;
          float: left;
          z-index: 1;
          border-top-left-radius: 2px;
          .activityTitle {
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
          .promoSubTitle {
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
        .time {
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
      .simpleDesc {
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
    .productName {
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
      .tagItem {
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
    .productPlace {
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
</style>
