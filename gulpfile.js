var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

/*  EXEMPLE OF GULP TASK

    gulp.task('task-name', function () {
      return gulp.src('source-files') // Get source files with gulp.src
        .pipe(aGulpPlugin()) // Sends it through a gulp plugin
        .pipe(gulp.dest('destination')) // Outputs the file in the destination folder
    })

*/

// Development Tasks

gulp.task('styles', function () {
  return gulp.src('./scss/main.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('server', function () {
  // Starts a server from the root folder
  browserSync.init ({
    server: {
      baseDir: './'
    }
  });

  // Watches for changes on any .scss file within the /scss/
  gulp.watch('./scss/*.scss', ['styles']);
  // Watches for changes on any .html file within any directory
  gulp.watch('./**/*.html').on('change', browserSync.reload);
  // Watches for changes on any .js file within any directory
  gulp.watch('./js/*.js').on('change', browserSync.reload);
});

// Default Task

gulp.task('default', ['styles', 'server']);
