<template>
  <div class="wrap">
    <div class="content">
      <div class="preview-area">
        <iframe :src="releaseUrl"
                frameborder="0"></iframe>
      </div>
      <div class="setting">
        <div class="info">
          <div class="label">设置信息</div>
          <el-input class="input"
                    v-model="title"
                    @blur="saveTitle"
                    placeholder="请输入标题"></el-input>
          <el-input class="input"
                    v-model="description"
                    @blur="saveDescription"
                    placeholder="请输入描述"
                    type="textarea"></el-input>
        </div>
        <div class="qrcode">
          <div class="label">手机扫码分享给好友</div>
          <div class="code">
            <div class="size">
              <canvas style="float: left" id="canvas"></canvas>
              <el-radio-group class="radios" v-model="qrcodeSize">
                <el-radio :label="500">500x500</el-radio>
                <el-radio :label="1000">1000x1000</el-radio>
                <el-radio :label="2000">2000x2000</el-radio>
                <el-button @click="downQRcode">下载二维码</el-button>
              </el-radio-group>
            </div>
          </div>
          <div class="link">
            <div class="link-title">
              链接地址：
            </div>
            <div class="href">
              <input type="text" id="releaseUrl" v-model="releaseUrl">
              </div>
            <el-button type="info" @click="copyUrl">复制链接</el-button>
          </div>
          <!--<div class="edit" @click="edit"><el-button style="width:180px" type="primary" icon="edit">编   辑</el-button></div>-->
        </div>
      </div>
      <div class="close" @click="close">
        <i class="el-icon-close"></i>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.wrap {
  position: fixed;
  top: 10px;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(74, 74, 74, 0.5);
  z-index: 1001;
  overflow-y: scroll;
  justify-content: center;
  align-items: center;
  display: flex;
  .content {
    position: relative;
    width: 798px;
    height: 518px;
    background: #fff;
    border: 1px solid #d6d6d6;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    padding: 20px;
    .preview-area {
      width: 340px;
      height: 480px;
      border: 1px solid #d6d6d6;
      float: left;
      iframe {
        width: 100%;
        height: 100%;
      }
    }
    .setting {
      color: #4a4a4a;
      font-size: 14px;
      float: right;
      width: 380px;
      .info {
        .input {
          margin-top: 10px;
        }
        .label{
          color:black;
          font-size:15px;
        }
      }
      .qrcode {
        margin-top: 20px;
      }
      .code {
        .size {
          float: left;
          .radios {
            width: 80px;
            margin-top: 5px;
            margin-left: 30px;
            label {
              margin-left: 0px;
              margin-top: 10px;
            }
            button {
              margin-top: 15px;
            }
          }
        }
      }
      .link {
        width:100%;
        overflow: scroll;
        .link-title {
          margin: 10px 0;
        }
        .href {
          width: 280px;
          line-height: 36px;
          margin-right: 10px;
          overflow: scroll;
          float: left;
          input {
            border: 0;
            color: blue;
            width: 100%;
          }
        }
      }
      .edit {
        text-align: center;
        margin-top:20px;
      }
    }
  }
  .close {
    position: absolute;
    color: #fff;
    right: -30px;
    top:10px;
    cursor: pointer;
  }
}
</style>

<script>
import QRCode from 'qrcode'
import config from '@/config'
import tools from '@/utils/tools'
export default {
  props: {
    item: {
      type: Object
    }
  },
  data () {
    return {
      releaseUrl: 'http://' + window.location.host + '/activity/' + this.item.objectId + '',
      title: this.item.name || '',
      description: this.item.description || '',
      qrcodeSize: 500
    }
  },
  methods: {
    edit () {
      var canvas = document.getElementById('canvas')
      QRCode.toCanvas(canvas, this.releaseUrl, (err) => {
        console.log(err)
      })
      let openUrl = 'http://' + window.location.host + '/#/h5editor?itemId=' + this.item.objectId
      window.open(openUrl)
    },
    downQRcode () {
      QRCode.toDataURL(this.releaseUrl, {scale: Math.ceil(this.qrcodeSize / 40)}, (err, url) => {
        console.log(err)
        url = url.replace(/^data:image\/[^;]/, 'data:application/octet-stream')
        window.open(url)
      })
    },
    copyUrl () {
      document.querySelector('#releaseUrl').select()
      document.execCommand('copy')
    },
    close () {
      this.$emit('hideView')
    },
    saveTitle () {
      if (this.title === this.$store.state.editor.editorTheme.title) return
      this.save()
    },
    saveDescription () {
      if (this.description === this.$store.state.editor.editorTheme.description) return
      this.save()
    },
    save () {
      this.$store.commit('UPDATE_THEME_DES', {title: this.title, description: this.description})
      this.$store.dispatch('saveTheme', tools.vue2json(this.$store.state.editor.editorTheme)).then(() => {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      })
    }
  },
  mounted () {
    var canvas = document.getElementById('canvas')
    QRCode.toCanvas(canvas, this.releaseUrl, {scale: 4}, (err) => {
      console.log(err)
    })
  }
}
</script>
