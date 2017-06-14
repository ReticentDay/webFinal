var gulp = require('gulp'),
watch = require('gulp-watch'),
postcss=require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import');
gulp.task('default',function(){
  console.log('Hello GULP');
});

gulp.task('html',function(){
  console.log('html change');
});

gulp.task('css',function(){
  console.log('css change');
});

gulp.task('styles',function(){
  return gulp.src('./app/style.css')
  .pipe(postcss([cssvars, nested, autoprefixer]))
  .pipe(gulp.dest('./app/styles'));
});

gulp.task('watch',function(){

  watch('./app/index.html',function(){
    gulp.start('html');
  });

});
