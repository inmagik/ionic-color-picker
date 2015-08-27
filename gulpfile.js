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
var order = require("gulp-order");


gulp.task('color-picker', function() {
    return  gulp.src( [
      './src/modal-template-*.html',
      
      ])
    .pipe(jsifyTemplates())
    .pipe(replace("htmlTemplates", 'colorPickerTemplates'))
    .pipe(concat('templates.js'))

    .pipe(addsrc( './src/ionic-color-picker.js'))
    .pipe(order(['templates.js', 'src/ionic-color-picker.js']))
    .pipe(concat('ionic-color-picker.js'))
    //.pipe(gulp.dest( 'ColorPickerExample/www/lib/ionic-color-picker/' ) )
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify({mangle:false}))
    .pipe(rename({ extname: '.min.js' }))
    //.pipe(gulp.dest('ColorPickerExample/www/lib/ionic-color-picker/'))
    .pipe(gulp.dest('./dist/'))
    

});

gulp.task('css-color-picker', function() {
    return gulp.src( './src/ionic-color-picker.css')
    //.pipe(gulp.dest( 'ColorPickerExample/www/lib/ionic-color-picker' ) )
    .pipe(gulp.dest('./dist/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    //.pipe( gulp.dest( 'ColorPickerExample/www/lib/ionic-color-picker' ) )
    .pipe(gulp.dest('./dist/'))

});


gulp.task('watch', function() {
  gulp.watch(['./src/*.*'], ['color-picker', 'css-color-picker']);

});

gulp.task('default', ['color-picker', 'css-color-picker']);

