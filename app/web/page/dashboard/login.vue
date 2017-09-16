<style lang="scss" scoped>
    @import "~@/asset/style/mixin.scss";
    $bg: #2d3a4b;
    $dark_gray: #889aa4;
    $light_gray: #eee;
    .login-container {
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
        background-color: #141a48;
         background-repeat: no-repeat;
        background-size: cover;
        overflow: hidden;
    }
    #loginThree {
        position: absolute;
        width: 100%;
        top: 0;
        bottom: 0;
        overflow: hidden;
    }
    .login-form {
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -230px 0 0 -180px;
        width: 310px;

        padding: 25px;
        box-shadow: 0 0 100px rgba(0,0,0,.08);
        background-color: #fff;
        border-radius: 4px;
        z-index: 3;
        .login-logo {
            text-align: center;
            height: 40px;
            line-height: 40px;
            cursor: pointer;
            margin-bottom: 24px;
            img {
                width: 40px;
                margin-right: 8px;
            }
            span {

                font-size: 16px;
                text-transform: uppercase;
                display: inline-block;
            }
        }
        .login-account {
            color: #999;
            text-align: center;
            margin-top: -15px;
            span {
                font-size: 12px;
                &:first-child {
                    margin-right: 16px;
                }
            }
        }
    }
    .form-fade-enter-active, .form-fade-leave-active {
        transition: all 1s;
    }
    .form-fade-enter, .form-fade-leave-active {
        transform: translate3d(0, -50px, 0);
        opacity: 0;
    }
    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
    }
</style>
<template>
    <div class="login-container">
        <transition name="el-zoom-in-center" mode="in-out">
            <div class="login-form" v-show="showLogin">
                <div class="login-logo">
                    <img src="~@/asset/logo.png"> <span>营销系统</span>
                </div>

                <el-form  autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm">
                    <el-form-item prop="username">
                        <el-input type="text" v-model="loginForm.username" auto-complete="off"  placeholder="帐号(邮箱或者手机号)" ></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                                  autoComplete="on"
                                  placeholder="密码"   ></el-input>


                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :loading="loading"
                                   @click.native.prevent="handleLogin">登录</el-button>
                        <el-button @click="showLogin=false">注册</el-button>
                    </el-form-item>
                </el-form>
                <div class="login-account">
                    <span>商户营销平台</span>
                </div>
            </div>
        </transition>
        <transition name="el-zoom-in-center" mode="in-out">

            <div class="login-form" v-show="!showLogin">
                <div class="login-logo">
                    <img src="~@/asset/logo.png"> <span>营销系统</span>
                </div>
                <el-form  autoComplete="on" :model="registerForm" :rules="registerRules" ref="registerForm">
                    <el-form-item prop="username">
                        <el-input type="text" v-model="registerForm.username" auto-complete="off" placeholder="帐号(邮箱或者手机号)"></el-input>
                    </el-form-item>

                    <el-form-item prop="nickname">
                        <el-input type="text" v-model="registerForm.nickname" auto-complete="off" placeholder="真实姓名"></el-input>
                    </el-form-item>

                    <el-form-item prop="password">
                        <el-input type="password" name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="registerForm.password"
                                  autoComplete="on"
                                  placeholder="密码"   ></el-input>

                        <span class='show-pwd' @click='showPwd'><icon-svg icon-class="yanjing"/></span>

                    </el-form-item>

                    <el-form-item prop="captcha">
            <span class="svg-container svg-container_login">
              <img :src='captcha' @click='recaptcha'>
            </span>
                 <el-input placeholder="输入验证码" name="captcha" v-model="registerForm.captcha">
               
              </el-input>
            </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :loading="loading"
                                   @click.native.prevent="handleRegister">注册</el-button>
                        <el-button @click="showLogin=true">登录</el-button>
                    </el-form-item>
                </el-form>
                <div class="login-account">
                    <span>商户营销平台</span>
                </div>
            </div>
        </transition>
        <div id="loginThree"></div>
    </div>
</template>

