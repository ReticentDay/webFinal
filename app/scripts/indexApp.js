var $ = require('jquery');
$(document).ready(function(){
  var i = 0;
  $(".entrance").click(function () {
    i = 1;
    $(".entrance__img").attr("src","./img/lightoff.png");
    $(".all-bosy").fadeOut(2000);
    setTimeout(function(){
      document.location.href="main.html";
    },2000);
  });
  $(".entrance").hover(function() {
    $(".entrance__img").attr("src","./img/lighton_lit.png");
  },function() {
    if (i == 0) {
      $(".entrance__img").attr("src","./img/lighton.png");
    }else{
      $(".entrance__img").attr("src","./img/lightoff.png");
    }
  });
});
