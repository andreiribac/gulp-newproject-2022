// Основной модуль
import gulp from "gulp";
// Импорт путей
import { path } from "./gulp/config/path.js";
// импорт общих плагинов
import { plugins } from "./gulp/config/plagins.js";

// Передаем значения в глобальную переменную
global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	path: path,
	gulp: gulp,
	plugins: plugins,
}

// Импорт задач
import { copy } from "./gulp/tasks/copy.js";
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';
import { svgSpriteFunc } from './gulp/tasks/svgSprite.js';
import { zip } from './gulp/tasks/zip.js';
import { lang_html } from "./gulp/tasks/lang_html.js";
import { copy_xml } from "./gulp/tasks/copy_xml.js";

// Наблюдать за изменениями в файлах
function watcher() {
	gulp.watch(path.watch.files, copy);
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.scss, scss);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.images, images);

	gulp.watch(path.watch.lang_html, lang_html);
	gulp.watch(path.watch.xml, copy_xml);
} 

export { svgSpriteFunc };

// Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

// Основные задачи
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images, svgSpriteFunc, lang_html, copy_xml));

// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);

// Экспорт сценариев
export {dev}
export {build}
export {deployZIP}

// Выполнение сценария по умолчанию
gulp.task('default', dev);