
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

}

function initPicWall() {
  $grid = $('.grid').masonry({
    // options
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    gutter: '.gutter-sizer',
    percentPosition: true
  });

  $grid.imagesLoaded().progress(function () {
    $grid.masonry('layout');
  });





  if (!$('#pic-section').hasClass('ex')) {
    $(window).on('scroll', function (e) {
      if ($gridLoading != null && $gridLoading.isInViewPort(-50)) {
        nextPage();
      }
    });
    nextPage();
  } else {
    initEventPicWall();
  }
}


function initEventPicWall() {
  const num = 59;
  for (var i = 1; i <= num; i++) {
    var $element = $('#grid-item-tpl2').clone();
    $element.find('a').attr('href', `./images/eventPhoto/ex${('0' + i).slice(-2)}.jpg`);
    $element.find('img').attr('src', `./images/eventPhoto/ex${('0' + i).slice(-2)}-s.jpg`);
    $grid.append($element).masonry('appended', $element);
    $element.attr('data-src',`./images/eventPhoto/ex${('0' + i).slice(-2)}.jpg`);

  }

  $grid.imagesLoaded()
    .progress(function (instance, image) {
      let $gridItem = $(image.img).parents('.grid-item');
      $gridItem.css('visibility', 'visible');
      $grid.masonry('layout');
    })
    .always(function (instance) {
      toggleLoading(false);
    });

    lightGallery(document.getElementById('eventPhotos'));
}

function nextPage() {
  // console.log(456);
  if (loading) {
    return;
  }
  page++;
  toggleLoading(true);
  $.get(`https://event.catchad.com.tw/v2/api/event/toyota_life100/hashtag/entries?page_size=${pageSize}&page=${page}`, function (response, status) {
    // console.log(response);
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
    $grid.imagesLoaded()
      .progress(function (instance, image) {
        let $gridItem = $(image.img).parents('.grid-item');
        $gridItem.css('visibility', 'visible');
        $grid.masonry('layout');
      })
      .always(function (instance) {
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