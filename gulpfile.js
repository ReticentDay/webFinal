var gulp = require('gulp');

gulp.task('default',function(){
  console.log('Hello GULP');
});


gulp.task('watch',function(){
  
  watch('./app/index.html',function(){
    gulp.start('default');
  });

});
