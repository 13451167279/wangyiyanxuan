<template>
  <div class="cartBox">
    <van-sticky :offset-top="0">
      <div class="header">
        <span class="title">购物车</span>
        <div class="ticket">领券</div>
        <div class="edit" @click="edit = !edit">编辑</div>
      </div>
    </van-sticky>
    <ul class="textList">
      <li class="textItem">30天无忧退货</li>
      <li class="textItem">48小时快速退款</li>
      <li class="textItem">满99元免邮费</li>
    </ul>
    <div class="togoodsList">
      <div class="title">
        <span class="hg">全场换购</span>
        <span class="content">已满足111199元享低至3.3元超值换购</span>
        <span class="togoods">再逛逛</span>
      </div>
      <div class="tohg">
        <span class="title">去换购商品</span>
        <van-icon class="iconfont" name="arrow" />
      </div>
    </div>
    <div class="shopList">
      <div class="shopItem" v-for="(cart, index) in shopCartList" :key="index">
        <ul class="goodsList">
          <li
            class="goodsItem"
            v-for="cartInfo in cart.cartInfoList"
            :key="cartInfo.id"
          >
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked"
              @click="updateOneIsCheck(cartInfo)"
            />
            <div class="goods">
              <img class="goodsImg" :src="cartInfo.imgUrl" />
              <div class="goodsInfo">
                <span class="goodsName">{{ cartInfo.skuName }}</span>
                <span class="goodsTag">牛奶白；均码；牛奶白；</span>
                <van-icon class="iconfont" name="arrow-down" />
                <div class="priceBtn">
                  <span class="price">￥{{ cartInfo.cartPrice }}</span>
                  <van-stepper
                    :value="cartInfo.skuNum"
                    @change="
                      changeNum($event.value * 1 - cartInfo.skuNum, cartInfo)
                    "
                    @plus="changeNum(1, cartInfo)"
                    @minus="changeNum(-1, cartInfo)"
                  />
                </div>
              </div>
            </div>
            
            <div class="shopName">
              <van-icon class="iconfont" name="wap-home" />
              <span class="name">自营仓商品满99免邮</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="k"></div>
    <van-submit-bar v-if="edit" :price="allMoney*100" button-text="提交订单">
      <van-checkbox v-model="isCheckAll">已选({{ checkedNum }})</van-checkbox>
    </van-submit-bar>
    <van-submit-bar
      button-color="#666"
      v-else
      :price="allMoney*100"
      button-text="删除所选"
      @submit="deleteAll"
    >
      <van-checkbox v-model="isCheckAll">已选({{ checkedNum }})</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Cart",
  data() {
    return {
      value: 1,
      checked: true,
      edit: true,
    };
  },
  mounted() {
    this.getShopCartList();
  },
  methods: {
    getShopCartList() {
      this.$store.dispatch("getShopCartList");
    },

    // 修改购物车的数量
    async changeNum(disNum, cartInfo) {
      if (disNum + cartInfo.skuNum < 1) {
        disNum = 1 - cartInfo.skuNum;
      }
      try {
        await this.$store.dispatch("addOrUpdateShopCart", {
          skuId: cartInfo.skuId,
          skuNum: disNum,
        });
        this.$toast.success("修改购物车数量成功");

        this.getShopCartList();
      } catch (error) {
        this.$toast.success("修改购物车数量成功");
      }
    },
    //点击修改单个的购物车选中状态
    async updateOneIsCheck(cartInfo) {
      try {
        await this.$store.dispatch("updateOneIsCheck", {
          skuId: cartInfo.skuId,
          isChecked: cartInfo.isChecked ? 0 : 1,
        });
        this.$toast.success("修改单个状态成功");
        this.getShopCartList();
      } catch (error) {
        this.$toast.success("修改单个状态成功");
      }
    },
    // 删除单个购物车
    async deleteOne(cartInfo) {
      try {
        await this.$store.dispatch("deleteOneCart", cartInfo.skuId);
        this.$toast.success("删除单个成功");
        this.getShopCartList();
      } catch (error) {
        this.$toast.fail("删除单个失败");
      }
    },
    // 删除多个购物车
    async deleteAll() {
      // console.log(111111111);
      let skuIdList = [];
      this.shopCartList.forEach((item) => {
        item.cartInfoList.forEach((item1) => {
          if (item1.isChecked) {
            skuIdList.push(item1.skuId);
          }
        });
      });

      try {
        await this.$store.dispatch("deleteAllCart", skuIdList);
        this.$toast.success("删除多个成功");
        this.getShopCartList();
      } catch (error) {
        this.$toast.fail("删除多个失败");
      }
    },
  },
  computed: {
    ...mapState({
      shopCartList: (state) => state.cart.shopCartList,
    }),
    checkedNum() {
      return this.shopCartList.reduce((prev, item) => {
        prev += item.cartInfoList.reduce((prev1, item1) => {
          if (item1.isChecked) {
            prev1 += item1.skuNum;
          }
          return prev1;
        }, 0);
        return prev;
      }, 0);
    },
    allMoney() {
      return this.shopCartList.reduce((prev, item) => {
        prev += item.cartInfoList.reduce((prev1, item1) => {
          if (item1.isChecked) {
            prev1 += item1.skuNum * item1.cartPrice;
          }
          return prev1;
        }, 0);
        return prev;
      }, 0);
    },

    isCheckAll: {
      get() {
        return (
          this.shopCartList.every((item) =>
            item.cartInfoList.every((item1) => item1.isChecked)
          ) && this.shopCartList.length > 0
        );
      },
      async set(val) {
        let isChecked = val ? 1 : 0;
        let skuIdList = [];
        this.shopCartList.forEach((item) => {
          item.cartInfoList.forEach((item1) => {
            if (item1.isChecked !== isChecked) {
              skuIdList.push(item1.skuId);
            }
          });
        });
        try {
          await this.$store.dispatch("updateAllIsCheck", {
            isChecked,
            skuIdList,
          });
          this.$toast.success("修改多个购物车状态成功");
          this.getShopCartList();
        } catch (error) {
          this.$toast.fail("修改多个购物车状态失败");
        }
      },
    },
  },
};
</script>

