const { protocol, host } = window.location
const root = `${protocol}//${host}/business-altra/`

const mockRoot = 'http://f2e.dxy.net/mock-api/client/'

// 是否开启mock代理，0：不代理；1：代理线上；2：代理测试
const mockProxy = 0

const apiMap = {
  // demo
  // example: submit: ['post', 'submit', '5a002f098eda7f5e17603a10']
  demo: ['post', 'apiPath', 'mockId'],
  // 提交评论
  postComment: ['post', 'postComment', '59c3972a2020816224588b97'],
  // 评论列表
  getCommentList: ['get', 'commentList', '5a00260afe6c765e1d113564'],
  // 文章点赞
  likeArticle: ['post', 'likeArticle', '59c3962e629d0c621de80f79'],
  // 评论顶踩
  evaTop: ['post', 'evaTop', '59c397c5c4959e6217974d6e'],
  // 获取问卷数据接口
  getFormItem: ['get', 'getFormItem', '5a7176c9d0c5ad66a020651a'],
  // 提交表单接口
  submit: ['post', 'submit', '5a717ad556479566b7b58088'],
  // 体验测评报告
  getEvaData: ['get', 'getEvaData', '5a72b9b0dd8cf766aae6a9a9'],
  // 文件列表
  fileList: ['get', 'fileList', '5a72ca6a6559a566b05267b9'],
  // 文件保存
  fileSave: ['post', 'fileSave', '5a72c7c556479566b7b58227'],
  // 文件删除
  fileRemove: ['post', 'fileRemove', '5a72c95156479566b7b5822c']
}

const apis = {}

for (let api in apiMap) {
  const data = apiMap[api]
  let url = `${root}${data[1]}`
  if (process.env.MOCK_DATA && data[2]) {
    url = `${mockRoot}${data[2]}`
    if (mockProxy) {
      url += `?_mockProxyStatus=${mockProxy}`
    }
  }
  apis[api] = {
    url,
    method: data[0]
  }
}

export default apis
