var gulp = require('gulp'),
watch = require('gulp-watch'),
postcss=require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins');

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
  return gulp.src('./app/css/style.css')
  .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
  .pipe(gulp.dest('./app/styles'));
});

gulp.task('indexStyles',function(){
  return gulp.src('./app/css/indexStyles.css')
  .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
  .pipe(gulp.dest('./app/styles'));
});

gulp.task('controlStyles',function(){
  return gulp.src('./app/css/controlStyle.css')
  .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
  .pipe(gulp.dest('./app/styles'));
});

gulp.task('watch',function(){

  watch('./app/css/*.css',function(){
    gulp.start('styles');
    gulp.start('indexStyles');
    gulp.start('controlStyles');
  });

});
