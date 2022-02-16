<template>
  <div>Home</div>
</template>

<script>
export default {
  name: "Home",
  mounted() {
    this.$store.dispatch('getHomeList')
  }
}
</script>

<style lang="less" scoped>

</style>
