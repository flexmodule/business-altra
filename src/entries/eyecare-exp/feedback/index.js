import API from '@/utils/api'
import $ from 'jquery'
import DxyShare from '@dxy/pure-components/dist/dxyShare'
new DxyShare({
  container: '#share'
})
let id = window.location.href.split('?')[1].split('=')[1]
import Comment from '@dxy/pure-components/dist/comment'
new Comment({
  articleId: id,
  container: '#comment-list',
  getCommentList: API.getCommentList,
  postComment: API.postComment,
  isLogged: !!window.username,
  bury: API.diggAndBury
})
console.log(API)
import '@/css/feedback.less'

$('.zan').on('click', function () {
  let self = this
  API.likeArticle({id: id}).done(function (res) {
    if (res.success) {
      let zanNum = Number($(self).find('span').html())
      zanNum += 1
      $(self).find('span').html(zanNum)
    }
    console.log(res)
  }).fail(function (error) {
    console.log(error)
  })
})

