var $ = require('jquery');
var setText = function() {
    $(".body__list").html('<h1>Hello Webpack ...</h1>');
};

$(".body__button").click(() => setText());
