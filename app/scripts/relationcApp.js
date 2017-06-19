var $ = require('jquery');
$(document).ready(function(){
  var $inputAppElement = $("<input class='main__content__body__text__input app' type='text' name='app' value=''>");
  var $inputKwElement = $("<input class='main__content__body__text__input kw' type='text' name='kw' value=''>");
  var $inputHourElement = $("<input class='main__content__body__text__input hour' type='text' name='hour' value=''>");
  var $divElement = $("<div class='main__content__body__text'></div>");
  $divElement.append($inputAppElement);
  $divElement.append($inputKwElement);
  $divElement.append($inputHourElement);
  $(".main__content__body__pluse").before($divElement);

  $(".main__content__body__pluse__button").click(function(){
    var $inputAppElement = $("<input class='main__content__body__text__input app' type='text' name='app' value=''>");
    var $inputKwElement = $("<input class='main__content__body__text__input kw' type='text' name='kw' value=''>");
    var $inputHourElement = $("<input class='main__content__body__text__input hour' type='text' name='hour' value=''>");
    var $divElement = $("<div class='main__content__body__text'></div>");
    $divElement.append($inputAppElement);
    $divElement.append($inputKwElement);
    $divElement.append($inputHourElement);
    $(".main__content__body__pluse").before($divElement);
  });
  $(".main__content__body__count").click(function() {
    var count = 0;
    var max = 0;
    var maxName;
    $(".main__content__body__text").each(function(){
      var Kw = $(this).children(".kw").val() * $(this).children(".hour").val();
      if (Kw > max) {
        maxName = $(this).children(".app").val();
        max = Kw;
      }
      count += Kw;

      console.log("kw:" + Kw);
      console.log("count:" + count);
    });
    var monwy = 0;
    if (count<=120) {
      monwy = count * 2.10;
    }else if (count<=330) {
      monwy = 252 + (count-120) * 2.68;
    }else if (count<=500) {
      monwy = 546.8 + (count-330) * 3.61;
    }else if (count<=700) {
      monwy = 980 + (count-500) * 4.48;
    }else if (count<=1000) {
      monwy = 1876 + (count-700) * 5.03;
    }else{
      monwy = 3385 + (count-1000) * 5.28;
    }

    console.log(count);
    $(".main__content__body__count__asn").html("你的電價為" + Math.round(monwy) + "<br />最貴的電器為" + maxName +
    "，總共耗了" + Math.round(max) + "KW的電");
  });
});
