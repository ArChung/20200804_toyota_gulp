function init_header() {

  // moblie header btn
  $('#header .menuBtn,#header .clozBtn,#header li').click(() => {
    $('#header #menu').toggleClass('active');
  });


  $('#header li').click(function () {
    var t = $(this);
    ChungTool.pageScrollAni($(`.menuPage-${t.attr('data-menu')}`).offset().top-50)
  });
}