import svgSprite from "gulp-svg-sprite";

export const svgSpriteFunc = () => {
	return app.gulp.src(`${app.path.src.svgicons}`, {})
		// Указывает на возникающую ошибку в этом типе файла
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: 'SVG',
				message: 'Error: <%= error.message %>'
			}))
		)
		// Формируем svg-sprite
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: `../icons/icons.svg`,
					// Создавать страницу с перечнем иконок
					example: true
				}
			},
		}))
		// Копирование файлов в готовый проект
		.pipe(app.gulp.dest(app.path.build.images));
}