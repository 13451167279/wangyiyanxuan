<template>
  <div class="worthBuyContent">
    <Header title="值得买" height="49.5px"></Header>
    <div class="swipe-contenr">
      <div class="swipe-title">
        <img class="title-img" src="http://yanxuan.nosdn.127.net/0b7676e645253f84be662aacfc051922.png" alt="">
        <div class="text">严选好物&nbsp;用心生活</div>
        <img src="http://yanxuan.nosdn.127.net/a93a392fb8006ba26dea38477979b7b4.jpg?imageView" class="bg">
      </div>
      <div class="swiper">
        <van-swipe :loop="false" @change="changeIndex" :width="88.75">
          <van-swipe-item v-for="(banner,index) in bannerList" :key="index">
            <div class="group">
              <div class="group-item" v-for='item in banner' :key="item.id">
                <div class="group-img">
                  <img :src="item.picUrl" alt="">
                </div>
                <div class="detail">
                  <div class="text">{{item.mainTitle}}</div>
                  <div class="desc">{{item.viceTitle}}</div>
                </div>
              </div>
            </div>
          </van-swipe-item>
          <template #indicator>
            <div class="indicators">
              <i class="indicator" :class="{active :indicatorActive ===0}"></i>
              <i class="indicator "></i>
              <i class="indicator "></i>
              <i class="indicator " :class="{active :indicatorActive !==0}"></i>
            </div>
          </template>
        </van-swipe>
      </div>
    </div>
    <div class="content">
      <vue-waterfall-easy ref="waterfall" @scrollReachBottom="getRecAutoList" :imgsArr="imgsArr">
        <template v-slot="props">
          <div class="water-title">{{props.value.title}}</div>
          <div class="water-detail">
            <div class="userInfo">
              <img :src="props.value.avatar" alt="">
              <div class="name">{{props.value.nickname}}</div>
            </div>
            <div class="area">
              <img src="https://yanxuan.nosdn.127.net/5097bc5f2e1eb15f2a32b56895db073a.png" alt="">
              <div class="textNum">{{props.value.readCount}}</div>
            </div>
          </div>
        </template>
      </vue-waterfall-easy>
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header'
import vueWaterfallEasy from 'vue-waterfall-easy'
import { mapGetters, mapState } from 'vuex'
export default {
  name: "WorthBuy",
  components: {
    vueWaterfallEasy,
    Header
  },
  data() {
    return {
      // 轮播指示器
      indicatorActive: 0,
      imgsArr: [],
      page: 0,
      size: 2,
    }
  },
  mounted() {
    this.getNavBannerList();
    this.getRecAutoList();
  },
  methods: {
    changeIndex(index) {
      this.indicatorActive = index;
    },
    getNavBannerList() {
      this.$store.dispatch('reqNavBannerList')
    },
    async getRecAutoList() {
      // this.$store.dispatch('reqRecAutoList', { page: this.page, size: this.size })
      this.page += 1;
      const res = await this.$store.$API.worthBuy.getRecAutoList(this.page, this.size);
      let imgsArr = [];
      // 添加src属性
      res.data.result.forEach(item => {
        item.topics.forEach(item1 => {
          if (item1.newAppBanner)
            item1.src = item1.newAppBanner;
          else
            item1.src = item1.picUrl;
        })
        imgsArr.push(...item.topics);
      });
      this.imgsArr = this.imgsArr.concat(imgsArr);

    },
    getData() {
      this.page += 1
      this.getRecAutoList();
    }
  },
  computed: {
    ...mapState({
      recAutoList: state => state.worthBuy.recAutoList,
    }),
    ...mapGetters(['bannerList']),
  }


}
</script>

<style lang="less" scoped>
.worthBuyContent {
  // overflow: auto;
  .swipe-contenr {
    position: relative;
    top: 49.5px;
    padding-top: 72.5px;
    background: #eee;
    .swipe-title {
      position: absolute;
      top: 0;
      z-index: 1;
      .title-img {
        position: absolute;
        width: 65px;
        height: auto;
        top: 30px;
        left: 6px;
        z-index: 2;
      }
      .text {
        font-size: 15px;
        line-height: 22px;
        height: 22px;
        position: absolute;
        font-family: PingFangSC-Regular;
        left: 73px;
        top: 39.5px;
        color: #fff;
      }
      .bg {
        width: 375px;
        height: auto;
      }
    }
    .swiper {
      width: 355px;
      background: #fff;
      border-radius: 8px;
      margin: 0 auto;
      position: relative;
      z-index: 99;
      .van-swipe {
        position: relative;
        overflow: hidden;
        margin: 0 auto;
        height: 270px;
        border-radius: 8px;
        .indicators {
          position: absolute;
          display: flex;
          justify-content: center;
          bottom: 9px;
          left: 0;
          width: 100%;
          .indicator {
            width: 19.6px;
            height: 2px;
            display: inline-block;
            background: #d9d9d9;
            margin: 0 !important;
            border-radius: 0;
            opacity: 1;
            &.active {
              background: #dd1a21;
            }
          }
        }
      }
      .group {
        padding: 3px;
        width: 84px;
        background: #fff;
        padding-top: 18px;
        .group-item {
          // display: inline-block;
          position: relative;
          width: 84px;
          height: 100px;
          word-wrap: break-word;
          word-break: normal;
          &:last-child {
            margin-top: 14px;
          }
          .group-img {
            position: relative;
            width: 60px;
            height: 60px;
            margin: 0 auto;
            img {
              width: 60px;
              height: 60px;
            }
          }
          .detail {
            width: 84px;
            margin-top: 4px;
            .text {
              font-family: PingFang-SC-Bold;
              font-weight: 700;
              font-size: 14px;
              width: 84px;
              height: 20px;
              white-space: nowrap;
              overflow: hidden;
              color: #333;
              text-align: center;
              line-height: 20px;
            }
            .desc {
              width: 84px;
              margin-top: 1px;
              font-family: PingFangSC-Regular;
              font-size: 10px;
              color: #999;
              text-align: center;
              height: 15px;
              line-height: 15px;
              white-space: nowrap;
              overflow: hidden;
            }
          }
        }
      }
    }
  }
  .content {
    width: 100%;
    position: absolute;
    top: 392px;
    bottom: 0px;
    padding-top: 10px;
    background-color: #eee;
    .vue-waterfall-easy-container {
      background-color: #eeeeee;
      height: 800px;
      overflow: hidden;
      margin: 0 auto;
      .vue-waterfall-easy-scroll {
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
      }
    }
    .water-title {
      width: 179.5px;
      background-color: #fff;
      padding: 9px 8px 0;
      color: #333;
      font-size: 14px;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-family: PingFangSC-Regular;
      text-align: left;
    }
    .water-detail {
      font-size: 0.24rem;
      padding: 0.17rem 0.16rem 0.24rem;
      display: flex;
      justify-content: space-between;
      width: 179.5px;
      background-color: #fff;
      .userInfo {
        display: flex;
        justify-content: right;
        img {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 1px solid #d9d9d9;
        }
        .name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 11px;
          color: #7f7f7f;
          height: 24px;
          line-height: 24px;
          margin-left: 4px;
        }
      }
      .area {
        width: 50px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        img {
          width: 16px;
          height: 16px;
        }
        .textNum {
          font-size: 12px;
          color: #7f7f7f;
          max-width: 45px;
          text-align: right;
          height: 16px;
          line-height: 16px;
          margin-left: 1px;
        }
      }
    }
  }
}
</style>
