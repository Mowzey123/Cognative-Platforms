const gulp = require('gulp');
const useTsConfig = require('gulp-use-tsconfig');
 
const tsConfig = './tsconfig.json';
 
gulp.task('lint', () => {
  return gulp.src(tsConfig)
    .pipe(useTsConfig.lint());
});
 
gulp.task('pre-build', () => {
  return gulp.src(tsConfig)
    .pipe(useTsConfig.clean()); // Remoce all .js; .map and .d.ts files
});
 
gulp.task('build', ['lint', 'pre-build'], () => {
  return gulp.src(tsConfig)
    .pipe(useTsConfig.build());// generates .js and optionaly .map anod/or .d.ts files
});
 
gulp.task('watch', ['build'], () => {
  return gulp.src(tsConfig)
    .pipe(useTsConfig.watch());
});
 
gulp.task('default', ['build']);