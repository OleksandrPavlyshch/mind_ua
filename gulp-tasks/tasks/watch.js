const gulp = require('gulp');

gulp.task('watch',
	[
		'nunjucks:watch'
		// ,'pug:watch'
		, 'sass:watch'
		, 'scripts:watch'
		, 'images:watch'
		// , 'svg-font:watch'
		// , 'icon-sprite:watch'
		, 'sprite:svg:watch'
		, 'list-pages:watch'
	]
);