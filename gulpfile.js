var gulp = require('gulp');
//var bower = require('bower');
var concat = require('gulp-concat');
//var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
//var sh = require('shelljs');
var addsrc = require('gulp-add-src');
var replace = require('gulp-replace');
var jsifyTemplates = require('gulp-jsify-html-templates');
//var cat  = require('gulp-cat'); 
var uglify = require('gulp-uglify');


gulp.task('color-picker', function() {
    return  gulp.src( [
      './src/modal-template-*.html',
      
      ])
    .pipe(jsifyTemplates())
    .pipe(replace("htmlTemplates", 'colorPickerTemplates'))
    .pipe(addsrc( './src/ionic-color-picker.js'))
    .pipe(concat('ionic-color-picker.js'))
    .pipe( gulp.dest( 'ColorPickerExample/www/lib/ionic-color-picker/' ) )
    .pipe(gulp.dest('ionic-color-picker/dist/'))
    .pipe(uglify({mangle:false}))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('ColorPickerExample/www/lib/ionic-color-picker/'))
    .pipe(gulp.dest('ionic-color-picker/dist/'))
    

});

gulp.task('css-color-picker', function() {
    return  gulp.src( './src/ionic-color-picker.css')
    .pipe( gulp.dest( 'ColorPickerExample/www/lib/ionic-color-picker' ) )
    .pipe(gulp.dest('ionic-color-picker/dist/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe( gulp.dest( 'ColorPickerExample/www/lib/ionic-color-picker' ) )
    .pipe(gulp.dest('ionic-color-picker/dist/'))

});


gulp.task('watch', function() {
  gulp.watch(['./src/*.*'], ['color-picker', 'css-color-picker']);

});

