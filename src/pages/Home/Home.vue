<template>
  <div>
    <img v-if="!HomeList" style="width:100%;" src="https://yanxuan-static.nosdn.127.net/hxm/yanxuan-node-wap/style/img/skeleton/index-c93cde177f7c39a2f4c1.png" alt="">
    <div v-if="HomeList" class="container">
      <!-- 首页头部 -->
      <van-sticky>
        <div class="header">
          <div>
            <a href="javascript:;" class="logo"></a>
          </div>

          <div>
            <van-search class="search" placeholder="搜索商品, 共107974款好物" v-model="keywords" @click="toSearch"></van-search>
          </div>

          <div>
            <button class="login" @click="toLogin">登录</button>
          </div>
        </div>
        <!-- 横向滚动栏 -->
        <van-tabs class="tabWrap" line-height="2px" v-if="globalList" @click="toOther">
          <van-tab class="tabItem" title="推荐"></van-tab>
          <van-tab class="tabItem" v-for="(item,index) in globalList" :title="item.name" :key="index" :name="item.id">
          </van-tab>
          <div class="toggle iconfont" :class="{ 'icon-tubiao-': !isShow, 'icon-shangla': isShow }" @click="isShow = !isShow">
          </div>
        </van-tabs>
        <div class="tabList" v-if="isShow">
          <div class="title">全部频道</div>
          <div class="tabItem">
            <div class="item" :class="[categoryId===0?'active':'']" @click="isShow=!isShow">推荐</div>
            <div class="item" v-for="(item,index) in globalList" :class="[categoryId===item.id?'active':'']" :key="index" @click="toOther(item.id)">{{item.name}}</div>
          </div>
        </div>

      </van-sticky>

      <router-view v-show="categoryId!==0"></router-view>
      <div v-show="categoryId===0">

        <!-- 轮播图 -->
        <van-swipe class="swiper" :autoplay="6000" indicator-color="white" v-if="focusList">
          <van-swipe-item v-for="(focus,index) in focusList" :key="index">
            <img :src="focus.picUrl" alt="">
          </van-swipe-item>
        </van-swipe>
        <!-- 三个图标 -->
        <van-row class="growList">
          <van-col class="grow" span="8">
            <i class="iconfont"></i>
            <span>网易自营品牌</span>
          </van-col>
          <van-col class="grow" span="8">
            <i class="iconfont"></i>
            <span>30天无忧退货</span>
          </van-col>
          <van-col class="grow" span="8">
            <i class="iconfont"></i>
            <span>48小时快速退款</span>
          </van-col>
        </van-row>
        <!-- 二乘五宫格 -->
        <van-grid :column-num="5" class="grid">
          <van-grid-item class="gridItem" v-for="(KingKong,index) in kingKongList" :key="index">
            <img :src="KingKong.picUrl" alt="">
            <div>{{KingKong.text}}</div>
          </van-grid-item>
        </van-grid>
        <!-- 促销模块 promotion Module -->
        <div class="promotionModule">
          <ul class="promotionList" v-if="floorList">
            <li class="promotionItem" v-for="floor in floorList[0].cells" :key="floor.id">
              <a href="javascript:;">
                <img :src="floor.picUrl" alt="" />
              </a>
            </li>
            <li class="promotionItem" v-for="floor in floorList[1].cells" :key="floor.id">
              <a href="javascript:;">
                <img :src="floor.picUrl" alt="" />
              </a>
            </li>
            <li class="promotionItem" v-for="floor in floorList[2].cells" :key="floor.id">
              <a href="javascript:;">
                <img :src="floor.picUrl" alt="" />
              </a>
            </li>
          </ul>
          <van-grid class="promotionGrow" :border="false" :column-num="3" v-if="floorList">
            <van-grid-item v-for="floor in floorList[3].cells" :key="floor.id">
              <van-image :src="floor.picUrl" />
            </van-grid-item>
          </van-grid>
        </div>
        <!-- 新人专享礼模块 -->
        <lazy-component>
          <div class="freshmanModule">
            <div class="moduleTitle">- &nbsp; 新人专享礼 &nbsp;-</div>
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
                <!-- <div class="module2">
            <div class="cnt">
              <div class="title">福利社</div>
              <div class="desc">今日特价</div>
            </div>
            <div class="goods">
              <img
                class="goodsImg"
                src="https://yanxuan-item.nosdn.127.net/9c84f1fb98a9d058a932641bd2afaca8.png?quality=75&type=webp&imageView&thumbnail=200x200"
                alt=""
              />
              <div class="priceDiv">
                <span class="price">￥17.9</span>
                <span class="priceOrigin">￥139.9</span>
              </div>
            </div>
          </div> -->
              </div>
            </div>
          </div>
        </lazy-component>
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
              <img src="https://yanxuan-item.nosdn.127.net/cc30fc286cf3c705e71411911cc27926.png?quality=75&type=webp&imageView&thumbnail=150x150" alt="">
              <img :src="url" alt="" />
            </div>
          </div>
          <!-- <div class="right">
        <span class="title">实验室</span>
        <span class="desc"> 尝鲜闭眼买</span>
        <div class="descImg">
          <img
            src="https://yanxuan-item.nosdn.127.net/b6f6bf97ece36694371386315a7d918d.png?quality=75&type=webp&imageView&thumbnail=200x200"
            alt=""
          />
          <img
            src="https://yanxuan-item.nosdn.127.net/b6f6bf97ece36694371386315a7d918d.png?quality=75&type=webp&imageView&thumbnail=200x200"
            alt=""
          />
        </div>
      </div> -->
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

