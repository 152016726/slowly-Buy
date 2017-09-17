var gulp = require("gulp");
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleancss = require('gulp-clean-css');
var less = require('gulp-less');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var htmlReplace = require('gulp-html-replace');

gulp.task('less', function() {
    gulp.src('./src/baicaijia/less/*.less')
        .pipe(less())
        .pipe(cleancss())
        .pipe(gulp.dest('./dist/baicaijia/css'));
});
gulp.task('lesses', function() {
    gulp.src('./src/guoneisales/less/*.less')
        .pipe(less())
        .pipe(cleancss())
        .pipe(gulp.dest('./dist/guoneisales/css'));
});
gulp.task('html', function() {
    gulp.src(['src/baicaijia/**/*.html', 'src/baicaijia/index.html'])
        .pipe(htmlReplace({
            style: gulp.src('src/baicaijia/html/common/style.html'),
            aside: gulp.src('src/baicaijia/html/common/aside.html'),
            header: gulp.src('src/baicaijia/html/common/header.html')
        }))
        .pipe(htmlmin({
            collapseWhitespace: true, // 去掉空白字符
            minifyJS: true, //压缩页面JS
            minifyCSS: true, //压缩页面CSS
            removeComments: true //清除HTML注释
        }))
        .pipe(gulp.dest('dist/baicaijia'));

    gulp.src('dist/baicaijia/index.html')
        .pipe(gulp.dest('./'));
});

gulp.task('htmls', function() {
    gulp.src(['src/guoneisales/**/*.html', 'src/guoneisales/index.html'])
        .pipe(htmlReplace({
            style: gulp.src('src/guoneisales/html/common/style.html'),
            aside: gulp.src('src/guoneisales/html/common/aside.html'),
            header: gulp.src('src/guoneisales/html/common/header.html')
        }))
        .pipe(htmlmin({
            collapseWhitespace: true, // 去掉空白字符
            minifyJS: true, //压缩页面JS
            minifyCSS: true, //压缩页面CSS
            removeComments: true //清除HTML注释
        }))
        .pipe(gulp.dest('dist/guoneisales'));
});

//包装第三方插件
var jsLibs = [
    'node_modules/art-template/lib/template-web.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/iscroll/build/iscroll.js'
];
//合并第三方插件为一个
gulp.task('jsLib', function() {
    gulp.src(jsLibs)
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('dist/baicaijia/js'));
});

//打包commonjs模块
//1.其中src/js/common目录下的文件不要打包，因为将来那个页面脚本需要他，require它即可


var jsModules = [
    //首页
    'src/baicaijia/js/index.js',
    //用户
    'src/baicaijia/js/content.js',
    'src/guoneisales/js/index.js',
    'src/guoneisales/js/sample.js'
]
gulp.task('js', function() {
    jsModules.forEach(function(jspath) {
        var path = jspath.split('/');
        var jsName = path.pop();
        path.shift();
        browserify(jspath).bundle()
            .pipe(source(jsName))
            .pipe(buffer())
            .pipe(gulp.dest('dist/' + path.join('/')));

    })
});
//添加统一打包的任务
gulp.task('build', function() {
    gulp.run(['less', 'js', 'jsLib', 'html']);
});
//添加默认追踪的任务
gulp.task('default', ['html', 'less', 'lesses', 'js', 'htmls', 'jsLib']);