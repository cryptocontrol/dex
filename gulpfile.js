var exec = require('child_process').exec

var gulp = require('gulp')
var gulpsync = require('gulp-sync')(gulp)
var ghPages = require('gulp-gh-pages')

// meteor-build-client ../build
gulp.task('build', function (cb) {
  exec('meteor-build-client ../dist --path ""', {cwd: 'frontend'}, function (err, res, failed) {
    if (err) {
      console.log(err)
    } else if (failed) {
      process.stdout.write(failed)
    } else {
      process.stdout.write('\u001b[32mMeteor build completed!\n')
    }
    cb(err)
  })
})

// gh-pages
gulp.task('deploy-gh-pages', function () {
  require('fs').writeFileSync('./dist/CNAME', 'dex.maharajadao.com');
  return gulp.src('./dist/**/*')
    .pipe(ghPages())
})


gulp.task('deploy', gulpsync.sync(['build', 'deploy-gh-pages']))
