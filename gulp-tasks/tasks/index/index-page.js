let gulp = require('gulp')
	, consolidate = require('gulp-consolidate')
	, configs      = require('../../configs');
require('require-yaml');

gulp.task('list-pages', () => {
	delete require.cache[require.resolve('../../../' + configs.source.pagelist)];
	let pages = require('../../../' + configs.source.pagelist);
	return gulp
			.src(__dirname + '/index.html')
			.pipe(consolidate('lodash', {
					pages: pages
			}))
			.pipe(gulp.dest(configs.build.root));
});

gulp.task('list-pages:watch', () => {
		gulp.watch(configs.source.root + '/*', ['list-pages']);
});

