<template>
  <div class="activePublic ">
    <el-steps :space="200" :active="step" class="step">
      <el-step title="活动信息" description=""></el-step>
      <el-step title="奖品设置" description=""></el-step>
      <el-step title="分享设置" description=""></el-step>
     </el-steps>

    <transition name="fade">
      <router-view class="view"></router-view>
    </transition>

    <div class="but-group">
      <el-button @click.native.prevent="handlePreview" v-show="preview">预览</el-button>
      <el-button @click.native.prevent="handlePreStep" v-show="preStep">上一步</el-button>
      <el-button @click.native.prevent="handleNextStep" v-show="nextStep" type="primary">下一步</el-button>
      <el-button @click.native.prevent="handlePublish" v-show="publish" type="primary">发布活动</el-button>
    </div>
  </div>
</template>

<script>

   // import $ from 'jquery'

    export default {
        name:'activePublic',
        data: function () {
            return {
                isRouter: false,
                preview: true,
                preStep: false,
                nextStep: true,
                publish: false,
                step: 1
            }
        },
        methods: {
            handlePreview: function () {
                console.log('预览');
            },
            handlePreStep: function () {
                this.$router.go(-1);
                this.step--;
                this.goStep(this.step);
                //$('html,body').animate({scrollTop:0},500);
            },
            handleNextStep: function () {
                //console.log('/app/dzp/create/step'+(this.step+1));
                //this.$router.push({name: 'create_setp'+(this.step+1)});
                this.$router.push({name: 'create_setp'+(this.step+1)})

                var _this = this;
                setTimeout(function () {
                    if(_this.isRouter){
                        _this.step++;
                        _this.goStep(_this.step);
                    }
                })
                //$('html,body').animate({scrollTop:0},500);

            },
            handlePublish: function () {
                this.$store.dispatch('saveActivity').then(() => {

                    // this.$router.push({name: 'activity-dzp'})
                    // this.showDialog = true
                }).catch(() => {
                 })
            },
            goStep: function (n) {
                switch (n) {
                    case 1 :
                        this.preview = true;this.preStep = false;this.nextStep = true;this.publish = false;
                        break;
                    case 2 :
                        this.preview = false;this.preStep = true;this.nextStep = true;this.publish = false;
                        break;

                    case 3 :
                        this.preview = false;this.preStep = true;this.nextStep = false;this.publish = true;
                        break;
                }
            }
        },
        watch:{
            '$route': function (to,from) {
                this.isRouter = true;
            }
        }
    }

</script>
<style>
  .activePublic{
    padding: 50px 70px

  }
  .activePublic .router-link{color:#fff;}
  .activePublic .but-group .el-button{margin-right: 20px;}
</style>
