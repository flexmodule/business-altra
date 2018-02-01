import * as validateRegExp from './validateRegExp'
import Cascading from '@dxy/cascading-list-v3'
import { renderResult } from './tpl'
import './index.less'
import Uploader from '@dxy/pure-components/dist/uploader'
const isMobile =
  window.navigator &&
  window.navigator.userAgent &&
  !!window.navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)
console.log(isMobile)
const cascadingConfig = {
  area: {
    data: 'dataLocation',
    dataUrl:
      'https://assets.dxycdn.com/core/widgets/cascading-list-v2/data/location.js',
    panelNames: ['省份', '城市', '区县']
  },
  section: {
    data: 'dataDivision',
    dataUrl:
      'https://assets.dxycdn.com/core/widgets/cascading-list-v2/data/division.js'
  },
  hospital: {
    type: 'hospital',
    data: 'dataLocation2Level',
    dataUrl:
      'https://assets.dxycdn.com/core/widgets/cascading-list-v2/data/location_2level.js',
    panelNames: ['等级', '医院'],
    panelWidth: ['30', '70']
  }
}

export default class Survey {
  constructor ({ get, submit, username, container, needLogin = false }) {
    this.getFormItem = get
    this.submitForm = submit
    this.initElement()
    this.items = []
    this.cascadingData = {}
    this.username = username
    this.needLogin = needLogin
    this.init()
    if (container) {
      try {
        document.querySelector(container).appendChild(this.$el)
      } catch (error) {
        throw Error(`${container} 此选择器不存在`)
      }
    }
  }
  initElement () {
    this.$el = document.createElement('div')
    this.$el.className = 'survey'
    this.$form = document.createElement('form')
    this.$form.className = 'form clearfix'
    this.$submit = document.createElement('a')
    this.$submit.href = 'javascript:;'
    this.$submit.className = 'submit'
    this.$submit.innerHTML = '提交'
    this.$el.appendChild(this.$form)
  }
  init () {
    if (this.needLogin && !this.username) {
      this.$form.parentNode.innerHTML = renderResult('请先登录再填写信息')
      return
    }
    this.getFormItem().then(rs => {
      console.log(rs.form_item)// ------------------------------------------------------------------------------
      if (!rs.form_item) {
        this.$form.parentNode.innerHTML = renderResult(rs.message)
        return
      }
      if (rs.form_item.page_name === 'user_complete') {
        this.$form.parentNode.innerHTML = renderResult('您已经完成填写，谢谢您的参与。')
      } else {
        this.build(rs.form_item)
      }
    })
  }
  build (surveyData) {
    this.surveyData = surveyData
    this.items = surveyData.items_info
    console.log(surveyData.items_info)// ----------------------------------------------------------------------
    this.render()
    this.$el.appendChild(this.$submit)
    this.initEvents()
  }
  getInputType (ucValidate) {
    switch (ucValidate) {
      case 'cellphone':
        return 'tel'
      case 'email':
        return 'email'
      default:
        return 'text'
    }
  }
  render () {
    this.$form.appendChild(this.renderItems(this.items))
  }
  renderItems (items) {
    let oFragmeng = document.createDocumentFragment()
    let itemsEl = document.createElement('div')
    itemsEl.className = 'items'
    let itemsEle = document.createElement('div')
    itemsEle.className = 'items'
    items.forEach((item, index) => {
      console.log(index)
      if (index <= 16) {
        itemsEl.appendChild(this.renderItem(item))
      } else {
        itemsEle.appendChild(this.renderItem(item))
      }
    })
    oFragmeng.appendChild(itemsEl)
    oFragmeng.appendChild(itemsEle)
    return oFragmeng
  }
  wrapItemWithTitle (item, node) {
    if (!item.title) {
      return node
    }
    const fragment = document.createDocumentFragment()
    fragment.appendChild(this.renderItemTitle(item, node))
    if (item.subtitle) {
      fragment.appendChild(this.renderItemSubtitle(item))
    }
    fragment.appendChild(node)
    if (item.suffix) {
      const suffix = document.createElement('span')
      suffix.className = 'item-suffix'
      suffix.innerHTML = item.suffix
      fragment.appendChild(suffix)
    }
    return fragment
  }
  renderItemSubtitle (item) {
    const subtile = document.createElement('div')
    subtile.className = 'item-subtitle'
    // 四个空格认为是换行
    subtile.innerHTML = item.subtitle.replace(/\s\s\s\s/g, '<p></p>')
    return subtile
  }
  renderItemTitle (item) {
    const { title, required } = item
    const titleBox = document.createElement('div')
    item.error = document.createElement('span')
    item.error.className = 'error'
    const requiredTip = required ? '<em>*</em>' : ''
    titleBox.className = 'item-title'
    titleBox.innerHTML = `${requiredTip}<label>${title}</label>`
    titleBox.appendChild(item.error)

    return titleBox
  }
  renderItem (item) {
    const { itemid } = item
    const itemEl = document.createElement('div')
    itemEl.className = 'item'
    itemEl.id = `item_${itemid}`
    itemEl.appendChild(this.wrapItemWithTitle(item, this.renderItemNode(item)))
    return itemEl
  }
  renderItemNode (item) {
    switch (item.item_type) {
      case 'single_line_input':
      case 'multiple_line_input':
        return this.renderInput(item)
      case 'select':
        return this.renderSelect(item)
      case 'single_choice':
        return this.renderChoice(item, 'radio')
      case 'multiple_choices':
        return this.renderChoice(item, 'checkbox')
      case 'component_area':
        return this.renderComponent(item, 'area')
      case 'component_section':
        return this.renderComponent(item, 'section')
      case 'component_hospital':
        return this.renderComponent(item, 'hospital')
      default:
        return this.renderText(item)
    }
  }
  createItemNode (item, nodeType, attrType) {
    const node = document.createElement(nodeType)
    node.name = node.id = this.buildItemName(item)
    if (attrType) node.setAttribute('type', attrType)
    return node
  }
  buildItemName (item) {
    return `val_${item.itemid}`
  }
  buildOptionValue (opt) {
    return `${opt.id}__${opt.label}`
  }
  renderText (item) {
    const node = document.createElement('div')
    node.className = 'text'
    node.innerHTML = item.desc
    return node
  }
  renderChoice (item, choiceType) {
    const optionList = document.createElement('ul')
    optionList.className = 'check-list'
    item.optionvalue.forEach(opt => {
      const { id, label } = opt
      const option = document.createElement('li')
      const choice = this.createItemNode(item, 'input', choiceType)
      choice.id = `${item.itemid}_${id}`
      choice.value = this.buildOptionValue(opt)

      option.innerHTML = `
        ${choice.outerHTML}
        <label for=${choice.id}>
          <span class="${choiceType}"></span>
          <span class="value">${label}</span>
        </label>
      `
      optionList.appendChild(option)
    })
    return optionList
  }
  renderSelect (item) {
    const node = this.createItemNode(item, 'select')
    const placeholder = document.createElement('option')
    placeholder.innerHTML = '请选择'
    placeholder.value = ''
    node.appendChild(placeholder)

    item.optionvalue.forEach(opt => {
      const option = document.createElement('option')
      option.innerHTML = opt.label
      option.id = `${item.itemid}_${opt.id}`
      option.value = this.buildOptionValue(opt)
      node.appendChild(option)
    })
    return node
  }
  renderInput (item) {
    const { item_type: itemType, uc_validate, initvalue, itemid } = item
    const elType = itemType === 'single_line_input' ? 'input' : 'textarea'
    const node = this.createItemNode(item, elType, 'text')
    if (elType === 'input') {
      node.type = this.getInputType(uc_validate)
    }
    if (initvalue && initvalue[itemid]) {
      node.value = initvalue[itemid]
    }
    node.placeholder = item.input_prompt || `输入您的${item.title}`
    return node
  }
  renderComponent (item, componentType) {
    const { title } = item
    const node = this.createItemNode(item, 'input', 'text')
    node.className = componentType
    node.placeholder = title
    const cascading = new Cascading[isMobile ? 'Mobile' : 'Desktop']({
      type: 'common',
      confirmCallback: data => this.cascadingSelected(node, data, item),
      ...cascadingConfig[componentType]
    })
    node.onclick = event => {
      event.preventDefault()
      event.target.blur()
      cascading.open()
    }
    return node
  }
  cascadingSelected (el, data, item) {
    this.cascadingData[`val_${item.itemid}_code`] = data.id[0]
    el.value = data.pathName[0].join('-')
  }
  wrapItemWithLabel (item, node) {
    const fragment = document.createDocumentFragment()
    fragment.appendChild(this.renderItemLabel(item, node))
    fragment.appendChild(node)
    return fragment
  }
  renderItemLabel (item, target) {
    const label = document.createElement('label')
    label.innerHTML = item.title
    label.setAttribute('for', target.id)
    return label
  }
  getFormData () {
    const formData = {}
    for (let item of new FormData(this.$form).entries()) {
      const [name, value] = item
      // 如果包含 __，则为选项值，需要把 __ 前的值（为opt的id），添加到 json的key中
      if (value.indexOf('__') > -1) {
        const val = value.split('__')
        formData[`${name}_${val[0]}`] = val[1] || ''
      } else {
        formData[name] = value
      }
    }
    return {
      ...formData,
      ...this.cascadingData
    }
  }
  getCheckboxValue (item, formData) {
    const itemName = this.buildItemName(item)
    return Object.keys(formData)
      .filter(key => key.indexOf(itemName) > -1)
      .map(key => formData[key])
  }
  getRadioValue (item, formData) {
    return this.getCheckboxValue(item, formData)[0]
  }
  validateCheckbox (item, value) {
    const { required, selected_range: range } = item
    if (range && value) {
      const {
        min,
        min_message: minMessage,
        max,
        max_message: maxMessage
      } = range
      if (value.length < min) {
        item.error.innerHTML = minMessage
        return false
      } else if (value.length > max) {
        item.error.innerHTML = maxMessage
        return false
      }
    }
    if (required && !value.length) {
      item.error.innerHTML = '该选项必填'
      return false
    }
    item.error.innerHTML = ''
    return true
  }
  validateRadio (item, value) {
    const { required } = item
    if (required && !value) {
      item.error.innerHTML = '该选项必填'
      return false
    }
    item.error.innerHTML = ''
    return true
  }
  validateInput (item, value) {
    const { required, uc_validate: validate } = item
    if (required && !value) {
      item.error.innerHTML = '该选项必填'
      return false
    }
    if (validate && value) {
      const test = validateRegExp[validate.toUpperCase()].test(value)
      if (test) {
        item.error.innerHTML = ''
        return true
      }
      item.error.innerHTML = '格式不正确'
      return false
    }
    item.error.innerHTML = ''
    return true
  }
  validateItem (item, formData) {
    // 若选项没有标题，则不校验，因为没标题，错误信息无处展示，所以需要校验的选项必须要有标题
    if (!item.title) {
      return { item, validate: true }
    }
    switch (item.item_type) {
      case 'single_line_input':
      case 'multiple_line_input':
        return {
          item,
          validate: this.validateInput(item, formData[this.buildItemName(item)])
        }
      case 'select':
      case 'single_choice':
        return {
          item,
          validate: this.validateRadio(item, this.getRadioValue(item, formData))
        }
      case 'multiple_choices':
        return {
          item,
          validate: this.validateCheckbox(
            item,
            this.getCheckboxValue(item, formData)
          )
        }
      default:
        return { item, validate: true }
    }
  }
  scrollToItem ({ itemid }) {
    const $item = document.getElementById(`item_${itemid}`)
    $item.scrollIntoView()
    // 直接顶住浏览器窗口不美观，故而往下偏移60px像素
    document.documentElement.scrollTop = $item.offsetTop - 60
    document.body.scrollTop = $item.offsetTop - 60
  }
  checkValidate (items, formData) {
    const rs = items
      .map(item => this.validateItem(item, formData))
      .filter(i => !i.validate)
    if (rs.length) {
      this.scrollToItem(rs[0].item)
      return false
    } else {
      return true
    }
  }
  submit (formData) {
    if (this.submitting) return
    this.submitting = true
    console.log(formData)// ------------------------------------------------
    console.log(this.surveyData)// ------------------------------------
    this.$submit.innerHTML = '提交中'
    let { survey_info: { fid, sid }, user_info: userInfo } = this.surveyData
    fid = Number(fid)// -------------------------------
    console.log(typeof fid)// -------------------------------
    this.submitForm({
      ...formData,
      ...userInfo,
      fid,
      sid
    })
      .then(rs => {
        if (rs.success) {
          this.buildResultPage(rs)
        } else {
          console.log(rs)
          alert('未知错误，请刷新重试')
        }
      })
      .always(_ => {
        this.submitting = false
        this.$submit.innerHTML = '提交'
      })
  }
  buildResultPage ({ post_result = {}, redirect_url }) {
    const { page_info, page_name, page_type } = post_result
    if (page_name === 'user_complete' && page_type === 'status_page') {
      const { desc, title } = page_info
      let oHtml = `<div class="main2">
      <div class="apply-info">
        <div class="apply-logo"></div>
        <div class="message">您的申请已经完成</div>
        <div class="handinfo"></div>
        <h3>继续参与深度体验</h3>
        <p>感谢您参加康澈产品免费体验活动，活动产品全程免费提供。</p>
        <p>你可以继续参与深度体验，但需在活动申请前，及试用结束后分别提交医院开具的明视持久度体检单。</p>
      </div>
      <div class="deep-apply">
        <h3>上传图片</h3>
        <div class="reminder"><p><span>温馨提示：</span>体检后拍照上传医院开具的体检单，图片大小 10M 以内，格式 jpg</p></div>
        <div id="uploader-image"></div>
      </div>
    </div>`
      this.$el.parentNode.parentNode.innerHTML = oHtml
      new Uploader({
        container: '#uploader-image',
        accept: 'image/*',
        multiple: true
      })
      let oTxt = `上传图片<span>，参与深度体验</span>`
      document.getElementById('uploader-image').getElementsByClassName('upload')[0].innerHTML = oTxt
      if (isMobile) {
        document.getElementById('uploader-image').getElementsByClassName('select')[0].innerHTML = `<span></span>`
      }
    } else {
      window.location.reload()
    }
  }
  initEvents () {
    this.$submit.onclick = event => {
      const formData = this.getFormData()
      if (this.checkValidate(this.items, formData)) {
        this.submit(formData)
      }
    }
  }
}

{ /* <div class="file">
  <p><input type="file" id="file"><label for="file">选择文件</label></p>
  <span>选择文件后点击右侧上传按钮进行上传，完成后页面出现✔︎提示，如需删除可按✘</span>
</div>
<div class="sub">
    <button>上传图片<span>，参与深度体验</span></button>
</div> */ }
