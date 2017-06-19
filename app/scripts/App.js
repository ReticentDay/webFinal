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
  var storageRef = firebase.storage().ref();

  var photoURL;
  $(".body__login").show();
  $(".body__main").hide();
  $(".body__main__content__add-news").hide();
  const $file = $('#file');
  var list;
  firebase.auth().onAuthStateChanged(function(user){
    if(user){
      $(".body__login").hide();
      $(".body__main").show();

      dbNewsRef.limitToLast(10).on('child_added',function(snapshot){
        var data = snapshot.val();
        var title = data.title;
        var text = data.text.split("\n");
        var userPhoto = data.photoURL;

        var $divElement = $("<div class='body__main__content__news-list__content slid_box'>");
        var $h1Element = $("<h1></h1>")
        var $pImgElement = $("<p></p>");
        var $btnElement = $("<button type='button' class='body__main__content__news-list__content__button botton btw-deleat' >刪除</button>");

        $divElement.attr({"id": title});
        $btnElement.attr({"id": title});
        $h1Element.text(title);
        $pImgElement.html(text[0] + "<br />" + text[1] + "<br />" + text[2] + "......");
        $divElement.append($h1Element);
        $divElement.append($pImgElement);
        $divElement.append($btnElement);
        $(".body__main__content__news-list").append($divElement);
      });
    }else{
      $(".body__login").show();
      $(".body__main").hide();
    }
  });

  $(".body__main__content__news-list").on('click','.btw-deleat',function(e) {
    dbNewsRef.child(e.target.id).set(null);
    $("#" + e.target.id).remove();
  });

  var sing_in = function(e){
    const email = $("#username").val();
    const pass = $("#password").val();
    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email,pass);
    promise.catch(function(e){
      console.log(e.message);
    });
    promise.then(function(e){
      console.log("Login");
    });
  };


  $('#sing_in_button').click((e) => sing_in(e));



  $file.change(function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var file = evt.target.files[0];

    var metadata = {
      'contentType': file.type
    };

    storageRef.child('images/' + file.name).put(file, metadata).then(function(snapshot) {
      console.log('Uploaded', snapshot.totalBytes, 'bytes.');
      console.log(snapshot.metadata);
      photoURL = snapshot.metadata.downloadURLs[0];
      console.log('File available at', photoURL);
    }).catch(function(error) {

      console.error('Upload failed:', error);

    });
  });

  window.onload = function() {
     $file.change(handleFileSelect);
     // $file.disabled = false;
   }

  $('#reset_button').click(function(e){
    $('#text-content').val('');
    $('#title').val('');
    $('#file').val('');
  });

  $('#submit_button').click(function(e){
    var title = $('#title').val();
    var content = $('#text-content').val();
    var photoU = photoURL || "null";
    dbNewsRef.child(title).update({title:title,text:content,photoURL:photoU});
    $('#text-content').val('');
    $('#title').val('');
    $('#file').val('');
  });

  $('#btw_news_list').click(function(){
    $(".body__main__content__add-news").hide();
    $(".body__main__content__news-list").show();
  });

  $('#btw_add_news').click(function(){
    $(".body__main__content__add-news").show();
    $(".body__main__content__news-list").hide();
  });

  $('#btw_logout').click(function(){
     firebase.auth().signOut();
     console.log("signOut");
  });

  $('#btw_news_list_B').click(function(){
    $(".body__main__content__add-news").hide();
    $(".body__main__content__news-list").show();
  });

  $('#btw_add_news_B').click(function(){
    $(".body__main__content__add-news").show();
    $(".body__main__content__news-list").hide();
  });

  $('#btw_logout_B').click(function(){
     firebase.auth().signOut();
     console.log("signOut");
  });
});
