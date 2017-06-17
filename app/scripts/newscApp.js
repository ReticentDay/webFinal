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

    $(".main__content__body__img").attr({"src": userPhoto});
    var $titleElement = $("<h1></h1>");
    var $pElement = $("<p></p>");
    $titleElement.html(title);
    $pElement.html(text);
    $(".main__content__body").append($titleElement);
    $(".main__content__body").append($pElement);
  });

});
