import Survey from '@/components/survey'
import API from '@/utils/api'
import Uploader from '@dxy/pure-components/dist/uploader'
import isMobile from '@/utils/isMobile'

const deleted = () => {
  API.fileRemove({id: '123'}).done(function (res) {
    console.log(res)
  }).fail(function (error) {
    console.log(error)
  })
}
const successed = () => {
  API.fileRemove({fileid: '123', type: 'jpg'}).done(function (res) {
    console.log(res)
  }).fail(function (error) {
    console.log(error)
  })
}
const onfinished = () => {
  API.fileList().done(function (res) {
    let filedata = res.results.data
    new Uploader({
      container: '#uploader-image',
      accept: 'image/*',
      multiple: true,
      files: filedata,
      onDelete: deleted,
      onSuccess: successed
    })
    let oTxt = `上传图片<span>，参与深度体验</span>`
    document.getElementById('uploader-image').getElementsByClassName('upload')[0].innerHTML = oTxt
    if (isMobile) {
      document.getElementById('uploader-image').getElementsByClassName('select')[0].innerHTML = `<span></span>`
    }
  }).fail(function (error) {
    console.log(error)
  })
}
new Survey({
  container: '#servey',
  get: () => API.getFormItem({
    sid: 103784
  }),
  submit: API.submit,
  onfinished
})
import '@/css/submitback.less'

