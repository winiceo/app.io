<template>
    <ele-dashboard :nav-map="navMap">
        <template slot="sidebarNav">
            <transition name="el-fade-in" mode="out-in">
                <router-view name="sidebarNav"></router-view>
            </transition>
        </template>
        <router-view></router-view>
    </ele-dashboard>
</template>

<script>
  import Dashboard from '@/page/dashboard/component/dashboard'
  import navMap from '@/config/navMap'

  export default {
    data () {
      return {
        navMap,
          dialogFormFenLeiVisible:false
      }
    },
    components: {
      'ele-dashboard': Dashboard
    }
  }
</script>
