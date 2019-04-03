let util = require('gulp-util')
	, production = util.env.production || util.env.prod || false
	, sourcePath = './source/'
	, buildPath = './build/'
	, configs = {
		env: 'development'
		, production: production
		, 'source': {
				'root': sourcePath
				//vendors
				, 'vendorJs': sourcePath + 'vendor/js/'
				, 'vendorCss': sourcePath + 'vendor/css/'
				// js
				, 'js': sourcePath + 'elements/**/*.js'
				, 'pagelist': sourcePath + 'index.yaml'
				, 'favicon': sourcePath + 'favicon/**/*.png'
				, 'fonts': sourcePath + 'fonts/**/*'
				//Pug
				, 'pug': sourcePath + 'pug-templates/*.pug'
				, 'pugLayout': sourcePath + 'pug-templates/layout/'
				, 'pugJson': sourcePath + 'pug-templates/jsons/index.json'
				, 'pug_watch': [sourcePath + 'pug-templates/**/*.pug', sourcePath + 'pug-templates/**/*.json', sourcePath + 'elements/**/*.pug', sourcePath + 'elements/**/*.json']
				//Nunjucks
				,'nunjucks': sourcePath + 'nunjucks-templates'
				//Sass
				, 'sass': [sourcePath + 'sass/**/*.+(sass|scss)', sourcePath + 'elements/**/*.+(sass|scss)']
				, 'sassFolder': sourcePath + 'sass/'
				//images
				, 'img': sourcePath + 'img/*.*'
				//icons
				, 'iconsSvg': sourcePath + 'svg-icons/'
				, 'svgFontsAssets': sourcePath + 'svg-font-assets/*.svg'
		}
		, 'build': {
				'root': buildPath
				, 'vendorJs': buildPath + '/js/vendor/'
				, 'vendorCss': buildPath + '/css/vendor/'
				, 'css': buildPath + '/css/'
				, 'js': buildPath + '/js/'
				, 'fonts': buildPath + '/fonts/'
				, 'img': buildPath + '/img/'
				, 'favicon': buildPath + '/favicon'
		}
		, setEnv: (env) => {
				if (typeof env !== 'string') return;
				this.env = env;
				configs.production = env === 'production';
				process.env.NODE_ENV = env;
		}
		, logEnv: () => {
				util.log(
						'Environment:',
						util.colors.white.bgRed(' ' + process.env.NODE_ENV + ' ')
				);
		}
		, errorHandler: require('./util/handle-errors')
};

configs.setEnv(production ? 'production' : 'development');

module.exports = configs;