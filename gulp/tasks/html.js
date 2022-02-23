import fileinclude from 'gulp-file-include';
import webpHtmlNosvg from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number';

export const html = () => {
	return app.gulp.src(app.path.src.html)
		// Указывает на возникающую ошибку в этом типе файла
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: 'HTML',
				message: 'Error: <%= error.message %>'
			}))
		)
		// Сборка html из компонентов
		.pipe(fileinclude())
		// Замена алиасов (относительных путей) для изображения
		.pipe(app.plugins.replace(/@img\//g, 'img/'))
		// Формирование тега picture и .webp формата изображения
		.pipe(webpHtmlNosvg())
		// Добавление версионности что бы избежать кэширования в браузере
		.pipe(
			versionNumber({
				'value': '%DT%',
				'append': {
					'key': '_v',
					'cover': 0,
					'to': [
						'css',
						'js',
					]
				},
				'output': {
					'file': 'gulp/version.json'
				}
			})
		)
		// Копирование файлов в готовый проект
		.pipe(app.gulp.dest(app.path.build.html))
		// Рестарт браузера
		.pipe(app.plugins.browsersync.stream());
}