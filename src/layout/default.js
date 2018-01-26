import '@/css/reset.less'
import '@/css/layout.less'
import 'babel-polyfill'
import $ from 'jquery'
import isMobile from '@/utils/isMobile.js'
;(function () {
  if (isMobile) {
    ;(function () {
      function adjustHTMLFontSize () {
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 375 * 100 + 'px'
      }
      adjustHTMLFontSize()
      console.log(document.documentElement.clientWidth)
      window.addEventListener('resize', adjustHTMLFontSize)
    })()
    let shhi = true
    $('.icon').on('click', function () {
      if (shhi) {
        $('#nav').css('top', '.5rem')
        shhi = false
      } else {
        $('#nav').css('top', '-999rem')
        shhi = true
      }
    })
  }
  let oA = $('#nav').find('li a')
  let $bstop = true
  let $a
  if (window.location.pathname == '/home') {
    $a = 0
  } else if (window.location.pathname == '/eyecare-exp') {
    $a = 1
  }
  oA.eq($a).addClass('active')
  oA.hover(function () {
    $(this).addClass('active').parent('li').siblings('li').children('a').removeClass('active')
    $(this).on('click', function () {
      $a = $(this).parent('li').index()
      $(this).addClass('active').parent('li').siblings('li').children('a').removeClass('active')
      $bstop = false
    })
  }, function () {
    if ($bstop) {
      $(this).removeClass('active')
      oA.eq($a).addClass('active')
    }
    $bstop = true
  })
})()
