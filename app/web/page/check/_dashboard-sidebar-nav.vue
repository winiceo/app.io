<template>
  <ele-sidebar-nav :nav-map="navMap"></ele-sidebar-nav>
</template>

<script>
  import sidebarNav from '@/page/dashboard/component/dashboard-sidebar-nav'
  import sidebarNavArgumentsMixin from '@/mixins/dashboard-sidebar-nav-arguments'

  export default {
    mixins: [sidebarNavArgumentsMixin],
    components: {
      'ele-sidebar-nav': sidebarNav
    }
  }
</script>
