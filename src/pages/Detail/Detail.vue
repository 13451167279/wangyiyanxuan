<template>
  <div class="detailBox">
    <Header />
    <van-swipe class="banner" @change="onChange">
      <van-swipe-item class="bannerItem" v-for="img in imageList" :key="img.id">
        <img class="bannerImg" :src="img.imgUrl" />
      </van-swipe-item>

      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }}/4</div>
      </template>
    </van-swipe>
    <h1 class="price">￥{{ goodsInfo.price }}</h1>
    <div class="goodsInfo">
      <span class="name">{{ skuInfo.skuName }}</span>
      <div class="logo">
        <div class="logoName">网易严选</div>
        <div class="hp">
          <span class="num">98.8%</span>
          <span class="text">好评率</span>
        </div>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="tj">
      <span class="title">推荐理由</span>
      <div class="reason">
        <div class="reasonItem">
          <span class="num">1</span>
          <span class="contentText">不起球好穿</span>
        </div>
        <div class="reasonItem">
          <span class="num">2</span>
          <span class="contentText">不起球非常好穿</span>
        </div>
      </div>
    </div>
    <div class="type">
      <div class="typeItem">
        <span class="text">邮费：满99元免保邮，邮费8元</span>
        <van-icon name="arrow" />
      </div>
      <div class="typeItem">
        <span class="text">促销：全场换购，超值换购</span>
        <van-icon name="arrow" />
      </div>
      <div class="typeItem">
        <span class="text">返利：最高返
          <p>12积分</p>
        </span>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="tag">
      <div class="typeItem">
        <span class="text">已选择：白色XLx1</span>
        <van-icon name="arrow" />
      </div>
      <div class="typeItem">
        <div class="text">
          配送：
          <span class="address">请选择配送地址</span>
        </div>
        <van-icon name="arrow" />
      </div>
      <div class="typeItem">
        <span class="text">服务：
          <div class="title">
            <span class="titleItem">网易严选自营</span>
            <span class="titleItem">30天无忧退换</span>
          </div>
        </span>

        <van-icon name="arrow" />
      </div>
    </div>
    <img class="centerImg" :src="skuInfo.skuDefaultImg" />
    <div class="content">
      <div class="title">
        <span class="left">用户评价(2121)</span>
        <span class="right">98.9%</span>
        好评率
        <van-icon name="arrow" />
      </div>
      <div class="main">
        <div class="avatar">
          <img src="@/assets/images/avatar.png" />
          <div class="name">ddddd</div>
        </div>
        <span class="typeName">2019-05-30 00:13:46 黑色;s</span>
        <p>很合身，衣服有点紧</p>
      </div>
    </div>
    <div class="goodsType">
      <div class="goodsTypeItem">
        <span class="title">商品参数</span>
        <div class="typeItem" v-for="spu in spuSaleAttrList" :key="spu.id">
          <span class="left">{{ spu.saleAttrName }}</span>
          <span class="right" v-for="spuItem in spu.spuSaleAttrValueList" :key="spuItem.id">{{ spuItem.saleAttrValueName }}</span>
        </div>
      </div>
    </div>
    <div class="end">
      <img v-for="img in imageList" :key="img.id" :src="img.imgUrl" />
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addCar" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
    <van-sku v-model="show" :sku="sku" :goods="goods" :goods-id="skuInfo.id" :quota="0" :quota-used="100" @buy-clicked="onBuyClicked" @add-cart="onAddCartClicked" />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "Detail",
  data() {
    return {
      current: 0,
      skuIdArr: [7, 5423, 12, 5422, 15, 6, 5, 10, 2, 5616, 5595],
      show: false,
      sku: {},
      goods: {
        picture: "",
      },
      skuId: '',
      skuNum: '',
    };
  },
  //  beforeMount() {
  //   this.skuId = this.$route.params.skuId;
  // },
  mounted() {
    this.getGoodsInfo();
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    getGoodsInfo() {
      let skuId = this.skuIdArr[
        Math.floor(Math.random() * this.skuIdArr.length)
      ];
      this.skuId = skuId;
      this.$store.dispatch("getUserInfo", skuId);
    },
    addCar() {
      this.goods.picture = this.imageList[0].imgUrl;
      this.sku = {
        tree: [
          {
            k: "颜色", // skuKeyName：规格类目名称
            k_s: "1111", // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            v: [
              {
                id: "1", // skuValueId：规格值 id
                name: "黄色", // skuValueName：规格值名称
              },
              {
                id: "2", // skuValueId：规格值 id
                name: "蓝色", // skuValueName：规格值名称
              },
            ],
            largeImageMode: false, //  是否展示大图模式
          },
        ],
        list: [
          {
            id: "1111", // skuId
            s1: "1", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "2", // 规格类目 k_s 为 s2 的对应规格值 id
            price: 100, // 价格（单位分）
            stock_num: 1100, // 当前 sku 组合对应的库存
          },
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        stock_num: 227,
        collection_id: "1111",
        none_sku: true,
        price: this.goodsInfo.price, // 默认价格（单位元）
      };
      this.show = true;
    },
    onBuyClicked(event) {
      console.log(event);
    },
    async onAddCartClicked(event) {
      // console.log(event);
      this.skuNum = event.selectedNum;
      //先发请求
      try {
        await this.$store.dispatch('addOrUpdateShopCart', { skuId: this.skuId, skuNum: this.skuNum })
        //成功之后跳转到添加购物车成功页面
        // alert('添加购物车成功，自动跳转到添加成功页面')
        this.$toast.success("添加购物车成功");

        sessionStorage.setItem('skuInfo_key', JSON.stringify(this.skuInfo))


        this.$router.push('/cart?skuNum=' + this.skuNum)
      } catch (error) {
        // 失败之后提示添加失败
        // alert('添加购物车失败' + error.message)
        this.$toast.fail("添加购物车失败");
      }
    },
  },
  computed: {
    ...mapState({ goodsInfo: (state) => state.detail.goodsInfo }),
    ...mapGetters(["categoryView", "skuInfo", "spuSaleAttrList"]),
    imageList() {
      return this.skuInfo.skuImageList || [];
    },
  },
};
</script>

