<template>
  <!-- 头部导肮 -->
  <div class="header">
    <div class="topBar" :style="{'height':height}">
      <div class="icon homeIcon" @click="$router.push('/home')"></div>
      <div v-if="title" class="title" >{{title}}</div>
      <i v-else class="icon logo" @click="$router.push('/home')"></i>
      <div class="right">
        <i class="icon searchIcon" @click="$router.push('/home')"></i>
        <i class="icon cartIcon" @click="$router.push('/cart')"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: {
      default: '',
    },
    height:{
      default:'43.5px',
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  // position: relative;
  position: fixed;
  top: 0;
  z-index: 999;
  &::after {
    content: "";
    height: 1px;
    width: 100%;
    position: absolute;
    bottom: 0;
    background-color: #d9d9d9;
  }
  .topBar {
    background-color: #fafafa;
    height: 43.5px;
    width: 375px;
    margin: auto;
    padding: 0 8px 0 12px;
    display: flex;
    align-items: center;
    .title {
      font-size: 18px;
      position: absolute;
      width: 75px;
      text-align: center;
      line-height: 20px;
      height: 20px;
      left: 50%;
      top: 50%;
      margin-left: -37.5px;
      margin-top: -10px;
    }
    .icon {
      background-image: url("../../assets/images/category/bg.png");
      background-size: 119px 101px;
      display: inline-block;
      vertical-align: middle;
    }
    .homeIcon {
      width: 24px;
      height: 22px;
      background-position: 0 -79.5px;
    }
    .logo {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 86px;
      height: 27px;
      background-position: 0 0;
    }
    .right {
      margin: 0 2px 0 auto;
      i {
        width: 32px;
        height: 32px;
      }
      .searchIcon {
        margin-right: 10px;
        background-position: -87px 0;
      }
      .cartIcon {
        background-position: -37px -28px;
      }
    }
  }
}
</style>
