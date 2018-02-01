import API from '@/utils/api'
import DxyShare from '@dxy/pure-components/dist/dxyShare'
// or
// import { DxyShare } from '@dxy/pure-components'
new DxyShare({
  container: '#share'
})
import Pagination from '@dxy/pure-components/dist/pagination'
// or
// import { Pagination } from '@dxy/pure-components'

import '@/css/feedback.less'

import $ from 'jquery'
$('#content').on('focus', function () {
  $(this).css('color', '#333')
})
$('#content').on('blur', function () {
  $(this).css('color', '#999')
})
$('#btn').on('click', function () {
  let $con = $('#content').html()
  API.postComment({id: '123', content: $con}).done(function (e) {
    console.log(e)
  }).fail(function (error) {
    console.log(error)
  })
})
// 点赞
API.likeArticle({id: '123'}).done(function (e) {
  if (e.success) {
    $('.zan').find('span').html(e.info.total)
  }
  console.log(e)
}).fail(function (error) {
  console.log(error)
})
$('.zan').find('i').on('click', function () {
  let self = this
  API.likeArticle({id: '123'}).done(function (e) {
    if (e.success) {
      let $oNum = parseInt(e.info.total) + 1
      $(self).parents('.zan').find('span').html($oNum)
    }
    console.log(e)
  }).fail(function (error) {
    console.log(error)
  })
})
const clickPageHandler = function (newPage, oldPage) {
  this.update({
    cur: newPage
  })
  let oPage = newPage.toString()
  API.getCommentList({id: '123', page: oPage, size: '2'}, {}).done(function (e) {
    if (e.success) {
      $('.comment-list-t').html('')
      let $oUl = $('<ul></ul>')
      for (let i = 0; i < e.items.message.list.length; i++) {
        let $oLi = `<li class="clearfix">
                      <div class="comment-list-l"></div>
                      <div class="comment-list-r">
                        <p class="name-date clearfix"><span class="name-date-l">${e.items.message.list[i].username}</span><span class="name-date-r">${e.items.message.list[i].created}</span></p>
                        <div class="per-content">${e.items.message.list[i].body}</div>
                        <p class="eva-zan"><i></i><span>${e.items.message.list[i].digg}</span><b></b></p>
                      </div>
                    </li>`
        $oUl.append($oLi)
      }
      $('.comment-list-t').html($oUl)
    }
  }).fail(function (error) {
    console.log(error)
  })
}
console.log(API)
API.getCommentList({id: '123', page: '1', size: '2'}, {}).done(function (e) {
  if (e.success) {
    $('.comment-list').find('.page').find('.total i').html(e.items.message.total)
    new Pagination({
      ele: '#pagination',
      cur: 1,
      limit: 2,
      total: e.items.message.total,
      clickPageHandler
    })
    $('.comment-list-t').html('')
    let $oUl = $('<ul></ul>')
    for (let i = 0; i < e.items.message.list.length; i++) {
      let $oLi = `<li class="clearfix">
      <div class="comment-list-l"></div>
      <div class="comment-list-r">
        <p class="name-date clearfix"><span class="name-date-l">${e.items.message.list[i].username}</span><span class="name-date-r">${e.items.message.list[i].created}</span></p>
        <div class="per-content">${e.items.message.list[i].body}</div>
        <p class="eva-zan"><i></i><span>${e.items.message.list[i].digg}</span><b></b></p>
      </div>
    </li>`
      $oUl.append($oLi)
    }
    $('.comment-list-t').html($oUl)
  }
}).fail(function (error) {
  console.log(error)
})
API.evaTop({id: '123', type: 'bury'}).done(function (e) {
  console.log(e)
  if (e.success) {
    $('.eva-zan').find('i').html(e.info.total)
  }
}).fail(function (error) {
  console.log(error)
})
$('.eva-zan').find('i').on('click', function () {

})
