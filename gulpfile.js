const gulp = require("gulp")
const browserSync = require("browser-sync").create()

gulp.task("serve", ()=> {
  browserSync.init({
    server: "./src"
  })

  gulp.watch(["src/*.html"]).on("change", browserSync.reload)
  gulp.watch(["src/*.js"]).on("change", browserSync.reload)
})

gulp.task("default", ["serve"])
