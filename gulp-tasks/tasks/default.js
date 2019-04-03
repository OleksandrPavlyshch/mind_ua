const gulp = require('gulp')
	, configs = require('../configs')
	, runSequence = require('run-sequence');

gulp.task('default', () => {
	configs.setEnv('development');
	configs.logEnv();
	runSequence(
		[/* 'favicons', 'sprite:svg',*/ 'copy', 'scripts', 'images', 'list-pages']
		, 'bower', 'sass', 'nunjucks',/* 'pug',*/ 'server', 'watch');
});
