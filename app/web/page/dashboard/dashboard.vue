<template>
  <ele-dashboard :nav-map="navMap">
    <template slot="sidebarNav">
      <transition name="el-fade-in" mode="out-in">
        <router-view name="sidebarNav"></router-view>
      </transition>
    </template>
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="text">文字按钮</el-button>
    <router-view></router-view>
  </ele-dashboard>
</template>

<script>
  import Dashboard from '@/component/dashboard/dashboard'
  import navMap from '@/config/navMap'

  import '@/asset/style/theme/index.css';
  import '@/asset/style/ext/ext.scss';

  export default {
    data () {
      return {
        navMap
      }
    },
    components: {
      'ele-dashboard': Dashboard
    }
  }
</script>
