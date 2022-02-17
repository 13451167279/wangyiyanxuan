<template>
  <div id="app">
    <router-view></router-view>

    <!-- <van-tabbar
      v-show="$route.meta.showTabbar"
      style="border-top:1px solid #F3F3F4"
      v-model="active"
      active-color="#ee0a24"
      inactive-color="#000"
    > -->

    <van-tabbar v-show="!$route.meta.isHidden" v-model="active" active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/category" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to="/worthbuy" icon="photo-o">值得买</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item v-if="!$store.state.login.userInfo.name" to="/login" icon="user-o">个人</van-tabbar-item>
      <van-tabbar-item v-else to="/center" icon="user-o">个人</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "App",
  data() {
    return {
      active: 0,
      isLogin: true,
    };
  },
  mounted() {
    this.$bus.$on("setActive", this.setActive);
  },
  methods: {
    setActive(num) {
      this.active = num;
    },
  },
};
</script>

<style lang="less">
@import url("~@/assets/iconfont/iconfont.css");
*,
:after,
:before {
  box-sizing: border-box;
}
</style>