<style lang="less">
.cartBox {
  width: 100%;
  height: 600px;
  background: #eeeeee;
  .header {
    height: 40px;
    background: #fff;
    display: flex;
    align-items: center;
    padding: 0 20px;
    .title {
      font-size: 18px;
      flex: 1;
    }
    .ticket {
      font-size: 12px;
      margin-right: 20px;
      padding: 3px 6px;
      position: relative;
      color: #fff;
      background-image: linear-gradient(to right, #fd6560, hsl(24, 96%, 68%));
      &::after {
        width: 6px;
        height: 6px;
        position: absolute;
        top: 6px;
        left: -4px;
        background: #fff;
        display: block;
        content: "";
        border-radius: 50%;
      }
      &::before {
        width: 6px;
        height: 6px;
        position: absolute;
        top: 6px;
        right: -4px;
        background: #fff;
        display: block;
        content: "";
        border-radius: 50%;
      }
    }
    .edit {
      font-size: 14px;
    }
  }
  .textList {
    width: 100%;
    height: 40px;
    background: #eeeeee;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    .textItem {
      color: #666;
    }
  }
  .togoodsList {
    width: 100%;
    height: 80px;
    background: #fff;
    align-items: center;
    margin-bottom: 15px;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    .title {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      .hg {
        background: #fc845f;
        color: #fff;
        padding: 2px;
        font-size: 12px;
      }
      .content {
        font-size: 13px;
      }
      .togoods {
        color: #dd1a61;
      }
    }
    .tohg {
      display: flex;
      justify-content: space-between;
      width: 90%;
      height: 40%;
      background: #fff8f7;
      align-items: center;
    }
  }
  .shopList {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .shopItem {
      display: flex;
      flex-direction: column;
      position: relative;
      margin-bottom: 20px;
      .goodsList {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .goodsItem {
          height: 160px;
          background: #fff;
          padding: 0 20px;
          border-bottom: 1px solid #eee;
          display: flex;
          align-items: center;

          .goods {
            display: flex;
            align-items: center;
            height: 130px;
            margin-left: 20px;
            .goodsImg {
              width: 100px;
              height: 100px;
              border-radius: 5px;
              margin-right: 10px;
            }
            .goodsInfo {
              display: flex;
              flex-direction: column;
              position: relative;
              .goodsName {
                font-size: 13px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1; /** 多行文本溢出...*/
                overflow: hidden;
              }
              .goodsTag {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1; /** 多行文本溢出...*/
                overflow: hidden;
                background: rgb(248, 247, 247);
                width: 200px;
                border: 1px solid #eee;
                padding-right: 10px;
                box-sizing: border-box;
              }
              .iconfont {
                position: absolute;
                top: 42px;
                right: 10px;
              }
              .priceBtn {
                display: flex;
                margin-top: 10px;
                .price {
                  flex: 1;
                }
              }
            }
          }
          .shopName {
            position: absolute;
            bottom: 15px;
            left: 50px;
            color: #666;
            .iconfont {
              color: #73a5e4;
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
  .end {
    height: 50px;
    background: #fff;
    display: flex;
    padding: 0 20px;
    align-items: center;
    .checkbox {
      flex: 1;
      .chooseAll {
        margin-right: 10px;
      }
    }
    .allPrice {
      color: #df1a61;
      font-size: 15px;
      margin-right: 10px;
    }
    .buy {
      width: 100px;
      height: 100%;
      background: #dd1a21;
      color: #fff;
      font-size: 16px;
      text-align: center;
      line-height: 50px;
    }
  }
  .k {
    height: 100px;
  }
  .van-submit-bar {
    margin-bottom: 50px !important;
  }
}
</style>
