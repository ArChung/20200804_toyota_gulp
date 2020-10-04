function init_header() {

  // moblie header btn
  $('#header .menuBtn,#header .clozBtn,#header li').click(() => {
    $('#header #menu').toggleClass('active');
  });


  $('#header .jBtn').click(function () {
    var t = $(this);
    jump(t.attr('data-menu'));
  });

  const page = ChungTool.getUrlParameter('page');
  if(page){
    jump(page);
  }

  function jump(s){
    ChungTool.pageScrollAni($(`.menuPage-${s}`).offset().top-50);
  }
}