<style lang="less" scoped>
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}
.detailBox {
  height: 100%;
  .banner {
    height: 370px;
    .bannerItem {
      .bannerImg {
        height: 100%;
        width: 100%;
      }
    }
  }
  .price {
    font-size: 28px;
    font-weight: bolder;
    color: #dd1a21;
    margin-top: 10px;
    padding: 0 10px;
  }
  .goodsInfo {
    margin-top: 10px;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    .name {
      font-size: 18px;
      font-weight: bolder;
      margin-bottom: 10px;
    }
    .logo {
      display: flex;
      align-items: center;
      .logoName {
        color: #666;
        flex: 1;
      }
      .hp {
        display: flex;
        flex-direction: column;
        .num {
          color: #dd1a21;
          font-size: 15px;
          font-weight: bolder;
        }
        .text {
          color: #666;
          margin-top: 5px;
        }
      }
    }
  }
  .tj {
    padding: 0 10px;
    .title {
      color: #666;
    }
    .reason {
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      background: #fafafa;
      border: 1px solid #eaeaea;
      padding: 5px 0;
      .reasonItem {
        padding: 5px 10px;
        // display: flex;
        .num {
          color: #dd1a21;
          border: 1px solid #dd1a21;
          border-radius: 50%;
          padding: 0 3px;
          font-weight: bolder;
        }
      }
    }
  }
  .type {
    margin-top: 20px;
    &::before {
      content: "";
      background: #eeeeee;
      height: 10px;
      display: block;
    }
    .typeItem {
      padding: 15px 10px;
      border-bottom: 1px solid #eee;
      display: flex;
      .text {
        font-size: 15px;
        flex: 1;
        p {
          color: #dd1a21;
          display: inline;
        }
      }
    }
    &::after {
      content: "";
      background: #eeeeee;
      height: 10px;
      display: block;
    }
  }
  .tag {
    margin-top: 20px;
    .typeItem {
      padding: 15px 10px;
      border-bottom: 1px solid #eee;
      display: flex;
      .text {
        font-size: 15px;
        flex: 1;
        display: flex;
        .address {
          color: #666;
          font-size: 13px;
        }

        p {
          color: #dd1a21;
          display: inline;
        }
        .title {
          .titleItem {
            color: #666;
            font-size: 13px;
            margin-right: 10px;
          }
        }
      }
    }
    &::after {
      content: "";
      background: #eeeeee;
      height: 10px;
      display: block;
    }
  }
  .centerImg {
    width: 100%;
    height: 100px;
  }
  .content {
    &::before {
      content: "";
      background: #eeeeee;
      height: 10px;
      display: block;
    }
    .title {
      padding: 20px 10px;
      display: flex;
      .left {
        flex: 1;
        font-size: 13px;
      }
      .right {
        font-size: 13px;
        color: #dd1a21;
      }
    }
    .main {
      padding: 0 10px;
      .avatar {
        display: flex;
        align-items: center;
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        .name {
          font-size: 13px;
          margin-left: 10px;
        }
      }
      .typeName {
        color: #666;
        padding: 10px 0;
        display: block;
      }
      p {
        font-size: 14px;
        padding-bottom: 20px;
      }
    }
  }
  .goodsType {
    display: flex;
    flex-direction: column;
    &::before {
      content: "";
      background: #eeeeee;
      height: 10px;
      display: block;
    }
    .goodsTypeItem {
      padding: 10px 10px;
      height: 50px;
      .title {
        font-size: 15px;
        line-height: 50px;
      }
      .typeItem {
        display: flex;
        border-top: 1px dashed #666;
        height: 50px;
        line-height: 50px;
        .left {
          color: #666;
          font-size: 13px;
          width: 30%;
        }
        .right {
          font-size: 13px;
          width: 70%;
        }
      }
    }
  }
  .end {
    width: 100%;
    padding-top: 150px;
    padding-bottom: 50px;
    // background: #dd1a21;
    img {
      width: 100%;
    }
  }
}
</style>
