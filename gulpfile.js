var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var server = require('gulp-server-livereload');
var imageMin = require('gulp-imagemin');


gulp.task('scripts', function() {
    return gulp.src(['src/components/**/*.js'])
        .pipe(concat('app.js', {newLine: ';'}))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('libs', function(){
    return gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('dist/js'))
});

gulp.task('sass', function () {
    return sass('src/main.scss')
        .on('error', sass.logError)
        .pipe(gulp.dest('dist/css'));
});

gulp.task('fonts', function(){
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts'))
});

gulp.task('images', function(){
    return gulp.src('src/images/*')
        .pipe(gulp.dest('dist/images'))
});

gulp.task('pages', function(){
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
});

gulp.task('webserver', function() {
    gulp.src('dist')
        .pipe(server({
            livereload: true,
            directoryListing: false,
            open: true,
            log: 'info',
            defaultFile: 'index.html'
        }));
});

gulp.task('default', function () {
    gulp.start('scripts', 'libs', 'sass', 'fonts', 'images', 'pages', 'webserver');
    gulp.watch('src/index.html', ['pages']);
    gulp.watch('src/images/*', ['images']);
    gulp.watch('src/components/**/*.js', ['scripts']);
    gulp.watch('src/js/**/*.js', ['libs']);
    gulp.watch('src/**/*.scss', ['sass']);
});
