import '@/css/exp-eva.less'
import $ from 'jquery'
import API from '@/utils/api'
import Pagination from '@dxy/pure-components/dist/pagination'
// or
// import { Pagination } from '@dxy/pure-components'

$('.main-t').find('span').on('click', function () {
  $(this).addClass('active').siblings('span').removeClass('active')
})
$('.main-t').find('.eva').on('click', function () {
  $('.main-b-l').show()
  $('.main-b-r').hide()
})
$('.main-t').find('.deep-eva').on('click', function () {
  $('.main-b-l').hide()
  $('.main-b-r').show()
})
const clickPageHandler = function (newPage, oldPage) {
  this.update({
    cur: newPage
  })
  let oPage = newPage.toString()
  API.getEvaData({page: oPage, size: '2'}, {}).done(function (e) {
    if (e.success) {
      console.log(e.data)
      $('.evalist').html('')
      let $oUl = $('<ul></ul>')
      for (let i = 0; i < e.data.length; i++) {
        let $oLi = `<li class="clearfix">
                      <div class="eva-list-l"></div>
                      <div class="eva-list-r">
                        <p class="name-date clearfix"><span class="name-date-l">${e.data[i].id}</span><span class="name-date-r">${e.data[i].pubDate}</span></p>
                        <div class="per-content">${e.data[i].body}</div>
                        <div class="zan clearfix"><p><span>点赞</span><i>${e.data[i].numOfLiked}</i><span>评论</span><b>${e.data[i].commentNum}</b></p><a href="/eyecare-exp/feedback?id=${e.data[i].id}" class="lookdetail">查看详情</a></div>
                      </div>
                    </li>`
        $oUl.append($oLi)
      }
      $('.evalist').html($oUl)
    }
  }).fail(function (error) {
    console.log(error)
  })
}
API.getEvaData({page: '1', size: '2'}, {}).done(function (e) {
  if (e.success) {
    $('.main-b-l').find('.page').find('.total i').html(e.total)
    new Pagination({
      ele: '#pagination',
      cur: 1,
      limit: 2,
      total: e.total,
      clickPageHandler
    })
    console.log(e.data)
    $('.evalist').html('')
    let $oUl = $('<ul></ul>')
    for (let i = 0; i < e.data.length; i++) {
      let $oLi = `<li class="clearfix">
                    <div class="eva-list-l"></div>
                    <div class="eva-list-r">
                      <p class="name-date clearfix"><span class="name-date-l">${e.data[i].id}</span><span class="name-date-r">${e.data[i].pubDate}</span></p>
                      <div class="per-content">${e.data[i].body}</div>
                      <div class="zan clearfix"><p><span>点赞</span><i>${e.data[i].numOfLiked}</i><span>评论</span><b>${e.data[i].commentNum}</b></p><a href="/eyecare-exp/feedback?id=${e.data[i].id}" class="lookdetail">查看详情</a></div>
                    </div>
                  </li>`
      $oUl.append($oLi)
    }
    $('.evalist').html($oUl)
  }
}).fail(function (error) {
  console.log(error)
})
