var $ = require('jquery');

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

$(".body__login").show();
$(".body__main").hide();

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

$('#btw_logout').click(function(){
   firebase.auth().signOut();
   console.log("signOut");
 });
