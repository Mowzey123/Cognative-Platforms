const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const clean = require('gulp-rimraf');
const jshint = require('gulp-jshint');
const nodemon = require('gulp-nodemon');
const tsProj = ts.createProject('tsconfig.json');
const notificator = require('gulp-jshint-notify-reporter');

gulp.task('clean',()=>{
  return gulp.src("dist/*", { read: false }).pipe(clean());
});

gulp.task('lint',()=>{
  return gulp.src('dist/**/*.js')
          .pipe(jshint())
          .pipe(jshint.reporter('default'))
          .pipe( notificator() );
});

gulp.task('build', () => {
  return gulp.src('src/**/*.ts')
    .pipe(tsProj())
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});



gulp.task('creating-log-dirs',function(){
  return gulp.src(['src/data/**/*','src/'],{base:'src'})
          .pipe(gulp.dest('dist'));
});

gulp.task('serve',gulp.series(['build']),function(){
  const options ={
      script:'dist/index.js',
      delayTime:1,
      watch:'src/**/*.ts'
  };

  return nodemon(options).on('restart',()=>{
    console.log('restarting server');
  });
});






