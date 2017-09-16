<template>
   
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  
</template>
<style lang="scss">
  @import '~normalize.css/normalize.css';// normalize.css 样式格式化
  @import '~@/asset/style/index.scss'; // 全局自定义的css样式
</style>
<script type="text/babel">
  export default {
    computed: {

    },
    mounted(){

    }
  }
</script>
