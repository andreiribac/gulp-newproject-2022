import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; // Сжатие CSS файла
import webpcss from 'gulp-webpcss'; // Вывод WEBP изображений
import autoprefixer from 'gulp-autoprefixer'; // Добавление вердорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // Группировка медиа запросов

const sass = gulpSass(dartSass);

export const scss = () => {
	return app.gulp.src(app.path.src.scss, { sourcemaps: true })
		// Указывает на возникающую ошибку в этом типе файла
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: 'SCSS',
				message: 'Error: <%= error.message %>'
			}))
		)
		// Замена алиасов (относительных путей) для изображения
		.pipe(app.plugins.replace(/@img\//g, '../img/'))
		// Компиляция scss в css
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		// Комбинирует все меди выражение в конец CSS файла
		.pipe(groupCssMediaQueries())
		// Для поддержки webp изображений / добавляется класс webp или no-webp
		.pipe(webpcss({
			webpClass: '.webp',
			noWebpClass: '.no-webp'
		}))
		// Ставит автоматический веб-префиксы для браузеров
		.pipe(autoprefixer({
			grid: true,
			overrideBrowserlist: ["last 3 versions"],
			cascade: true
		}))
		// Закоментировать если нужен не сжатый дубль файл стилей
		.pipe(app.gulp.dest(app.path.build.css))
		// Сжимает / Минимезирует CSS файл
		.pipe(cleanCss())
		// Меняем название для сжатого файла
		.pipe(rename({
			extname: '.min.css'
		}))
		// Копирование файлов в готовый проект
		.pipe(app.gulp.dest(app.path.build.css))
		// Рестарт браузера
		.pipe(app.plugins.browsersync.stream());
}