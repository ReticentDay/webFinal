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

  dbNewsRef.on('value',function(snapshot){
    var list = Object.keys(snapshot.val());
    dbNewsRef.child(list[list.length - 1]).on('value',function(snapshot){
      var data = snapshot.val();
      var title = data.title;
      var text = data.text.split("\n");
      var userPhoto = data.photoURL;

      $(".main__content__body__img").css("background-image",'url(' + userPhoto + ')');
      var $titleElement = $("<h1></h1>");
      var $pElement = $("<p></p>");
      $titleElement.html(title);
      $pElement.html(text[0] + "<br />" + text[1] + "<br />" + text[2] + "......");
      $(".main__content__body").append($titleElement);
      $(".main__content__body").append($pElement);
    });
    for(var i = list.length - 2;i >= list.length - 4 && i >= 0;i--){
      dbNewsRef.child(list[i]).on('value',function(snapshot){
        var data = snapshot.val();
        var title = data.title;
        var text = data.text.split("\n");
        var userPhoto = data.photoURL;

        var divElement = $("<div class='main__content__more slid_box'></div>");
        divElement.html("<p>" + title + "</p>");
        $("main__content").append(divElement);
      });
    }
  });
});
