/*
 * @Author: your name
 * @Date: 2020-06-20 12:12:41
 * @LastEditTime: 2020-06-22 10:30:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \WWWe:\千峰线下\第二阶段\gulpfile.js
 */
const gulp = require("gulp");
const sass = require("gulp-sass");
const connect = require("gulp-connect");
const sourcemaps = require("gulp-sourcemaps");

// 搭建服务器
gulp.task("server", done => {
  connect.server({
    root: "dist",
    livereload: true,
    port:8887,
  })
  done();
})
// html文件
gulp.task("copyHtml", done => {
  gulp.src("html/*.html").pipe(
    gulp.dest("dist/html")
  ).pipe(connect.reload());

  done();
})

gulp.task("copyHtmls", done => {

  gulp.src("./pages/*.html").pipe(
    gulp.dest("./dist/pages")
  ).pipe(connect.reload());

  done();
})
// 监听swiperCss
gulp.task("copySwiperCss", done => {

  gulp.src("./swiper/css/*.css").pipe(
    gulp.dest("./dist/swiper/css")
  ).pipe(connect.reload());

  done();
})
// 监听swiperJs
gulp.task("copySwiperJs", done => {

  gulp.src("./swiper/js/*.js").pipe(
    gulp.dest("./dist/swiper/js")
  ).pipe(connect.reload());

  done();
})
// 监听js文件
gulp.task("copyJs", done => {

  gulp.src("./js/*.js").pipe(
    gulp.dest("./dist/js")
  ).pipe(connect.reload());

  done();
})
// sass转css文件
gulp.task("sass", (done) => {
  gulp.src("./css/*.scss")
    .pipe(sourcemaps.init())
    //nested
    //expanded
    //compact
    //compressed
    .pipe(sass({
      outputStyle: "compressed"
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist/css"));

  done();
});

gulp.task("sassa", done => {

  gulp.src("./css/*.scss").pipe(
    gulp.dest("dist/css")
  ).pipe(connect.reload());

  done();
})
/* css文件 */
gulp.task("css", done => {

  gulp
    .src("./css/*")
    .pipe(connect.reload())
    .pipe(sass({
      outputStyle: "compressed"
    }))
    .pipe(sourcemaps.write())
    .pipe(
      gulp.dest("./dist/css")
    );

  done();
})
// 文件监听
gulp.task("watch", (done) => {
  gulp.watch("./css/*", gulp.series("css"));
  gulp.watch("html/*.html", gulp.series("copyHtml"));
  //gulp.watch("./pages/*.html", gulp.series("copyHtmls"));
  gulp.watch("./js/*.js", gulp.series("copyJs"));
  gulp.watch("./swiper/js/*.js", gulp.series("copySwiperJs"));
  gulp.watch("./swiper/css/*.css", gulp.series("copySwiperCss"));
  //gulp.watch("./img/*.png", gulp.series("copyImg"));

  done();
});

gulp.task("default", gulp.series("server", "watch"));