<script>
    import {isvalidUsername} from '@/utils/validate'
    import THREE from '@/utils/three/three';

    export default {

        data () {
//            const validateUsername = (rule, value, callback) => {
//                if (!isvalidUsername(value)) {
//                    callback(new Error('请输入正确的用户名'))
//                } else {
//                    callback()
//                }
//            }
//            const validateNickname = (rule, value, callback) => {
//                if (!isvalidNickname(value)) {
//                    callback(new Error('请输入真实姓名'))
//                } else {
//                    callback()
//                }
//            }
            const validatePassword = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('密码不能小于6位'))
                } else {
                    callback()
                }
            }
            return {
                showLogin:true,
                loginForm: {
                    username: '',
                    password: ''
                },
                registerForm: {
                    username: '',
                    password: ''
                },
                loginRules: {
                    username: [{required: true, trigger: 'blur'}],
                    password: [{required: true, trigger: 'blur'}]
                },
                registerRules: {
                    username: [{required: true, trigger: 'blur'}],
                    nickname: [{required: true, trigger: 'blur'}],
                    password: [{required: true, trigger: 'blur', validator: validatePassword}]
                },
                pwdType: 'password',
                loading: false,
                showDialog: false,
                captcha:'/captcha'
            }
        },
        created () {
        },
        mounted () {
            const that = this;
            that.showLogin = true;
            that.init3D();
        },
        methods: {
            recaptcha(){
                this.captcha="/captcha?id"+new Date()
            },
            showPwd() {
                if (this.pwdType === 'password') {
                    this.pwdType = ''
                } else {
                    this.pwdType = 'password'
                }
            },
            handleRegister(){
                var vm=this;
                vm.$refs.registerForm.validate(valid => {
                    if (valid) {

                        vm.loading = true


                        vm.$store.dispatch('register', vm.registerForm).then((a) => {
                            
                            vm.$message({
                              message: '注册成功，请登录',
                              type: 'success'
                            });
                             vm.showLogin=true;
                             vm.loading = false;
                             vm.recaptcha()
                            // vm.loading = false
                            // vm.$router.push({path: '/'})
                            // this.showDialog = true
                        }).catch((error) => {
                            vm.recaptcha()
                            vm.loading = false
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {

                        this.loading = true


                        this.$store.dispatch('login', this.loginForm).then((a) => {

                            this.loading = false
                            this.$router.push({path: '/'})
                            this.recaptcha()
                            // this.showDialog = true
                        }).catch((error) => {
                            
                            this.loading = false
                        })
                    } else {
                        this.recaptcha()
                        console.log('error submit!!')
                        return false
                    }
                })
            },

            resetForm(name) { // 重置表单
                const that = this;
                this.$refs[name].resetFields();
            },

            init3D () { // 初始化3D动画
                var SCREEN_WIDTH = window.innerWidth;
                var SCREEN_HEIGHT = window.innerHeight;
                var SEPARATION = 90;
                var AMOUNTX = 50;
                var AMOUNTY = 50;
                var container;
                var particles, particle;
                var count;
                var camera;
                var scene;
                var renderer;
                var mouseX = 0;
                var mouseY = 0;
                var windowHalfX = window.innerWidth / 1;
                var windowHalfY = window.innerHeight / 1;
                init();
                this.interval = setInterval(loop, 1000 / 60);
                function init() {
                    container = document.createElement( 'div' );
                    container.style.position = 'relative';
                    container.style.top = '200px';
                    document.getElementById('loginThree').appendChild( container );
                    camera = new THREE.Camera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
                    camera.position.z = 1000;
                    scene = new THREE.Scene();
                    renderer = new THREE.CanvasRenderer();
                    renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
                    particles = new Array();
                    var i = 0;
                    var material = new THREE.ParticleCircleMaterial( 0x097bdb, 1 );
                    for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
                        for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
                            particle = particles[ i ++ ] = new THREE.Particle( material );
                            particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
                            particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
                            scene.add( particle );
                        }
                    }
                    count = 0;
                    container.appendChild( renderer.domElement );
                    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
                    document.addEventListener( 'touchmove', onDocumentTouchMove, false );
                }
                function onDocumentMouseMove( event ) {
                    mouseX = event.clientX - windowHalfX;
                    mouseY = event.clientY - windowHalfY;
                }
                function onDocumentTouchMove( event ) {
                    if ( event.touches.length == 1 ) {
                        event.preventDefault();
                        mouseX = event.touches[ 0 ].pageX - windowHalfX;
                        mouseY = event.touches[ 0 ].pageY - windowHalfY;
                    }
                }
                function loop() {
                    camera.position.x += ( mouseX - camera.position.x ) * .05;
                    camera.position.y = 364;
                    var i = 0;
                    for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
                        for (var iy = 0; iy < AMOUNTY; iy++) {
                            particle = particles[ i++ ];
                            particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) + ( Math.sin( ( iy + count ) * 0.5 ) * 50 );
                            particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 2 + ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 2;
                        }
                    }
                    renderer.render(scene, camera);
                    count += 0.1;
                }
            }
        },
        beforeDestroy () {
            const that = this
            if (that.interval) clearInterval(that.interval);
        }
    }
</script>
