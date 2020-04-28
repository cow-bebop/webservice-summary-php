var gulp = require("gulp");
var sass = require("gulp-sass");
var sassGlob = require("gulp-sass-glob");
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var assets = require("postcss-assets");
var cssdeclsort = require("css-declaration-sorter");
var mqpacker = require("css-mqpacker");
var browserSync = require("browser-sync");

//パス設定
var paths = {
  html: "./template/",
  scss: "./src/sass/",
  css: "./template/common/css/",
  jsSrc: "./src/js/",
  jsDist: "./template/common/js/"
};

// sass
var sassOptions = {
  outputStyle: "expanded"
};
gulp.task("scss", function() {
  return gulp
    .src(paths.scss + "**/*.scss")
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(sassGlob())
    .pipe(sass(sassOptions))
    .pipe(postcss([mqpacker()]))
    .pipe(postcss([cssdeclsort({ order: "smacss" })]))
    .pipe(
      postcss([
        assets({
          loadPaths: ["./images"]
        })
      ])
    )
    .pipe(postcss([autoprefixer({ browsers: ["last 2 versions"] })]))
    .pipe(gulp.dest(paths.css));
});

//JS圧縮
gulp.task("js", function() {
  gulp
    .src(paths.jsSrc + "**/*.js")
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest(paths.jsDist));
});

//BrowserSync
gulp.task("browser-sync", () => {
  browserSync({
    server: {
      baseDir: paths.html
    }
  });
  gulp.watch(paths.html + "**/*.html", ["reload"]);
  gulp.watch(paths.css + "**/*.css", ["reload"]);
  gulp.watch(paths.jsDist + "**/*.js", ["reload"]);
});
gulp.task("reload", () => {
  browserSync.reload();
});

//watch
gulp.task("watch", function() {
  gulp.watch(paths.scss + "**/*.scss", ["scss"]);
  gulp.watch(paths.jsSrc + "**/*.js", ["js"]);
});

gulp.task("default", ["browser-sync", "watch"]);
