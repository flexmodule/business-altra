import '@/css/exp-eva.less'
import $ from 'jquery'
$('.main-t').find('a').on('click', function () {
  $(this).addClass('active').siblings('a').removeClass('active')
})
