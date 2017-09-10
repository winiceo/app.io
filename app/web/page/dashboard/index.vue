<template>
  <ele-dashboard :nav-map="navMap">
    <template slot="sidebarNav">
      <transition name="el-fade-in" mode="out-in">
        <router-view name="sidebarNav"></router-view>
      </transition>
    </template>

    <el-button type="text" @click.native="dialogFormFenLeiVisible = true" style="margin: 0;padding: 0;">设置</el-button>

    <el-dialog title="设置活动分类" v-model="dialogFormFenLeiVisible" >

        <span slot="footer" class="dialog-footer">
         </span>
    </el-dialog>
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
