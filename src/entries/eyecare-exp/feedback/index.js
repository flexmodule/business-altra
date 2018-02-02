import API from '@/utils/api'
import $ from 'jquery'
import DxyShare from '@dxy/pure-components/dist/dxyShare'
new DxyShare({
  container: '#share'
})

import Comment from '@dxy/pure-components/dist/comment'
new Comment({
  articleId: 123123,
  container: '#comment-list',
  getCommentList: API.getCommentList,
  postComment: API.postComment,
  isLogged: !!window.username,
  bury: API.evaTop
})
console.log(API)
import '@/css/feedback.less'

// API.getCommentList({id: '123123', page: '1', limit: '2'}, {}).done(function (res) {
//   console.log(res)
// }).fail(function (error) {
//   console.log(error)
// })

