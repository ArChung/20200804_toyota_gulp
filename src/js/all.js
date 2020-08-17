init_base();


$(document).ready(() => {
  init_header();
  // init_index();
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
  setInterval(function(){
    const st = $(window).scrollTop();
    let activePageId;
    $('.menuPage').each((index, el) => {
      const point = $(el).offset().top + $(el).height();
      activePageId = index;
      if (point > st + 200) {
        return false;
      }
    })

    $('#menu li').eq(activePageId).addClass('active').siblings('li').removeClass('active');;
  },100);
  // window.addEventListener('scroll', () => {
    
  // })
}