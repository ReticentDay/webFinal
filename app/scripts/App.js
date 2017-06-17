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
  const $file = $('#file');

  firebase.auth().onAuthStateChanged(function(user){
    if(user){
      $(".body__login").hide();
      $(".body__main").show();
    }else{
      $(".body__login").show();
      $(".body__main").hide();
    }
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

    dbNewsRef.push({title:title,text:content,photoURL:photoURL});
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
});
