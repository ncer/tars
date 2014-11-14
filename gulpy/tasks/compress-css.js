var gulp = require('gulp');
var csso = require('gulp-csso');
var cmq = require('gulp-combine-media-queries');
var rename = require('gulp-rename');
var gulpif = require('gulp-if');
var notify = require('gulp-notify');
var projectConfig = require('../../projectConfig');
var notifyConfig = projectConfig.notifyConfig;
var modifyDate = require('../helpers/modifyDateFormatter');

/**
 * Compress css-files
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('compress-css', function() {
        return gulp.src('./builds/build' + buildOptions.buildVersion + '/' + projectConfig.fs.staticFolderName + '/css/*.css')
            .pipe(cmq())
            .pipe(csso())
            .pipe(rename({
                suffix: '.min'
            }))
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while compressing css.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest('./builds/build' + buildOptions.buildVersion + '/' + projectConfig.fs.staticFolderName + '/css/'))
            .pipe(
                gulpif(notifyConfig.useNotify,
                    notify({
                        onLast: true,
                        sound: notifyConfig.sounds.onSuccess,
                        title: notifyConfig.title,
                        message: 'Css\'ve been minified \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                        templateOptions: {
                            date: modifyDate.getTimeOfModify()
                        }
                    })
                )
            );
        });
};