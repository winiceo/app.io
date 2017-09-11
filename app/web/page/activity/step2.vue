<template>
    <div class="step2">

        <el-form ref="awardForm" :model="awardForm" label-position="top" @submit.prevent="onSubmit">


            <el-form-item label="中奖次数限制" prop="">
                <el-row>
                    <el-col :span="6">
                        <el-radio class="radio" v-model="awardForm.numLimit" label="无限制"></el-radio>
                        <el-radio class="radio" v-model="awardForm.numLimit" label="限制"></el-radio>
                    </el-col>
                    <el-col :span="6">
                        <el-input placeholder="0" :number="true" size="large" v-model="awardForm.gameMostPrize"
                                  :disabled=" awardForm.numLimit == '无限制' ">
                            <template slot="append">次</template>
                        </el-input>
                    </el-col>
                </el-row>
            </el-form-item>

            <!--<el-form-item label="每日抽奖机会" prop="">-->
                <!--<el-row>-->

                    <!--<el-col :span="6">-->
                        <!--<el-input placeholder="0" :number="true" size="large" v-model="awardForm.costDetail">-->
                            <!--<template slot="append">次</template>-->
                        <!--</el-input>-->
                    <!--</el-col>-->
                <!--</el-row>-->
            <!--</el-form-item>-->

            <el-form-item label="中奖概率" prop="">
                <el-row>

                    <el-col :span="6">
                        <el-input placeholder="0" :number="true" size="large" v-model="awardForm.gameRate">
                            <template slot="append">%</template>
                        </el-input>
                    </el-col>
                    <el-col :span="6">
                        这意味着每100次抽奖5次获奖
                    </el-col>
                </el-row>
            </el-form-item>


            <el-form-item label="奖项设置" prop="" class="setSign">

                <el-row :gutter="20" v-for="item of awardForm.awardList">
                    <el-col :span="3">
                        <el-input v-model="item.grade" size="large"></el-input>
                    </el-col>
                    <el-col :span="4" class="title">
                        <el-input v-model="item.name" size="large" placeholder="奖品名称"></el-input>
                    </el-col>
                    <el-col :span="10">
                        <el-input  v-model="item.num"   placeholder="奖品数量"></el-input >
                    </el-col>


                    <el-button icon="delete" @click.native.prevent="removeItem(item)" title="删除"></el-button>

                    <el-dropdown trigger="click" style="margin-left: 10px;color: #20a0ff;">
                        <el-button>
                            移动<i class="el-icon-caret-bottom el-icon-right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="moveTop(item)">置顶</el-dropdown-item>
                            <el-dropdown-item @click.native="moveUp(item)">上移</el-dropdown-item>
                            <el-dropdown-item @click.native="moveDown(item)">下移</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-row>

                <el-row>
                    <el-col :span="14" :offset="5">
                        <el-button :span="24" type="primary" size="large" @click.native="addItem">添加更多</el-button>
                    </el-col>
                </el-row>
            </el-form-item>


        </el-form>


    </div>
</template>
<script>

    export default {
        name: 'step2',
        data: function () {
            return {
                imgUrl: '',
                awardForm: {
                    numLimit: '无限制',
                    gameMostPrize: '',
                    gameRate: '5',


                    awardList: [
                        {grade: '一等奖', name:'奖品名称',num:0 },
                        {grade: '二等奖', name:'奖品名称',num:0 },


                    ]
                }
            }
        },
        watch: {
            awardForm: {
                handler: function () {
                    this.$store.commit('setAwardForm', this.awardForm);
                },
                deep: true
            }
        },
        methods: {
            onSubmit: function () {
                console.log('submit!');
            },
            addItem: function () {
                var o = ["一", "二", "三", "四", "五", "六", "七", "八", "九"]
                var n = this.awardForm.awardList ? this.awardForm.awardList.length : 0;
                this.awardForm.awardList.push({
                    grade: o[n] + '等奖',
                    name: '奖品名称',
                    num: 0

                });
            },
            removeItem: function (item) {
                var index = this.awardForm.awardList.indexOf(item);
                this.awardForm.awardList.splice(index, 1);
            },

            moveTop: function (item) {
                var index = this.awardForm.awardList.indexOf(item);
                if (index != 0) {
                    this.awardForm.awardList.splice(index, 1);
                    this.awardForm.awardList.splice(0, 0, item);
                }
            },
            moveUp: function (item) {
                var index = this.awardForm.awardList.indexOf(item);
                if (index != 0) {
                    this.awardForm.awardList.splice(index, 1);
                    this.awardForm.awardList.splice(index - 1, 0, item);
                }
            },
            moveDown: function (item) {
                var index = this.awardForm.awardList.indexOf(item);
                var max = this.awardForm.awardList.length;
                if (index != max) {
                    this.awardForm.awardList.splice(index, 1);
                    this.awardForm.awardList.splice(index + 1, 0, item);
                }
            },
            createQRcode: function () {
                console.log('生成二维码');
                this.$notify.info({
                    title: '消息',
                    message: '该功能正在完善中'
                });
            }
        },
        created: function () {
            Object.assign(this.awardForm, this.$store.state.activity.awardForm);
        }
    }
</script>
<style>
    .step2 .setSign .el-row {
        line-height: 40px;
        margin-bottom: 10px;
    }

    .step2 .title {
        text-align: right;
    }

    .step2 .router-link {
        color: #333;
    }

    .step2 .el-button-primary .router-link {
        color: #fff;
    }

    /* dialog 的大小 */
    .step2 .el-dialog--small {
        min-width: 400px;
        max-width: 500px;
    }

    .list-enter-active, .list-leave-active {
        transition: all 1s;
    }

    .list-enter, .list-leave-active {
        opacity: 0;
        transform: translateY(30px);
    }

</style>
