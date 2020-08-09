function init_motus(){
  // index
  Motus.addAnimation(new Motus.Animation({
    $el: $('#ani-tag-1-1')[0],
    keyframes: [{
      translateY: -50,
    }, {
      translateY: 200,
    }, ],
  }));


  Motus.addAnimation(new Motus.Animation({
    $el: $('#ani-tag-1-2')[0],
    keyframes: [{
      translateY: 50,
    }, {
      translateY: -50,
    }, ],
  }));


  // 瘦子

  Motus.addAnimation(new Motus.Animation({
    $el: $('#ani-tag-2-1')[0],
    keyframes: [{
      translateY: 0,
    }, {
      translateY: -250,
    }, ],
  }));

  Motus.addAnimation(new Motus.Animation({
    $el: $('#ani-tag-2-2')[0],
    keyframes: [{
      translateY: 0,
    }, {
      translateY: -150,
    }, ],
  }));

  Motus.addAnimation(new Motus.Animation({
    $el: $('#ani-tag-2-3')[0],
    keyframes: [{
      translateY: 0,
    }, {
      translateY: 100,
    }, ],
  }));


  // 許允樂

  Motus.addAnimation(new Motus.Animation({
    $el: $('#ani-tag-3-1')[0],
    keyframes: [{
      translateY: 250,
    }, {
      translateY: 0,
    }, ],
  }));

  Motus.addAnimation(new Motus.Animation({
    $el: $('#ani-tag-3-2')[0],
    keyframes: [{
      translateY: 150,
    }, {
      translateY: 0,
    }, ],
  }));

  Motus.addAnimation(new Motus.Animation({
    $el: $('#ani-tag-3-3')[0],
    keyframes: [{
      translateY: 0,
    }, {
      translateY: 100,
    }, ],
  }));

  // Yin & Yei

  Motus.addAnimation(new Motus.Animation({
    $el: $('#ani-tag-4-1')[0],
    keyframes: [{
      translateY: 0,
    }, {
      translateY: -250,
    }, ],
  }));

  Motus.addAnimation(new Motus.Animation({
    $el: $('#ani-tag-4-2')[0],
    keyframes: [{
      translateY: 0,
    }, {
      translateY: -150,
    }, ],
  }));

  Motus.addAnimation(new Motus.Animation({
    $el: $('#ani-tag-4-3')[0],
    keyframes: [{
      translateY: 0,
    }, {
      translateY: 100,
    }, ],
  }));



  Motus.addAnimation(new Motus.Animation({
    $el: $('#ani-tag-5-1')[0],
    keyframes: [{
      translateY: 0,
    }, {
      translateY: 100,
    }, ],
  }));
}