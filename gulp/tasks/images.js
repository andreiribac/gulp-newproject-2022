import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';

export const images = () => {
	return app.gulp.src(app.path.src.images)
		// Указывает на возникающую ошибку в этом типе файла
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: 'IMAGES',
				message: 'Error: <%= error.message %>'
			}))
	)
		// Newer проверяет нужно ли обновление карники или она уже существует
		.pipe(app.plugins.newer(app.path.build.images))
		// Создаем изображение webp формата
		.pipe(webp())
		// Копируем webp в папку с результатом
		.pipe(app.gulp.dest(app.path.build.images))
		// Получаем доступ к папке с исходниками для проверки
		.pipe(app.gulp.src(app.path.src.images))
		// Newer проверяет нужно ли обновление карники или она уже существует
		.pipe(app.plugins.newer(app.path.build.images))
		// Сжатие картинок
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{ removeViewBox: false }],
			interlaced: true,
			optimizationLevel: 3 // 0 to 7
		}))
		// Копирование файлов img в готовый проект
		.pipe(app.gulp.dest(app.path.build.images))
		// Забираем файлы svg
		.pipe(app.gulp.src(app.path.src.svg))
		// Копирование файлов svg в готовый проект
		.pipe(app.gulp.dest(app.path.build.images))
		// Рестарт браузера
		.pipe(app.plugins.browsersync.stream());
}