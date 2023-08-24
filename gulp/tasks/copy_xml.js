export const copy_xml = () => {
	return app.gulp.src(app.path.src.xml)
		.pipe(app.gulp.dest(app.path.build.xml))
}