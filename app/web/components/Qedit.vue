<template>
    <div>
        <div class="quill-editor"
             v-model="content"
             ref="myTextEditor"

             @change="onChange"
             v-quill:myQuillEditor="editorOption">
        </div>
        <crop-upload
                v-model="showCrop"
                :width="width"
                :height="height"
                :fileName="fileName"
                :uploadUrl="uploadUrl"
                @uploadSuccess="onUploadSuccess"
        ></crop-upload>
    </div>
</template>
<script>

    import CropUpload from './CropUpload';

    export default {
        props: {
            /*编辑器的内容*/
            value: {
                type: String
            },
            /*上传图片的地址*/
            uploadUrl: {
                type: String
            },
            /*上传图片的file控件name*/
            fileName: {
                type: String
            },
            /*图片大小*/
            maxSize: {
                type: Number,
                default: 400//kb
            },
            /*使用使用裁切*/
            canCrop: {
                type: Boolean,
                default: false
            },
            /*裁切的最小尺寸*/
            width: {
                type: Number,
                default: 200
            },
            /*裁切的最小尺寸*/
            height: {
                type: Number,
                default: 200
            }
        },
        data() {
            return {
                content: '',
                editorOption: {
                    modules: {
                        toolbar: {
//                            container: [['image']],
//
//                            handlers: {
//                                'image': this.imgClick
//                            }
                        }
                    }
                    // some quill options
                },
                /*显示裁切控件*/
                showCrop: false
            }
        },
        methods: {
            onChange() {
                this.$emit('input', this.content)
            },
            /*选择上传图片切换*/
            onFileChange(e) {
                var fileInput = e.target;
                if (fileInput.files.length == 0) {
                    return;
                }
                if (fileInput.files[0].size > 1024 * 1024 * this.maxSize) {
                    alert('图片过大');
                    return;
                }
                if (!this.uploadUrl) {
                    console.log('no editor uploadUrl');
                    return;
                }
                var self = this;
                var data = new FormData;
                data.append(this.fileName, fileInput.files[0], name);
                alert(this.editor)
               // this.editor.focus();
                var xhr = new XMLHttpRequest();
                xhr.open('post', this.uploadUrl);
                xhr.responseType = 'json';
                xhr.send(data);
                xhr.onload = function () {
                    if (xhr.status == 200) {
                        self.editor.insertEmbed(self.editor.getSelection().index, 'image', xhr.response.url);
                    }
                }
            },
            /*裁切上传成功 res根据上传接口值获取*/
            onUploadSuccess: function (res) {
                this.editor.focus();
                this.editor.insertEmbed(this.editor.getSelection().index, 'image', res.url);
            },
            /*点击上传图片按钮*/
            imgClick() {

                if (this.canCrop) {
                    this.showCrop = true;
                } else {
                    /*创建input file 不裁切，自己控制*/
                    var input = document.createElement('input');
                    input.type = 'file';
                    input.name = this.fileName;
                    input.accept = 'image/jpeg,image/png,image/jpg,image/gif';
                    input.onchange = this.onFileChange;
                    input.click();
                }
            },

        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quill;
            }
        },
        components: {

            CropUpload
        },
        mounted() {
            this.content = this.value;
        },
        watch: {
            'value'(newVal, oldVal) {
                if (this.editor) {
                    if (newVal !== this.content) {
                        this.content = newVal
                    }
                }
            },
        }
    }
</script>
