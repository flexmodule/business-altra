import Survey from '@/components/survey'
import API from '@/utils/api'
import Uploader from '@dxy/pure-components/dist/uploader'
import isMobile from '@/utils/isMobile'
const { protocol, host } = window.location
const root = `${protocol}//${host}/altra`
const successed = (file, result) => {
  console.log(file, result)
  API.saveFile({fileid: result.results.id, type: 2}).done(function (res) {
    file.id = res.id
  }).fail(function (error) {
    console.log(error)
  })
  document.getElementById('uploader-image').getElementsByClassName('upload')[0].style.cssText = 'opacity:.2;'
}
const changeColor = () => {
  document.getElementById('uploader-image').getElementsByClassName('upload')[0].style.cssText = 'opacity:1;'
}
const onDelete = () => {
  API.fileList().done(function (res) {
    let filelength = document.getElementById('uploader-image').getElementsByClassName('file-list-item').length
    if (res.results.data.length === filelength) {
      document.getElementById('uploader-image').getElementsByClassName('upload')[0].style.cssText = 'opacity:.2;'
    }
  }).fail(function (error) {
    console.log(error)
  })
}
const beforeDelete = (file) => {
  console.log(document.getElementById('uploader-image').getElementsByClassName('file-list-item'))
  if (file.id) {
    let fileid = file.id.toString()
    API.deleteFile({id: fileid}).done(function (res) {
      console.log(res)
    }).fail(function (error) {
      console.log(error)
    })
  }
}
const onfinished = () => {
  API.fileList().done(function (res) {
    console.log(res)
    let filedata = res.results.data
    let filearr = []
    for (let i = 0; i < filedata.length; i++) {
      if (filedata[i].filetype === '2') {
        filedata[i].uploaded = true
        filearr.push(filedata[i])
      }
    }
    new Uploader({
      container: '#uploader-image',
      accept: 'image/jpg',
      multiple: true,
      files: filearr,
      onSuccess: successed,
      beforeDelete: beforeDelete,
      onDelete: onDelete,
      uploadConfig: {
        bizCheckUri: '/altra/upload/check',
        origin: root,
        type: 1,
        error (e) {
          console.log('失败了')
        }
      }
    })
    let oTxt = `上传图片<span>，参与深度体验</span>`
    document.getElementById('uploader-image').getElementsByClassName('upload')[0].innerHTML = oTxt
    document.getElementById('uploader-image').getElementsByClassName('action')[0].getElementsByClassName('tip')[0].innerHTML = '选择文件后点击下方上传图片按钮进行上传，完成后页面出现✓提示，如需删除可按×'
    document.getElementById('uploader-image').getElementsByClassName('action')[0].getElementsByTagName('input')[0].addEventListener('change', changeColor)
    if (isMobile) {
      document.getElementById('uploader-image').getElementsByClassName('select')[0].innerHTML = `<span></span>`
    }
  }).fail(function (error) {
    console.log(error)
  })
}
const buildDemo = (self) => {
  let oHtml = `<div class="main2">
  <div class="apply-info">
    <div class="apply-logo"></div>
    <div class="message">提交成功</div>
    <div class="handinfo"></div>
    <h3>上传深度体验体检单</h3>
    <p>参与深度体验用户，请拍照上传明视持久度体检单</p>
  </div>
  <div class="deep-apply">
    <h3>上传图片</h3>
    <div class="reminder"><p><span>温馨提示：</span>体检后拍照上传医院开具的体检单，图片大小 10M 以内，格式 jpg</p></div>
    <div id="uploader-image"></div>
  </div>
</div>`
  self.$el.parentNode.parentNode.innerHTML = oHtml
  onfinished && onfinished()
}
new Survey({
  container: '#servey',
  get: () => API.getFormItem({
    sid: 103784
  }),
  submit: API.submit,
  buildDemo
})
import '@/css/submitback.less'

