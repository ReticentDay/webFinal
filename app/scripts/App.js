var $ = require('jquery');
$(document).ready(function(){
  //firebase link
  var config = {
    apiKey: "AIzaSyBrwPvRwMy_5sWzIjLE091kOH6Vi0yGXAQ",
    authDomain: "webfinal-cfc6a.firebaseapp.com",
    databaseURL: "https://webfinal-cfc6a.firebaseio.com",
    projectId: "webfinal-cfc6a",
    storageBucket: "webfinal-cfc6a.appspot.com",
    messagingSenderId: "988982167674"
  };
  firebase.initializeApp(config);
  var dbChatRef = firebase.database().ref().child('newsList');

  var setText = function() {
      $(".body__list").html('<h1>Hello Webpack ...</h1>');
  };

  $(".body__button").click(() => setText());
});
