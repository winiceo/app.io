<template>
  <el-breadcrumb separator="/" style="margin-bottom: 20px">
    <el-breadcrumb-item :to="navMap[parseInt(topNavActive)].location">{{ navMap[parseInt(topNavActive)].text }}
    </el-breadcrumb-item>
    <el-breadcrumb-item>{{ navMap[parseInt(topNavActive)].children[parseInt(sidebarNavActive)].text }}
    </el-breadcrumb-item>
    <slot></slot>
  </el-breadcrumb>
</template>

<script>
  export default {
    data () {
      return {
        navMap: require('@/config/navMap')
      }
    },
    computed: {
      topNavActive () {

        return this.$store.getters.topNavActive
      },
      sidebarNavActive () {
        return this.$store.getters.sidebarNavActive
      }
    }
  }
</script>
