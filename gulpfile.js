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
//罗杰祥的白菜价
gulp.task('less', function() {
    gulp.src('./src/baicaijia/less/*.less')
        .pipe(less())
        .pipe(cleancss())
        .pipe(gulp.dest('./dist/baicaijia/css'));
});

//罗杰祥的国内折扣
gulp.task('lesses', function() {
    gulp.src('./src/inlanddiscount/less/*.less')
        .pipe(less())
        .pipe(cleancss())
        .pipe(gulp.dest('./dist/inlanddiscount/css'));
});

//张丹丹的商城主页和省钱控
gulp.task('less1', function() {
    gulp.src('./src/moneyctrl/css/*.less')
        .pipe(less())
        .pipe(cleancss())
        .pipe(gulp.dest('./dist/moneyctrl/css'));
});

//孙雪玉的品牌大全，商城导航，凑单品
gulp.task('less2', function() {
    gulp.src('./src/all/less/*.less')
        .pipe(less())
        .pipe(cleancss())
        .pipe(gulp.dest('./dist/all/css'));
});

//卢沛基的比价搜索和海淘折扣和优惠券
gulp.task('less3', function() {
    gulp.src('./src/lpj/less/*.less')
        .pipe(less())
        .pipe(cleancss())
        .pipe(gulp.dest('./dist/lpj/css'));
});

//罗杰祥的白菜价
gulp.task('html', function() {
    gulp.src(['src/baicaijia/**/*.html', 'src/baicaijia/index.html'])
        .pipe(htmlmin({
            collapseWhitespace: true, // 去掉空白字符
            minifyJS: true, //压缩页面JS
            minifyCSS: true, //压缩页面CSS
            removeComments: true //清除HTML注释
        }))
        .pipe(gulp.dest('dist/baicaijia'));
});
//罗杰祥的国内折扣
gulp.task('htmls', function() {
    gulp.src(['src/inlanddiscount/**/*.html', 'src/inlanddiscount/index.html'])
        .pipe(htmlmin({
            collapseWhitespace: true, // 去掉空白字符
            minifyJS: true, //压缩页面JS
            minifyCSS: true, //压缩页面CSS
            removeComments: true //清除HTML注释
        }))
        .pipe(gulp.dest('dist/inlanddiscount'));
});
//张丹丹的商城主页和省钱控
gulp.task('htmls1', function() {
    gulp.src(['src/moneyctrl/**/*.html', 'src/moneyctrl/moneyctrl.html'])
        .pipe(htmlmin({
            collapseWhitespace: true, // 去掉空白字符
            minifyJS: true, //压缩页面JS
            minifyCSS: true, //压缩页面CSS
            removeComments: true //清除HTML注释
        }))
        .pipe(gulp.dest('dist/moneyctrl'));
});

//孙雪玉的品牌大全，商城导航，凑单品
gulp.task('htmls2', function() {
    gulp.src('src/all/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true, // 去掉空白字符
            minifyJS: true, //压缩页面JS
            minifyCSS: true, //压缩页面CSS
            removeComments: true //清除HTML注释
        }))
        .pipe(gulp.dest('dist/all'));
});

//卢沛基的比价搜索和海淘折扣和优惠券
gulp.task('htmls3', function() {
    gulp.src('src/lpj/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true, // 去掉空白字符
            minifyJS: true, //压缩页面JS
            minifyCSS: true, //压缩页面CSS
            removeComments: true //清除HTML注释
        }))
        .pipe(gulp.dest('dist/lpj'));
});

//包装第三方插件
var jsLibs = [
    'node_modules/art-template/lib/template-web.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/iscroll/build/iscroll.js',
    'node_modules/nprogress/nprogress.js'
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
    //白菜价
    'src/baicaijia/js/index.js',
    'src/baicaijia/js/sort.js',
    'src/baicaijia/js/itcastEvent.js',
    //国内折扣
    'src/inlanddiscount/js/index.js',
    'src/inlanddiscount/js/sample.js',
    'src/inlanddiscount/js/detail.js',
    //省钱控
    'src/moneyctrl/js/detail.js',
    'src/moneyctrl/js/index.js',
    'src/moneyctrl/js/moneyctrl.js',
    'src/moneyctrl/js/title.js',
    //品牌大全，商城导航，凑单品
    'src/all/js/brandTitle.js',
    'src/all/js/edit1.js',
    'src/all/js/goTop.js',
    'src/all/js/gsproduct.js',
    'src/all/js/sitenav.js',
    'src/all/js/title.js',
    //比价搜索，海淘折扣，优惠券
    'src/lpj/js/bijia.js',
    'src/lpj/js/bijia1.js',
    'src/lpj/js/bijia2.js',
    'src/lpj/js/haitao.js',
    'src/lpj/js/quan.js',
    'src/lpj/js/quan1.js',
    'src/lpj/js/util.js'
]
gulp.task('js', function() {
    jsModules.forEach(function(jspath) {
        var path = jspath.split('/');
        var jsName = path.pop();
        path.shift();
        browserify(jspath).bundle()
            .pipe(source(jsName))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(gulp.dest('dist/' + path.join('/')));

    })
});
//添加统一打包的任务
gulp.task('build', function() {
    gulp.run(['less', 'js', 'jsLib', 'html']);
});
//添加默认追踪的任务
gulp.task('default', ['html', 'less1', 'less3', 'less2', 'less', 'lesses', 'js', 'htmls', 'htmls1', 'htmls2', 'htmls3', 'jsLib']);