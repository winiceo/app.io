<template>
    <div class="step1">
        <!-- element表单组件 -->
        <el-form :model="ruleForm" class="demo-ruleForm" :rules="rules" ref="ruleForm" label-position="top">
            <!-- 表单项，prop属性表示要进行表单验证，验证规则对应为rules的属性name -->
            <el-form-item label="活动名称" prop="name">
                <el-input v-model="ruleForm.name" size="large"></el-input>
            </el-form-item>


            <el-form-item label="活动时间" required style="width: 750px;">
                <el-date-picker size="large" style="width: 400px;"
                                v-model="activityDateRanage"
                                type="datetimerange"


                                placeholder="选择时间范围">
                </el-date-picker>

            </el-form-item>

            <!--<el-form-item label="报名时间" required style="width: 750px;">-->
            <!--<el-col :span="5">-->
            <!--<el-form-item prop="signStartTimeDate">-->
            <!--<el-date-picker-->
            <!--v-model="ruleForm.signStartTimeDate"-->
            <!--type="date"-->
            <!--placeholder="报名开始日期">-->
            <!--</el-date-picker>-->
            <!--</el-form-item>-->
            <!--</el-col>-->

            <!--<el-col :span="5">-->
            <!--<el-form-item prop="signStartTimeTime">-->
            <!--<el-time-select-->
            <!--placeholder="请选择时间点"-->
            <!--v-model="ruleForm.signStartTimeTime"-->
            <!--:picker-options="{start: '00:00',step: '00:15', end: '23:45'}">-->
            <!--</el-time-select>-->
            <!--</el-form-item>-->
            <!--</el-col>-->

            <!--<el-col :span="1" style="text-align: center;">—</el-col>-->

            <!--<el-col :span="5">-->
            <!--<el-form-item prop="signEndTimeDate">-->
            <!--<el-date-picker-->
            <!--v-model="ruleForm.signEndTimeDate"-->
            <!--type="date"-->
            <!--placeholder="报名结束日期">-->
            <!--</el-date-picker>-->
            <!--</el-form-item>-->
            <!--</el-col>-->

            <!--<el-col :span="5">-->
            <!--<el-form-item prop="signEndTimeTime">-->
            <!--<el-time-select-->
            <!--placeholder="请选择时间点"-->
            <!--v-model="ruleForm.signEndTimeTime"-->
            <!--:picker-options="{start: '00:00',step: '00:15',end: '23:45'}">-->
            <!--</el-time-select>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
            <!--</el-form-item>-->


            <!--<el-form-item label="活动地点" required>-->

            <!--&lt;!&ndash; 自己封装的一个二级联动地址选择器 &ndash;&gt;-->
            <!--<address-select-->
            <!--:province="ruleForm.province"-->
            <!--:city="ruleForm.city"-->
            <!--:detail="ruleForm.detail"-->
            <!--:isAddressTrue="isAddressTrue"-->
            <!--&gt;</address-select>-->
            <!--</el-form-item>-->

            <el-form-item label="活动人数">
                <el-row>
                    <el-col :span="6" style="width: 187px;">
                        <el-radio class="radio" v-model="ruleForm.activePerson" label="无限制">无限制</el-radio>
                        <el-radio class="radio" v-model="ruleForm.activePerson" label="限制">限制</el-radio>
                    </el-col>
                    <el-col :span="6">
                        <el-input placeholder="0" :number="true" size="large" v-model="ruleForm.activePersonNum"
                                  :disabled=" ruleForm.activePerson == '无限制' ">
                            <template slot="append">人</template>
                        </el-input>
                    </el-col>
                </el-row>
            </el-form-item>

            <el-form-item label="活动说明">
                <!--<el-input-->
                        <!--type="textarea"-->
                        <!--placeholder="请输入内容"-->
                        <!--:autosize="{minRows: 4, maxRows: 8}"-->
                        <!--v-model="ruleForm.activeDescribe">-->
                <!--</el-input>-->


                <div class="quill-editor"
                     v-model="ruleForm.activeDescribe"
                     v-quill:myQuillEditor="editorOption">
                </div>
                <!--<Qedit ref="myTextEditor"-->
                        <!--:fileName="'myFile'"-->
                        <!--:canCrop="canCrop"-->
                        <!--:uploadUrl="uploadUrl"-->
                       <!--:content="ruleForm.activeDescribe"-->
                        <!--v-model="ruleForm.activeDescribe"></Qedit>-->

                <!-- Or manually control the data synchronization（手动控制数据流）  -->
                <!--<div class="quill-editor"-->
                <!--:content="ruleForm.activeDescribe"-->
                <!--@change="onEditorChange($event)"-->
                <!--v-quill:myQuillEditor="editorOption">-->
                <!--</div>-->


            </el-form-item>


        </el-form>


    </div>
