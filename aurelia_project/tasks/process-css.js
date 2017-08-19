import gulp from 'gulp';
import changedInPlace from 'gulp-changed-in-place';
import * as sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import project from '../aurelia.json';

export default function processCSS() {
  return gulp.src(project.cssProcessor.source)
    .pipe(changedInPlace({firstPass: true}))
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['/home/scott/dvl/bulma']
    }).on('error', sass.logError))
    .pipe(gulp.dest('./scripts'));
}
