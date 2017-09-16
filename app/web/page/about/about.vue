<template>
  <layout>
    <img src="../../asset/images/logo.png"/>
    <div> {{message}} </div>     <yd-button type="primary"  >Click Me!</yd-button>

    <div class="fontawesome"> {{message}} </div>
  </layout>
</template>
<style>
@font-face {
 font-family: "fontawesome";
 src: url("./font/fontawesome-webfont.ttf");
}
.fontawesome
{
  font-family:fontawesome;
}
@import "about.css";

</style>

<script  >

    import YDUI from 'vue-ydui';
    import 'vue-ydui/dist/ydui.rem.css';
    /* 使用px：import 'vue-ydui/dist/ydui.px.css'; */


    export default {
        name: 'dynamic',
        data () {
            return {
                show: false
            }
        },
        components: {
            YDUI
        }
    }
</script>

