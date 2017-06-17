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

  dbNewsRef.limitToLast(10).on('child_added',function(snapshot){
    var data = snapshot.val();
    var title = data.title;
    var text = data.text.split("\n");
    var userPhoto = data.photoURL;

    var $divElement = $("<div class='main_content slid_box'>");
    var $h1Element = $("<h1></h1>")
    var $hrElement = $("<hr>");
    var $pImgElement = $("<p></p>");
    var $formElement = $("<form action='newsc.html' method='get'></form>");
    var $hideElement = $("<input type='hidden' name='id'>");
    var $btwElement = $("<input class='main_content__button botton' type='submit' name='send' value='繼續閱讀'>");

    $divElement.attr({"id": title});
    $hideElement.attr({"value": title});
    $h1Element.text(title);
    $pImgElement.html(text[0] + "<br />" + text[1] + "<br />" + text[2] + "......");
    $formElement.append($hideElement);
    $formElement.append($btwElement);
    $divElement.append($h1Element);
    $divElement.append($hrElement);
    $divElement.append($pImgElement);
    $divElement.append($formElement);
    $(".main").append($divElement);
  });


});
