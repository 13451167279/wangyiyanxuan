<template>
  <div>
    <img v-if="!HomeList" style="width:100%;" src="https://yanxuan-static.nosdn.127.net/hxm/yanxuan-node-wap/style/img/skeleton/index-c93cde177f7c39a2f4c1.png" alt="">
    <div v-if="HomeList" class="container">
      <div v-if="isCloseState" class="statement">仅作为个人练习<span @click="isCloseState = false"></span></div>
      <!-- 首页头部 -->

      <div class="header">
        <a href="javascript:;" class="logo"></a>
        <div class="search" @click="toSearch">
          <i class="icon"></i>
          <span class="placeholder">搜索商品, 共{{totalNumber}}款好物</span>
        </div>
        <button class="login" @click="toLogin">登录</button>
      </div>
      <!-- 横向滚动栏 -->
      <div>
        <van-tabs class="tabWrap" line-height="2px" @click="toOther">
          <van-tab class="tabItem" title="推荐"></van-tab>
          <van-tab class="tabItem" v-for="(item,index) in globalList" :title="item.name" :key="index" :name="item.id"></van-tab>
          <div class="toggle iconfont" :class="{ 'icon-tubiao-': !isShow, 'icon-shangla': isShow }" @click="isShow = !isShow">
          </div>
        </van-tabs>
        <div class="tabList" v-if="isShow">
          <div class="title">全部频道</div>
          <div class="tabItem">
            <div class="item" :class="[categoryId===0?'active':'']" @click="isShow=!isShow">推荐</div>
            <div class="item" v-if="item.id" v-for="(item,index) in globalList" :class="[categoryId===item.id?'active':'']" :key="index" @click="toOther(item.id)">{{item.name}}</div>
          </div>
        </div>
        <home-cate v-if="categoryId !==0" :bannerList="bannerList" :categoryItemList="categoryItemList"></home-cate>
        <div v-if="categoryId===0">
          <!-- 轮播图 -->
          <van-swipe class="swiper" :autoplay="6000" indicator-color="white" v-if="focusList">
            <van-swipe-item v-for="(focus,index) in focusList" :key="index">
              <img :src="focus.picUrl" alt="">
            </van-swipe-item>
          </van-swipe>
          <!-- 三个图标 -->
          <van-row class="growList">
            <van-col class="grow" span="8">
              <img class="iconfont" src="../../assets/images/1.png" alt="">
              <span>网易自营品牌</span>
            </van-col>
            <van-col class="grow" span="8">
              <img class="iconfont" src="../../assets/images/2.png" alt="">
              <span>30天无忧退货</span>
            </van-col>
            <van-col class="grow" span="8">
              <img class="iconfont" src="../../assets/images/3.png" alt="">
              <span>48小时快速退款</span>
            </van-col>
          </van-row>
          <!-- 二乘五宫格 -->
          <van-grid :column-num="5" class="grid" :border="false">
            <van-grid-item class="gridItem" v-for="(KingKong,index) in kingKongList" :key="index">
              <img :src="KingKong.picUrl" alt="">
              <div class="title">{{KingKong.text}}</div>
            </van-grid-item>
          </van-grid>
          <!-- 新人专享礼模块 -->
          <!-- <lazy-component> -->
          <div class="freshmanModule">
            <div class="moduleTitle">新人专享礼</div>
            <div class="content">
              <div class="left">
                <div class="name">新人专享礼包</div>
                <img src="https://yanxuan.nosdn.127.net/352b0ea9b2d058094956efde167ef852.png" alt="" />
              </div>
              <div class="right">
                <div class="module1" v-for="(indexActivity,index) in indexActivityList" :key="index">
                  <div class="cnt">
                    <div class="title">{{indexActivity.title}}</div>
                    <div class="desc" v-if="indexActivity.subTitle">{{indexActivity.subTitle}}</div>
                    <div class="desc" v-if="indexActivity.tag">{{indexActivity.tag}}</div>
                  </div>
                  <div class="goods">
                    <img class="goodsImg" :src="indexActivity.picUrl" alt="" />
                    <div class="priceDiv">
                      <span class="price">{{indexActivity.activityPrice}}</span>
                      <span class="priceOrigin">{{indexActivity.originPrice}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- </lazy-component> -->
          <div class="dividerLine"></div>
          <!-- 类目热销榜 -->
          <div class="categoryHotSellModule" v-if="categoryHotSellInfo">
            <div class="moduleTitle">{{categoryHotSellInfo.title}}</div>
            <div class="content">
              <div class="line1">
                <div class="left" v-for="category in categoryList.slice(0,1)" :key="category.categoryName">
                  <span class="name">{{category.categoryName}}</span>
                  <img :src="category.picUrl" alt="" />
                </div>
                <div class="right" v-for="(category,index) in categoryList.slice(1,2)" :key="index">
                  <span class="name">{{category.categoryName}}</span>
                  <img :src="category.picUrl" alt="" />
                </div>
              </div>
              <div class="line2">
                <div class="item" v-for="(category,index) in categoryList.slice(2)" :key="index">
                  <div class="name">{{category.categoryName}}</div>
                  <img :src="category.picUrl" alt="" />
                </div>
              </div>
            </div>
          </div>

          <div class="dividerLine"></div>
          <!-- 特卖商品 -->
          <div class="onSaleGuide">
            <div class="left" v-for="(sceneLightShopping,index) in sceneLightShoppingGuideModule" :key="index">
              <span class="title">{{sceneLightShopping.styleItem.title}}</span>
              <span class="desc">{{sceneLightShopping.styleItem.desc}}</span>
              <div class="descImg" v-for="(url,index) in sceneLightShopping.styleItem.picUrlList" :key="index">
                <!-- <img src="https://yanxuan-item.nosdn.127.net/cc30fc286cf3c705e71411911cc27926.png?quality=75&type=webp&imageView&thumbnail=150x150" alt=""> -->
                <img :src="url" alt="" />
              </div>
            </div>
          </div>

          <div class="dividerLine"></div>

          <!-- 底部 -->
          <div class="footer">
            <div class="footerBtn">
              <div class="download">下载APP</div>
              <div class="toggle">电脑版</div>
            </div>
            <p>网易公司版权所有 © 1997-</p>
            <p>食品经营许可证：JY13301080111719</p>
          </div>
          <div style="height:35px;"></div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import HomeCate from './Homecate'
import { mapState, mapGetters } from 'vuex'
export default {
  name: "Home",
  components: { HomeCate },
  data() {
    return {
      keywords: "",
      categoryId: 0,
      isShow: false,
      isCloseState: true,
    };
  },
  created() {
    this.getHomeList();
    this.getGlobalList();
    this.getTotalNumber();
  },
  methods: {
    //获取总商品数量请求
    getTotalNumber() {
      this.$store.dispatch('reqTotalNumber');
    },
    toSearch() {
      this.$router.push('/search')
    },
    getHomeList() {
      this.$store.dispatch("getHomeList");
    },
    getGlobalList() {
      this.$store.dispatch("getGlobalList")
    },
    onSearch(event) {

    },
    toLogin() {
      this.$router.push("/login");
    },
    toOther(id) {
      this.categoryId = id;
      let index = this.globalList.findIndex(item => item.id === id)
      this.$router.push(`/homecate?categoryId=${id}&index=${index}`);
    },
    getCategoryList() {
      if (this.categoryId == 0) return;
      this.$store.dispatch("getCategoryList", this.categoryId);
    },
  },
  watch: {
    $route: {
      handler(newValue) {
        this.getCategoryList()
        this.getTotalNumber();
        this.getGlobalList();
      },

    },
  },
  computed: {
    ...mapState({ HomeList: (state) => state.home.HomeList.data }),
    ...mapState({
      totalNumber: state => state.category.totalNumber
    }),
    ...mapGetters(['globalList']),
    floorList() {
      return ((this.HomeList || {}).bigPromotionModule || []).floorList
    },
    categoryHotSellInfo() {
      return (this.HomeList || {}).categoryHotSellModule
    },
    categoryList() {
      return this.categoryHotSellInfo.categoryList
    },
    focusList() {
      return (this.HomeList || {}).focusList
    },
    kingKongList() {
      return ((this.HomeList || {}).kingKongModule || []).kingKongList
    },
    indexActivityList() {
      return (this.HomeList || {}).indexActivityModule
    },
    sceneLightShoppingGuideModule() {
      return (this.HomeList || {}).sceneLightShoppingGuideModule
    },
    ...mapState({ categoryInfo: (state) => state.home.categoryInfo }),
    bannerList() {
      return (this.categoryInfo.currentCategory || {}).bannerList;
    },
    categoryItemList() {
      return this.categoryInfo.categoryItemList;

    },
  }
}
</script>

<style lang="less" scoped>
.container {
  position: relative;
  // height:1710px;
  .statement {
    position: absolute;
    line-height: 0.8rem;
    text-align: center;
    left: 50%;
    transform: translateX(-50%);
    background: #fa3c3c;
    opacity: 0.8;
    color: #fff;
    width: 100%;
    height: 0.8rem;
    > span {
      position: absolute;
      border-radius: 50%;
      background: #333;
      right: 0;
      width: 0.5rem;
      height: 0.5rem;
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        height: 0.4rem;
        border-left: 2px solid #fff;
        transform: translate(-50%, -50%) rotate(-45deg);
      }
      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        height: 0.4rem;
        border-left: 2px solid #fff;
        transform: translate(-50%, -50%) rotate(45deg);
      }
    }
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #ffffff;
    padding: 0.16rem 0.3rem;
    .logo {
      background: url("~@/assets/images/sprite.png") no-repeat;
      vertical-align: middle;
      width: 69px;
      height: 20px;
      background-size: 3.76rem 3.76rem;
      background-position: -1.26rem -2.52rem;
      display: inline-block;
      margin-right: 0.2rem;
    }
    .search {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      height: 0.56rem;
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
        width: 0.28rem;
        height: 0.28rem;
        margin-right: 0.1rem;
        background: url("../../assets/images/category/bg.png") no-repeat -70px -28px;
        display: inline-block;
        vertical-align: middle;
        background-size: 119px 101.5px;
        // position: absolute;
        top: 50%;
      }
      .placeholder {
        color: #666;
        font-size: 13px;
      }
    }
    .login {
      width: 37px;
      height: 20px;
      margin-left: 0.2rem;
      line-height: 20px;
      text-align: center;
      font-size: 12px;
      border-radius: 5px;
      background-color: white;
      border: 1px solid #dd1a21;
      color: #dd1a21;
    }
  }
  .tabWrap {
    height: 30px;
    /deep/.van-tabs__wrap {
      width: calc(100% - 50px);
    }
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      border-bottom: 1px solid #d9d9d9;
      bottom: 1px;
    }
    /deep/ .van-tabs__wrap {
      height: 30px;
    }
    /deep/.van-tabs__nav--line.van-tabs__nav--complete {
      padding-bottom: 0;
    }
    /deep/.van-tabs__line {
      display: none;
    }
    /deep/ .van-tab--active {
      color: #dd1a21;
      &::after {
        content: "";
        position: absolute;
        width: 100%;
        border-bottom: 1px solid #dd1a21;
        bottom: 2px;
      }
    }
    .toggle {
      text-align: center;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 900;
      width: 50px;
      height: 30px;
      font-size: 24px;
      line-height: 30px;
      color: rgba(57, 45, 45, 0.6);
      background-color: #fff;
    }
  }
  .tabList {
    position: absolute;
    left: 0;
    top: 45px;
    background-color: #fff;
    z-index: 800;
    .title {
      height: 45px;
      line-height: 45px;
      font-size: 16px;
      margin-left: 14px;
    }
    .tabItem {
      margin-top: 6px;
      text-align: center;
      .item {
        float: left;
        height: 30px;
        width: 19%;
        line-height: 30px;
        font-size: 12px;
        margin-left: 18px;
        margin-bottom: 20px;
        border: 1px solid #ccc;
        box-sizing: border-box;
        border-radius: 2px;
        background-color: #fafafa;
        &.active {
          border: 1px solid #dd1a21;
          color: #dd1a21;
        }
      }
    }
    /deep/.right {
      margin-right: 60px;
    }
  }
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
  /deep/.van-swipe__indicator {
    width: 0.4rem;
    height: 0.04rem;
    background-color: #ebedf0;
    border-radius: 0;
  }
  .growList {
    margin-top: 10px;
    text-align: center;
    .grow {
      .iconfont {
        display: inline-block;
        height: 0.36rem;
        width: 0.36rem;
        line-height: 0.36rem;
        margin-right: 0.1rem;
        // vertical-align: middle;
      }
    }
    .grow:nth-child(1) {
      .iconfont {
        background: url("~@/assets/images/1.png");
        background-size: 100%;
      }
    }
    .grow:nth-child(2) {
      .iconfont {
        background: url("~@/assets/images/2.png");
        background-size: 100%;
      }
    }
    .grow:nth-child(3) {
      .iconfont {
        background: url("~@/assets/images/3.png");
        background-size: 100%;
      }
    }
  }
  .grid {
    .gridItem {
      img {
        width: 100%;
        height: 100%;
      }
      .title {
        margin-top: 0.1rem;
        font-size: 0.24rem;
      }
    }
  }
  .promotionModule {
    background-color: #eeeeee;
    .promotionList {
      .promotionItem:nth-child(1) {
        img {
          height: 0.92rem;
          width: 100%;
        }
      }
    }
    .promotionList {
      .promotionItem:nth-child(2) {
        img {
          height: 3.2rem;
          width: 100%;
        }
      }
    }
    .promotionList {
      .promotionItem:nth-child(3) {
        img {
          height: 2.12rem;
          width: 100%;
        }
      }
    }
    .promotionGrow {
      .van-grid-item {
        width: 2.3rem;
        height: 2.2rem;
        .van-grid-item__content {
          background-color: #eeeeee;
        }
      }
    }
  }
  .freshmanModule {
    padding: 0 0.3rem 0.3rem 0.3rem;
    .moduleTitle {
      text-align: center;
      font-size: 0.28rem;
      line-height: 0.9rem;
      position: relative;
      &::before,
      &::after {
        content: "";
        width: 15px;
        position: absolute;
        border: 1px solid #333;
        top: 50%;
        // left: 35%;
        transform: translateY(-50%);
      }
      &::before {
        left: 35%;
      }
      &::after {
        right: 35%;
      }
    }
    .content {
      height: 217px;
      .left {
        float: left;
        width: 50%;
        height: 100%;
        text-align: center;
        background-color: #f9e9cf;
        .name {
          height: 50px;
          margin-left: -70px;
          line-height: 50px;
          font-size: 14px;
        }
        img {
          height: 150px;
          width: 140px;
        }
      }
      .right {
        float: left;
        width: 50%;
        height: 100%;
        overflow: hidden;
        .module1,
        .module2 {
          height: 50%;
          position: relative;
          background-color: #fbe2d3;
          margin-left: 2px;
          .cnt {
            padding: 10px 0 0 10px;
            .title {
              font-size: 16px;
              margin-bottom: 3px;
            }
            .desc {
              font-size: 12px;
              height: 15px;
              color: #7f7f7f;
            }
          }
          .goods {
            position: absolute;
            bottom: 0;
            right: 0;
            height: 100px;
            width: 100px;
            // background-color: #fafafa;
            .goodsImg {
              height: 100%;
              width: 100%;
              // background-color:red
            }
            .priceDiv {
              position: absolute;
              top: 6px;
              right: 10px;
              height: 40px;
              width: 40px;
              text-align: center;
              color: white;
              border-radius: 50%;
              box-sizing: border-box;
              padding-top: 10px;
              background-color: #f6a447;
              .price {
                display: block;
              }
              .priceOrigin {
                text-decoration: line-through;
              }
            }
          }
        }
        .module2 {
          background-color: #ffecc2;
          margin-top: 2px;
          .cnt {
            .title {
              font-size: 16px;
              margin-bottom: 3px;
            }
            .desc {
              display: inline;
              font-size: 12px;
              height: 15px;
              padding: 0 3px;
              background-color: #cbb693;
              border-radius: 2px;
              color: white;
            }
          }
        }
      }
    }
  }
  .dividerLine {
    height: 10px;
    background-color: #eeeeee;
  }
  .categoryHotSellModule {
    padding: 0 0.3rem 0.3rem 0.3rem;
    .moduleTitle {
      font-size: 16px;
      color: #333;
      line-height: 45px;
      padding: 0 0.3rem;
    }
    .content {
      padding: 0 5px;
      .line1 {
        display: flex;
        margin-bottom: 5px;
        .left,
        .right {
          width: 50%;
          height: 100px;
          background-color: #f9f3e4;
          position: relative;
          .name {
            position: absolute;
            left: 5px;
            top: 50%;
            transform: translateY(-100%);
            font-size: 14px;
            color: #333;
          }
          img {
            position: absolute;
            right: 0;
            bottom: 0;
            height: 100px;
            width: 100px;
          }
        }
        .left {
          margin-right: 2px;
        }
        .right {
          margin-left: 2px;
        }
      }
      .line2 {
        display: flex;
        text-align: center;
        // justify-content: center;
        flex-wrap: wrap;
        // padding: 0 5px;
        .item {
          width: 23.7%;
          box-sizing: border-box;
          background-color: #bababa;
          margin: 0 2px 3px 2px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #f5f5f5;
          .name {
            font-size: 12px;
            color: #333;
            line-height: 18px;
          }
          img {
            height: 60px;
            width: 60px;
          }
        }
        &::after {
          content: "";
          flex: 1;
        }
      }
    }
  }
  .onSaleGuide {
    display: flex;
    padding: 0.1rem 0.3rem 0.3rem 0.26rem;
    .left,
    .right {
      width: 50%;
      height: 135px;
      background-color: #f9f3e4;
      position: relative;
      display: flex;
      padding: 0.1rem;
      .title {
        font-size: 14px;
        color: #333;
        position: absolute;
        left: 6px;
        top: 10px;
        text-align: center;
        padding: 0.1rem;
      }
      .desc {
        font-size: 12px;
        color: #8037d3;
        position: absolute;
        left: 6px;
        top: 28px;
        text-align: center;
        padding: 0.1rem;
      }
      .descImg {
        // position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-top: 50px;
        // left: 0;
        // bottom: 0;
        img {
          height: 1.5rem;
          width: 1.5rem;
        }
      }
    }
    .left {
      margin-right: 2px;
    }
    .right {
      margin-left: 2px;
    }
  }
  .footer {
    height: 122px;
    background-color: #414141;
    color: #999;
    font-size: 12px;
    text-align: center;
    .footerBtn {
      display: flex;
      justify-content: center;
      .download,
      .toggle {
        margin-top: 27px;
        width: 86px;
        height: 31px;
        line-height: 31px;
        color: #fff;
        border: 1px solid #999;
        border-radius: 5px;
        text-align: center;
      }
      .download {
        margin-right: 15px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>