</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "Home",
  components: {},
  data() {
    return {
      keywords: "",
      categoryId: 0,
      isShow: false
    };
  },
  mounted() {
    this.getHomeList();
    this.getGlobalList();
  },
  methods: {
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
      console.log(event);
    },
    toLogin() {
      this.$router.push("/login");
    },
    toOther(id) {
      this.categoryId = id
      if (id == 0) {
        console.log(id);
        this.$router.push('/home');
      } else {
        this.$router.push(`/home/other?categoryId=${id}`);
      }

    }
  },
  computed: {

    ...mapState({ HomeList: (state) => state.home.HomeList.data }),
    ...mapState({ globalList: (state) => state.home.globalInfo.cateList }),

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
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  // height:1710px;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #ffffff;
    .logo {
      display: inline-block;
      height: 20px;
      width: 69px;
      background: url("~@/assets/images/sprite.png") no-repeat;
      background-position: -60px -124px;
      background-size: 185px 185px;
    }
    .van-search__content {
      background-color: #ededed;
    }
    .login {
      width: 45px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      font-size: 12px;
      border-radius: 5px;
      background-color: white;
      border: 1px solid #dd1a21;
      color: #dd1a21;
    }
  }
  .tabWrap {
    .toggle {
      text-align: center;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 900;
      width: 40px;
      height: 40px;
      font-size: 24px;
      line-height: 40px;
      color: #392d2d;
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
        margin-bottom: 10px;
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
  }
  .swiper {
    position: relative;
    .van-swipe-item {
      line-height: 100px;
      img {
        width: 100%;
      }
    }
    // .swiperPagination {
    //   .PaginnatonItem {
    //     position: absolute;
    //     left: 50%;
    //     top: 0;
    //     height: 2px;
    //     width: 20px;
    //     background-color: red;
    //   }
    // }
  }
  .growList {
    margin-top: 10px;
    text-align: center;
    .grow {
      .iconfont {
        display: inline-block;
        height: 16px;
        width: 16px;
        margin-right: 5px;
        vertical-align: middle;
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
    }
  }
  .promotionModule {
    background-color: #eeeeee;
    .promotionList {
      .promotionItem:nth-child(1) {
        img {
          height: 46px;
          width: 100%;
        }
      }
    }
    .promotionList {
      .promotionItem:nth-child(2) {
        img {
          height: 160px;
          width: 100%;
        }
      }
    }
    .promotionList {
      .promotionItem:nth-child(3) {
        img {
          height: 106px;
          width: 100%;
        }
      }
    }
    .promotionGrow {
      .van-grid-item {
        width: 115px;
        height: 110px;
        .van-grid-item__content {
          background-color: #eeeeee;
        }
      }
    }
  }
  .freshmanModule {
    .moduleTitle {
      text-align: center;
      font-size: 14px;
      line-height: 45px;
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
          font-size: 12px;
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
    .moduleTitle {
      font-size: 16px;
      color: #333;
      line-height: 45px;
      padding: 0 5px;
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
    padding: 0 5px;
    .left,
    .right {
      width: 50%;
      height: 100px;
      background-color: #f9f3e4;
      position: relative;
      .title {
        font-size: 14px;
        color: #333;
        position: absolute;
        left: 6px;
        top: 10px;
        text-align: center;
      }
      .desc {
        font-size: 12px;
        color: #8037d3;
        position: absolute;
        left: 6px;
        top: 28px;
        text-align: center;
      }
      .descImg {
        position: absolute;
        left: 0;
        bottom: 0;
        img {
          height: 75px;
          width: 75px;
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