</template>

<style  >
    .quill-editor {

        padding-bottom: 1em;
        height: 100px;

    }

</style>
<script>

    //    if (process.BROWSER_BUILD) {
    //         var editor =require( '@/components/Quilleditor.vue')
    //    }
    import  Qedit   from '@/components/Qedit'


    import addressSelect from '@/component/address.vue'
    //import { fetchL } from '@/api/activity'

    var IMGUR_CLIENT_ID = 'bcab3ce060640ba';
    var IMGUR_API_URL = 'https://api.imgur.com/3/image';


    export default {
        name: 'step1',
        components: {
            'address-select': addressSelect,
            Qedit

        },
        data: function () {
            //验证活动日期
            var validateDate = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('活动日期不能为空'));
                } else if (value > this.ruleForm.endTimeDate) {
                    callback(new Error('结束日期不能小于开始日期!'));
                } else {
                    callback();
                }
            };
            return {
                editorOption: {
                    modules: {
                        toolbar: {

                            handlers: {
                                'image': function(){
                                    alert(333)
                                }
                            }
                        }
                    }
                    // some quill options
                },
                canCrop: false,
                /*测试上传图片的接口，返回结构为{url:''}*/
                uploadUrl: 'http://localhost:4000/api/upload',

                test: '',
                tagsValid: false,
                tagsError: '请设置标签',
                isAddressTrue: false,
                dialogFormVisible: false,
                dialogFormFenLeiVisible: false,
                dialogForm: {name: ''},
                dialogFormFenLei: {name: ''},
                ruleFormChange: false,
                ruleFormValid: false,
                rules: {
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'change'}
                    ],
                    startTimeData: [
                        {required: true, message: '请选择活动开始日期', trigger: 'change'},
                        {validator: validateDate, trigger: 'change'}
                    ],
                    endTimeDate: [{required: true, message: '请选择活动结束日期', trigger: 'change'}],

                },
                activityDateRanage: [new Date(), new Date()],
                ruleForm: {
                    name: '新抽奖活动',
                    cate: 'dzp',
                    activePerson: '无限制',
                    startTimeData: new Date(),
                    endTimeData: new Date(),
                    activePersonNum: '',
                    activeDescribe: ''

                }
            };
        },
        watch: {
            ruleForm: {
                handler: function (val, oldVal) {

                    //this.$store.commit('setRuleForm',this.ruleForm);

                    this.$store.dispatch('setRuleForm', this.ruleForm)
                    // this.tagsValid = !this.ruleForm.tags.length ? '' : false;
                    this.ruleFormChange = true;
                },
                deep: true
            },
            activityDateRanage: {
                handler: function (val, oldVal) {
                    this.ruleForm.startTimeData = val[0]
                    this.ruleForm.endTimeData = val[1]
                    console.log(this.ruleForm)

                }
            }
        },
        methods: {
            imageHandler: function (image, callback) {
                alert(3333)
                var data = new FormData();
                data.append('image', image);

                var xhr = new XMLHttpRequest();
                xhr.open('POST', IMGUR_API_URL, true);
                xhr.setRequestHeader('Authorization', 'Client-ID ' + IMGUR_CLIENT_ID);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        var response = JSON.parse(xhr.responseText);
                        if (response.status === 200 && response.success) {
                            callback(response.data.link);
                        } else {
                            var reader = new FileReader();
                            reader.onload = function (e) {
                                callback(e.target.result);
                            };
                            reader.readAsDataURL(image);
                        }
                    }
                }
                xhr.send(data);
            },
            handleReset: function () {
                this.$refs.ruleForm.resetFields();
            },
            handleSubmit: function (ev) {
            },
            handleRemove: function (file, fileList) {
                console.log(file, fileList);
            },
            handlePreview: function (file) {
                console.log(file);
            },
            handleSuccess: function () {
            },
            handleError: function () {
            },
            showDialog: function () {
                if (this.ruleForm.tags.length >= 5) {
                    this.$message({
                        message: '最多设置5个标签',
                        type: 'warning'
                    });
                } else {
                    this.dialogFormVisible = true;
                    this.dialogForm = {};
                }
            },
            handleClose: function (tag) {
                var index = this.ruleForm.tags.indexOf(tag);
                this.ruleForm.tags.splice(index, 1);
            },
            handleCloseFenLei: function (fenLei) {
                var index = this.ruleForm.fenLeis.indexOf(fenLei);
                this.ruleForm.fenLeis.splice(index, 1);
            },
            handleAdd: function (tag, form, tags) {
                if (tag && tag.trim().length !== 0) {
                    var isExist = false;
                    tag = tag.trim();
                    for (var i = 0; i < tags.length; i++) {
                        if (tags[i].name == tag) {
                            isExist = true;
                            break
                        }
                    }
                    if (isExist) {
                        this.$message({
                            message: '该标签已存在',
                            type: 'warning'
                        });
                    } else {
                        this.dialogFormVisible = false;
                        this.dialogFormFenLeiVisible = false;
                        tags.push({
                            name: tag
                        });
                    }
                } else {
                    this.$message({
                        message: '标签不能为空',
                        type: 'warning'
                    });
                }
            },
            openAd: function () {
                this.$message('该功能正在完善');
            },

        },
        created: function () {
            var vm = this;
            var item = this.$store.state.activity.ruleForm
            var objectId = this.$route.params.id;
            if (objectId !== "0") {

                this.$store.dispatch('getActivityByObjectId', objectId).then((data) => {

                    Object.assign(vm.ruleForm, data);
                }).catch(() => {
                })
            } else {
                Object.assign(vm.ruleForm, item);
            }

            setTimeout(function () {
                vm.ruleFormChange = false;
            })
        },
        beforeRouteLeave: function (to, from, next) {

            if (to.name == 'edit_step2') {
                var _this = this;


                this.$refs.ruleForm.validate(function (valid) {

                    valid ? next() : next(false);
                });
            } else {
                next();
            }
        }
    }
</script>
<style>
    .step {
        margin-bottom: 30px;
    }

    .step1 .demo-ruleForm .el-form-item {
        margin-bottom: 25px;
        margin-right: 50px;
    }

    .step1 .el-form-item.is-required .el-form-item__label:after {
        content: '*';
        color: #ff4949;
        margin-right: 4px;
    }

    .step1 .el-form-item.is-required .el-form-item__label:before {
        display: none;
    }

    /* 标签 */
    .step1 .el-tag {
        padding: 10px 15px;
        margin: 10px;
        vertical-align: middle;
        height: auto;
    }

    .step1 .el-tag:first-child {
        margin-left: 0;
    }

    /* 对话框 */
    .step1 .el-dialog--small {
        width: 564px;
    }

    .step1 .el-dialog__body {
        padding-bottom: 0;
    }

    .step1 .el-dialog__body .el-form-item {
        margin-bottom: 10px;
    }

    .step1 .el-dialog__wrapper .el-button {
        margin-left: 15px;
    }

    /* 时间选择器 */
    .step1 .el-date-editor {
        width: 150px;
    }

    .step1 .el-form-item .router-link {
        color: #fff;
    }

    .el-form-item__error {
        white-space: nowrap;
    }
</style>
