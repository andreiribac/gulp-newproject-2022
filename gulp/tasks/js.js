import webpack from 'webpack-stream';

export const js = () => {
	return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
		// Указывает на возникающую ошибку в этом типе файла
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: 'JS',
				message: 'Error: <%= error.message %>'
			}))
		)
		.pipe(webpack({
			mode: app.isDev ? 'production' : 'development',
			output: {
				filename: 'app.min.js',
			}
		}))
		// Копирование файлов в готовый проект
		.pipe(app.gulp.dest(app.path.build.js))
		// Рестарт браузера
		.pipe(app.plugins.browsersync.stream());
}