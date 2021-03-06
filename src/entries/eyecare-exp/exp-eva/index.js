import '@/css/exp-eva.less'
import $ from 'jquery'
import API from '@/utils/api'
import Pagination from '@dxy/pure-components/dist/pagination'
// or
// import { Pagination } from '@dxy/pure-components'

$('.main-t').find('span').on('click', function () {
  $(this).addClass('active').siblings('span').removeClass('active')
})
const clickPageHandler = function (newPage, oldPage) {
  this.update({
    cur: newPage
  })
  let oPage = newPage.toString()
  API.getEvaData({page: oPage, size: '2'}, {}).done(function (res) {
    if (res.success) {
      console.log(res.data)
      $('.evalist').html('')
      const oLi = res.data.map(item => `<li class="clearfix">
                                          <div class="eva-list-l"><img src='${item.avatar}'/></div>
                                          <div class="eva-list-r">
                                            <p class="name-date clearfix"><span class="name-date-l">${item.author}</span><span class="name-date-r">${item.pubDate}</span></p>
                                            <div class="per-content">${item.body}</div>
                                          <div class="zan clearfix"><p><span>点赞</span><i>${item.numOfLiked}</i><span>评论</span><b>${item.commentNum}</b></p><a href="/altra/eyecare-exp/feedback?id=${item.id}" class="lookdetail">查看详情</a></div>
                                          </div>
                                        </li>`).join('')
      $('.evalist').html(`<ul>${oLi}</ul>`)
    }
  }).fail(function (error) {
    console.log(error)
  })
}
const expEva = function (ele, type) {
  API.getEvaData({page: '1', size: '2', type: type}, {}).done(function (res) {
    if (res.success) {
      $('.main').find('.page').find('.total i').html(res.total)
      $(ele).html('')
      new Pagination({
        ele: ele,
        cur: 1,
        limit: 2,
        total: res.total,
        clickPageHandler
      })
      console.log(res)
      $('.evalist').html('')
      const oLi = res.data.map(item => `<li class="clearfix">
                                          <div class="eva-list-l"><img src='${item.avatar}'/></div>
                                          <div class="eva-list-r">
                                            <p class="name-date clearfix"><span class="name-date-l">${item.author}</span><span class="name-date-r">${item.pubDate}</span></p>
                                            <div class="per-content">${item.body}</div>
                                          <div class="zan clearfix"><p><span>点赞</span><i>${item.numOfLiked}</i><span>评论</span><b>${item.commentNum}</b></p><a href="/altra/eyecare-exp/feedback?id=${item.id}" class="lookdetail">查看详情</a></div>
                                        </div>
                                        </li>`).join('')
      $('.evalist').html(`<ul>${oLi}</ul>`)
    }
  }).fail(function (error) {
    console.log(error)
  })
}
$('.main-t').find('.eva').on('click', function () {
  $('.main-b-l').show()
  $('.main-b-r').hide()
  expEva('#pagination1', 1)
})
$('.main-t').find('.deep-eva').on('click', function () {
  $('.main-b-l').hide()
  $('.main-b-r').show()
  expEva('#pagination2', 2)
})
expEva('#pagination1')

