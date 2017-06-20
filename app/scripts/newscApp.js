var $ = require('jquery');
$(document).ready(function(){
  var config = {
    apiKey: "AIzaSyBrwPvRwMy_5sWzIjLE091kOH6Vi0yGXAQ",
    authDomain: "webfinal-cfc6a.firebaseapp.com",
    databaseURL: "https://webfinal-cfc6a.firebaseio.com",
    projectId: "webfinal-cfc6a",
    storageBucket: "webfinal-cfc6a.appspot.com",
    messagingSenderId: "988982167674"
  };
  firebase.initializeApp(config);
  var dbNewsRef = firebase.database().ref().child('newsList');

  var Request = new Object();
  Request = GetRequest();
  function GetRequest() {
       var url = location.search;
       var theRequest = new Object();
       if (url.indexOf("?") != -1) {
          var str = url.substr(1);
          strs = str.split("&");
          for(var i = 0; i < strs.length; i++) {
             theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
          }
       }
       return theRequest;
  }

  var $idName = Request["id"];
  dbNewsRef.child($idName).on('value',function(snapshot){
    var data = snapshot.val();
    var title = data.title;
    var textList = data.text.split("\n");
    var userPhoto = data.photoURL;
    var text = "";
    textList.forEach(function(key,value){
      text += key + "<br />"
    });
    $(document).attr("title", "熄燈-最新消息(" + title + ")");
    $(".fb-share-button").attr( "data-href","https://reticentday.github.io/webFinal/app/newsc.html?id=" + title);
    $(".fb-share-button:a").attr( "href","https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Freticentday.github.io%2FwebFinal%2Fapp%2Fnewsc.html?id=" + title + "&amp;src=sdkpreparse");
    $(".main__content__body__img").css("background-image",'url(' + userPhoto + ')');
    var $titleElement = $("<h1></h1>");
    var $pElement = $("<p></p>");
    $titleElement.html(title);
    $pElement.html(text);
    $(".main__content__body").append($titleElement);
    $(".main__content__body").append($pElement);
  });
  dbNewsRef.on('value',function(snapshot){
    var list = Object.keys(snapshot.val());
    for(var i = list.length - 1;i >= list.length - 3 && i >= 0;i--){
      dbNewsRef.child(list[i]).on('value',function(snapshot){
        var data = snapshot.val();
        var title = data.title;
        var text = data.text.split("\n");
        var userPhoto = data.photoURL;

        var $divElement = $("<div class='main__slid__slid-box  slid_box'>");
        var $h1Element = $("<h1></h1>")
        var $hrElement = $("<hr>");
        var $pImgElement = $("<p></p>");
        var $duvBtwElement = $("<div class='main__slid__slid-box__content'></div>");
        var $formElement = $("<form action='newsc.html' method='get'></form>");
        var $hideElement = $("<input type='hidden' name='id'>");
        var $btwElement = $("<input class='main_content__button botton' type='submit' name='send' value='繼續閱讀'>");

        $divElement.attr({"id": title});
        $hideElement.attr({"value": title});
        $h1Element.text(title);
        $pImgElement.html(text[0] + "<br />" + text[1] + "<br />" + text[2] + "......");
        $formElement.append($hideElement);
        $formElement.append($btwElement);
        $duvBtwElement.append($h1Element);
        $duvBtwElement.append($pImgElement);
        $divElement.append($duvBtwElement);
        $divElement.append($formElement);
        $(".main__slid").append($divElement);
      });
    }
  });
});
