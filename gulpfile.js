// 获取 gulp
const gulp = require('gulp');
const uglifyCSS = require('gulp-clean-css');
// 压缩 js 文件
// 在命令行使用 gulp script 启动此任务
gulp.task('css', () => gulp.src('dist/styles/pile.min.css')
  .pipe(uglifyCSS())
  .pipe(gulp.dest('dist/styles')));
