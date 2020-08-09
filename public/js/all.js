"use strict";var ChungTool = ChungTool || {};
var simpleShow = simpleShow || {};
var simpleHide = simpleHide || {};

(function () {




  function isIOS() {
    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
      return true;
    } else {
      return false;
    }
  }

  function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }
  }

  function isOnline() {
    if (window.location.protocol == 'file:') {
      console.log('在本機端喔');
      return false;
    } else {
      return true;
    }
  }

  function c_simpleShow(el, during) {
    if (isNull(during)) {
      during = 0.3;
    }
    el.each(function () {
      var t = $(this);
      t.removeClass('hide');
      TweenMax.killTweensOf(t);
      var tl = new TimelineMax();
      tl.set(t, {
        autoAlpha: 0 }).

      to(t, during, {
        autoAlpha: 1 });

    });
  }

  function c_simpleHide(el, during) {
    if (isNull(during)) {
      during = 0.3;
    }
    el.each(function () {
      var t = $(this);
      var tl = new TimelineMax();
      TweenMax.killTweensOf(t);
      tl.to(t, during, {
        autoAlpha: 0 }).

      call(function () {
        t.addClass('hide');
      });
    });
    // console.log(123)
  }

  function isNull(val) {
    return typeof val === "undefined";
  }

  function initLimitText() {
    $('.limitTxt').each(function () {
      var t = $(this);
      var limitNum = parseInt(t.attr('data-limitTxtNum'), 10);
      var showBtn = t.attr('data-showBtn') == 'true' ? true : false;

      if (!isNull(limitNum)) {

        var str = t.text(); // Getting the text
        str = str.replace(/ {2,}/g, ' ');
        str = str.replace(/\n\s*\n/g, '\n');

        if (str.length > limitNum) {

          var strtemp = '<span class="hide">' + str.substr(limitNum, str.length) + '</span><a href="#" class="seeMoreContentBtn">more</a>';
          str = str.substr(0, limitNum) + '<i class="dot"> ...</i>';

          if (showBtn) {
            str += strtemp;
          }

          t.html(str);
        }
      }
    });

    $('.seeMoreContentBtn').on('click', function (e) {
      e.preventDefault();
      $(this).addClass('hide').siblings('.hide').removeClass('hide').siblings('.dot').addClass('hide');
    });

  }

  function addSwipeEvent(t, funcL, funcR) {
    // var touchObj = document.getElementById("index_banner_swipe");
    var start_x;
    var end_x;

    t.get(0).addEventListener('touchstart', touchStart, false);
    t.get(0).addEventListener('touchmove', touchMove, false);
    t.get(0).addEventListener('touchend', touchSwipe);

    function touchStart(event) {
      if (event.targetTouches.length != 1) {
        return false;
      } //單點觸控

      console.log(123);
      start_x = event.targetTouches[0].pageX;
      //alert(start_x);
    }

    function touchMove(event) {
      event.preventDefault();
      if (event.targetTouches.length != 1) {
        return false;
      } //單點觸控
      end_x = event.targetTouches[0].pageX;
      //alert(end_x - start_x);
    }

    function touchSwipe(event) {
      if (end_x - start_x > 60) {
        funcR();

      } else if (end_x - start_x < -60) {
        funcL();
      }
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  /* 清除以prefix開頭的所有class*/
  function removeClassWithFilter(elemt, prefix) {
    elemt.each(function (i, el) {
      var classes = el.className.split(" ").filter(function (c) {
        return c.lastIndexOf(prefix, 0) !== 0;
      });
      el.className = $.trim(classes.join(" "));
    });
  };

  /* 回傳以prefix開頭的class拿掉以prefix開頭後的文字*/
  function returnClassNameWithFilter(elemt, prefix) {
    var arr;
    elemt.each(function (i, el) {
      arr = el.className.split(" ").filter(function (c) {
        return c.lastIndexOf(prefix, 0) == 0;
      });
    });

    $.each(arr, function (index, value) {
      arr[index] = value.replace(prefix, "");
    });
    return arr;
  };

  /* 用來算中英混合的長度 */
  function txtByteLength(str) {

    if (str == null) return 0;
    if (typeof str != "string") {
      str += "";
    }
    return str.replace(/[^\x00-\xff]/g, "01").length;

  }

  function maxlengthInpout(el, num) {
    el.on('keyup', function () {
      //get the limit from maxlength attribute  
      var limit = num;
      //get the current text inside the textarea  
      var text = $(this).val();
      //count the number of characters in the text  
      var chars = text.length;

      console.log(chars);
      //check if there are more characters then allowed  
      if (chars > limit) {
        //and if there are use substr to get the text before the limit  
        var new_text = text.substr(0, limit);

        //and change the current text with the new text  
        $(this).val(new_text);
      }
    });
  }



  function addYouTube(el, vid) {
    el.empty().append('<iframe allowfullscreen="" frameborder="0" height="100%" width="100%" src="http://www.youtube.com/embed/' + vid + '?rel=0&autoplay=1"></iframe>');
  }

  function getDivBgImage(el) {
    return el.css('background-image').replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
  }

  function replayCssAni(el, className) {
    el.removeClass(className);
    el.offset().width = el.offset().width;
    el.addClass(className);

  }

  function int(s) {
    return parseInt(s, 10);
  }

  // $.fn.enterKey = function(fnc) {
  //     return this.each(function() {
  //         $(this).keypress(function(ev) {
  //             var keycode = (ev.keyCode ? ev.keyCode : ev.which);
  //             if (keycode == '13') {
  //                 fnc.call(this, ev);
  //             }
  //         })
  //     })
  // }


  function getAtagElement() {
    var element = document.getElementById('share-a-tag');
    if (element === null) {
      element = document.createElement('a');
      element.style = "display: none;";
      element.id = 'share-a-tag';
      element.target = "_blank";
      document.getElementsByTagName('body')[0].appendChild(element);
    }
    return element;
  };

  function shareToLine(s) {
    var element = getAtagElement();
    element.href = 'http://line.naver.jp/R/msg/text/?' + encodeURIComponent(s);

    element.click();

  }

  function pageScrollAni(top) {
    var $body = window.opera ? document.compatMode == "CSS1Compat" ? $('html') : $('body') : $('html,body');
    $body.animate({
      scrollTop: top },
    800);
  }

  function isPhone() {
    var testExp = new RegExp('Android|webOS|iPhone|iPad|' +
    'BlackBerry|Windows Phone|' +
    'Opera Mini|IEMobile|Mobile',
    'i');
    return testExp.test(navigator.userAgent);
  }

  function lockScroll() {

    var scrollPosition = [
    self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
    self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop];

    var html = jQuery('body'); // it would make more sense to apply this to body, but IE7 won't have that
    html.data('scroll-position', scrollPosition);
    html.data('previous-overflow', html.css('overflow'));
    html.css('overflow', 'hidden');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

    $(document.body).on("touchmove", preventScroll);
  }

  function unLockScroll() {
    var html = jQuery('body');
    var scrollPosition = html.data('scroll-position');

    if (!isNull(scrollPosition)) {
      html.css('overflow', html.data('previous-overflow'));
      window.scrollTo(scrollPosition[0], scrollPosition[1]);
      $(document.body).off("touchmove", preventScroll);
    }


  }

  function preventScroll(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  // scrollTop() ie 都只會傳回0
  function windoePosTop() {
    return typeof window.pageYOffset != 'undefined' ? window.pageYOffset : document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ? document.body.scrollTop : 0;
  }
  function addSwipeUpDownEvent(el, upFunc, downFunc) {
    // var touchObj = document.getElementById("index_banner_swipe");
    var start_y;
    var end_y;
    var t = el;

    t.get(0).addEventListener('touchstart', touchStart, false);
    t.get(0).addEventListener('touchmove', touchMove, false);
    t.get(0).addEventListener('touchend', touchSwipe);

    function touchStart(event) {

      if (event.targetTouches.length != 1) {
        return false;
      } //單點觸控
      start_y = end_y = event.targetTouches[0].pageY;

    }

    function touchMove(event) {
      event.preventDefault();
      if (event.targetTouches.length != 1) {
        return false;
      } //單點觸控
      end_y = event.targetTouches[0].pageY;
      t.css('margin-top', end_y - start_y);
    }

    function touchSwipe(event) {


      t.css('margin-top', 0);
      if (end_y - start_y > 100) {
        upFunc();

      } else if (end_y - start_y < -100) {
        downFunc();
      }
    }
  }

  function addWheelEvent(el, upFunc, downFunc) {
    var mousewheelevt = /Firefox/i.test(navigator.userAgent) ? "DOMMouseScroll" : "mousewheel"; //FF doesn't recognize mousewheel as of FF3.x
    var scrollable = true;
    var timer = null;





    el.mousewheel(function (event) {
      // console.log(event.deltaX, event.deltaY, event.deltaFactor);

      if (timer) {
        clearTimeout(timer);
        timer = null;

      }

      timer = setTimeout(function () {
        // console.log('done');
        timer = null;
        scrollable = true;
      }, 100);


      if (!scrollable) {
        return;
      } else {
        scrollable = false;
      }


      if (event.deltaY > 0) {
        upFunc();
      } else {
        downFunc();
      }


    });


  }

  function isIe() {
    if (document.documentMode || /Edge/.test(navigator.userAgent)) {

      return true;
    } else {

      return false;
    }

  }

  function scrollReachEnd(el) {
    return el.scrollTop() + el.innerHeight() >= el[0].scrollHeight;
  }
  function scrollReachTop(el) {
    return el.scrollTop() == 0;
  }


  function checkIdle(delay, func, func2) {
    idleTimer = null;
    idleState = false;
    idleWait = delay;

    $('*').bind('touchend touchmove touchstart', function () {


      clearTimeout(idleTimer);

      if (idleState == true) {
        func2();
      }

      idleState = false;

      idleTimer = setTimeout(function () {

        // Idle Event
        func();

        idleState = true;
      }, idleWait);
    });

    $("body").trigger("touchend");
  }

  function openGoogleApp(s) {
    var element = getAtagElement();
    if (isIOS()) {
      element.href = 'comgooglemaps://?q=' + encodeURIComponent(s);
    } else {
      element.href = 'https://maps.google.com/?q=' + encodeURIComponent(s);
    }
    element.click();
  }


  ChungTool.openGoogleApp = openGoogleApp;

  ChungTool.checkIdle = checkIdle;
  ChungTool.scrollReachTop = scrollReachTop;
  ChungTool.scrollReachEnd = scrollReachEnd;
  ChungTool.isIe = isIe;
  ChungTool.addWheelEvent = addWheelEvent;

  ChungTool.addSwipeUpDownEvent = addSwipeUpDownEvent;

  ChungTool.windoePosTop = windoePosTop;
  ChungTool.lockScroll = lockScroll;
  ChungTool.unLockScroll = unLockScroll;
  ChungTool.isPhone = isPhone;

  ChungTool.pageScrollAni = pageScrollAni;
  //shareToLine
  ChungTool.shareToLine = shareToLine;
  //a tag
  ChungTool.getAtagElement = getAtagElement;
  // 轉成數字
  ChungTool.int = int;
  // 重跑css animation
  ChungTool.replayCssAni = replayCssAni;
  // 取得背景圖案
  ChungTool.getDivBgImage = getDivBgImage;
  // 加 youtube 到 el 裡
  ChungTool.addYouTube = addYouTube;
  // 限制input的最大輸入數
  ChungTool.maxlengthInpout = maxlengthInpout;
  // 計算中英文的長度 (中文2英文1)
  ChungTool.txtByteLength = txtByteLength;
  // 移除特定開頭的class
  ChungTool.removeClassWithFilter = removeClassWithFilter;
  // 回傳以prefix開頭的class拿掉以prefix開頭後的文字 
  ChungTool.returnClassNameWithFilter = returnClassNameWithFilter;
  ChungTool.capitalizeFirstLetter = capitalizeFirstLetter;
  ChungTool.addSwipeEvent = addSwipeEvent;
  ChungTool.initLimitText = initLimitText;
  ChungTool.getUrlParameter = getUrlParameter;
  ChungTool.isOnline = isOnline;
  ChungTool.isNull = isNull;
  ChungTool.isIOS = isIOS;
  simpleShow = c_simpleShow;
  simpleHide = c_simpleHide;


})();

function init_base() {
  const INIT_VIEWPORT = true;
  const VIEWPORT_WIDTH = 375;


  /////////////////////////////////////////////
  //        更改 meta 上的 viewport           //
  /////////////////////////////////////////////

  if (INIT_VIEWPORT) {
    const sUserAgent = navigator.userAgent.toLowerCase();
    const bIsAndroid = sUserAgent.match(/android/i) == "android";
    const viewport = document.querySelector("meta[name=viewport]");

    if (bIsAndroid) {
      const deviceWidth = screen.width;
      const getTargetDensitydpi = VIEWPORT_WIDTH / deviceWidth * window.devicePixelRatio * 160;
      const targetDensitydpi = `target-densitydpi=${getTargetDensitydpi}, width=${VIEWPORT_WIDTH}, user-scalable=no`;

      viewport.setAttribute('content', targetDensitydpi);
    } else {
      viewport.setAttribute('content', `width=${VIEWPORT_WIDTH} user-scalable=0`);

    }
  }



  /////////////////////////////////////////////
  //              fastclick                  //
  /////////////////////////////////////////////

  FastClick.attach(document.body);

}




init_base();


$(document).ready(() => {
  init_header();
  init_index();
  init_moblie_content();

  initPagesView();
  init_igWall();
  init_motus();
});






function init_moblie_content() {
  $('.moreBlock').click(function () {
    $(this).closest('.content').toggleClass('m-showfullContent');
  });
}




function initPagesView() {
  setInterval(function () {
    const st = $(window).scrollTop();
    let activePageId;
    $('.menuPage').each((index, el) => {
      const point = $(el).offset().top + $(el).height();
      activePageId = index;
      if (point > st + 200) {
        return false;
      }
    });

    $('#menu li').eq(activePageId).addClass('active').siblings('li').removeClass('active');;
  }, 100);
  // window.addEventListener('scroll', () => {

  // })
}
function init_header() {

  // moblie header btn
  $('#header .menuBtn,#header .clozBtn,#header li').click(() => {
    $('#header #menu').toggleClass('active');
  });


  $('#header li').click(function () {
    var t = $(this);
    ChungTool.pageScrollAni($(`.menuPage-${t.attr('data-menu')}`).offset().top - 50);
  });
}
let loading = false;
let pageSize = 20;
let page = 0;
let $gridLoading = $('.grid-loading');
let $grid;


$.fn.isInViewPort = function (offset) {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();
  return elementBottom > viewportTop && elementTop < viewportBottom && elementBottom < viewportBottom - offset;
};


function init_igWall() {
  initPicWall();
  nextPage();
}

function initPicWall() {
  $grid = $('.grid').masonry({
    // options
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    gutter: '.gutter-sizer',
    percentPosition: true });


  $grid.imagesLoaded().progress(function () {
    $grid.masonry('layout');
  });



  $(window).on('scroll', function (e) {
    if ($gridLoading != null && $gridLoading.isInViewPort(-50)) {
      nextPage();
    }
  });
}

function nextPage() {
  console.log(456);
  if (loading) {
    return;
  }
  page++;
  toggleLoading(true);
  $.get(`../demoJson/${page}.json?page_size=${pageSize}&page=${page}`, function (response, status) {
    console.log(response);
    if (response.data.length == 0) {
      noMoreData();
      return;
    }
    // console.log(response.data);

    for (var i in response.data) {
      var entry = response.data[i];
      var $element = $('#grid-item-tpl').clone();
      $element.attr('id', 'grid-item-' + entry.id);
      $element.css('visibility', 'hidden');
      $element.find('a').attr('href', entry.permalink);
      $element.find('img').attr('src', entry.media_url);
      $element.find('.like_count').text(entry.like_count);
      $element.find('.comments_count').text(entry.comments_count);
      $element.find('p').text(entry.caption.substr(0, 50) + '...');
      $grid.append($element).masonry('appended', $element);
    }
    $grid.imagesLoaded().
    progress(function (instance, image) {
      let $gridItem = $(image.img).parents('.grid-item');
      $gridItem.css('visibility', 'visible');
      $grid.masonry('layout');
    }).
    always(function (instance) {
      toggleLoading(false);
    });
  });
}


function toggleLoading(show) {
  loading = show;
  $gridLoading.css('visibility', show ? 'visible' : 'hidden');
}

function noMoreData() {
  loading = false;
  $gridLoading.remove();
  $gridLoading = null;
}
function init_index() {
  console.log('init_index');



}



function init_motus() {
  // index
  Motus.addAnimation(new Motus.Animation({
    $el: $('#ani-tag-1-1')[0],
    keyframes: [{
      translateY: -50 },
    {
      translateY: 200 }] }));




  Motus.addAnimation(new Motus.Animation({
    $el: $('#ani-tag-1-2')[0],
    keyframes: [{
      translateY: 50 },
    {
      translateY: -50 }] }));




  // 瘦子

  Motus.addAnimation(new Motus.Animation({
    $el: $('#ani-tag-2-1')[0],
    keyframes: [{
      translateY: 0 },
    {
      translateY: -250 }] }));



  Motus.addAnimation(new Motus.Animation({
    $el: $('#ani-tag-2-2')[0],
    keyframes: [{
      translateY: 0 },
    {
      translateY: -150 }] }));



  Motus.addAnimation(new Motus.Animation({
    $el: $('#ani-tag-2-3')[0],
    keyframes: [{
      translateY: 0 },
    {
      translateY: 100 }] }));




  // 許允樂

  Motus.addAnimation(new Motus.Animation({
    $el: $('#ani-tag-3-1')[0],
    keyframes: [{
      translateY: 250 },
    {
      translateY: 0 }] }));



  Motus.addAnimation(new Motus.Animation({
    $el: $('#ani-tag-3-2')[0],
    keyframes: [{
      translateY: 150 },
    {
      translateY: 0 }] }));



  Motus.addAnimation(new Motus.Animation({
    $el: $('#ani-tag-3-3')[0],
    keyframes: [{
      translateY: 0 },
    {
      translateY: 100 }] }));



  // Yin & Yei

  Motus.addAnimation(new Motus.Animation({
    $el: $('#ani-tag-4-1')[0],
    keyframes: [{
      translateY: 0 },
    {
      translateY: -250 }] }));



  Motus.addAnimation(new Motus.Animation({
    $el: $('#ani-tag-4-2')[0],
    keyframes: [{
      translateY: 0 },
    {
      translateY: -150 }] }));



  Motus.addAnimation(new Motus.Animation({
    $el: $('#ani-tag-4-3')[0],
    keyframes: [{
      translateY: 0 },
    {
      translateY: 100 }] }));





  Motus.addAnimation(new Motus.Animation({
    $el: $('#ani-tag-5-1')[0],
    keyframes: [{
      translateY: 0 },
    {
      translateY: 100 }] }));


}
//# sourceMappingURL=all.js.map
