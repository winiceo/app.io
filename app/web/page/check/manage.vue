<template>
    <div>

        <div class="my-themes">
            <div class="container">
                <ul class="theme-list">
                    <li class="theme-item create">
                        <div class="create-area">
                            <p>扫码添加核销员</p>
                            <canvas style="float: left" id="canvas"></canvas>

                        </div>
                    </li>
                    <template v-for="item in list">
                        <li class="theme-item">
                            <div class="thumb">
                                <img :src="item.userinfo.headimgurl" alt="" width="150">

                            </div>
                            <div class="footer">
                                <div class="title">{{item.userinfo.nickname}}</div>
                                <div class="content">
                                    <el-button type="danger" @click.native="remove(item.objectId,index)">删除</el-button>
                                </div>
                            </div>
                        </li>
                    </template>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
    import tools from '@/utils/tools'
    import * as cache from '@/utils/cache'
    import * as http from '@/utils/fetch'
    import QRCode from 'qrcode'

    export default {
        data() {
            return {
                isShowPreView: false,
                itemId: null,
                url: ''
            }
        },
        computed: {
            list() {
                return this.$store.state.check.manageList.items
            }
        },
        mounted() {
            var joinCheckManageUrl = 'http://' + window.location.host + '/check/manage/join/' + cache.get('team')
            this.url = joinCheckManageUrl
            var canvas = document.getElementById('canvas')
            QRCode.toCanvas(canvas, joinCheckManageUrl, (err) => {
                console.log(err)
            })
            setInterval(()=>{
                this.$store.dispatch('getManangeList')
            }, 1000)

        },
        methods: {

            remove(id,index) {
                var vm=this;
                http.post('/check/delete/'+id).then((a) => {
                    vm.$message('删除成功');
                    vm.list.splice(index,1)
                })
            },

        },
        components: {}
    }
</script>

<style lang="less" scoped>
    .my-themes {
        width: 100%;
        height: 100%;
        background-color: #f2f5f6;
    }

    .my-themes .container {
        width: 1024px;
        margin: 0 auto;
        padding-top: 20px;
    }

    .my-themes .theme-list {
        overflow: hidden;
    }

    .theme-item {
        width: 200px;
        height: 280px;
        float: left;
        margin:5px;
        background-color: white;

    }

    .theme-item .thumb img {
        width: 100%;
        height: 180px;
    }

    .thumb {
        position: relative;
        .cover {
            display: none;
            position: absolute;
            background: #000;
            opacity: 0.5;
            width: 100%;
            height: 100%;
            top: 0;
            .toolbar {
                color: #fff;
                text-align: right;
                cursor: pointer;
                padding: 10px;
                font-size: 18px;
                i {
                    margin: 5px;
                }
            }
            .preview {
                text-align: center;
                margin-top: 70px;
                span {
                    border: 1px solid #fff;
                    padding: 5px 10px;
                    font-size: 20px;
                    color: #fff;
                    cursor: pointer;
                }
            }
        }
    }

    .thumb:hover {
        .cover {
            display: block;
        }
    }

    .theme-item .footer {
        height: 98px;
        padding: 10px;
        background-color: #fff;
        box-sizing: border-box;
        position: relative;
    }

    .theme-item .footer > .title {
        color: #4a4a4a;
        font-size: 14px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .theme-item .footer > .content {
        color: #83817b;
        margin-top: 12px;
        font-size: 14px;
        max-height: 40px;
        overflow: hidden;
        line-height: 1.5;
    }

    .footer .delete {
        position: absolute;
        right: 10px;
        bottom: 10px;
    }

    .theme-item.create {
        text-align: center;
    }

    .theme-item.create .create-area p {
        font-size: 20px;
        cursor: pointer;
        margin-top: 10px;
    }
</style>

