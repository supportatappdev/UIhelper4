var gulp = require('gulp');

var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var cssconcat =  require("gulp-concat-css");
var vendorBaseScripts = ["../../../assets/inspinia/js/jquery/jquery-2.1.1.min.js",
 "../../../assets/inspinia/js/plugins/jquery-ui/jquery-ui.js",
 "../../../assets/inspinia/js/bootstrap/bootstrap.min.js",
"../../../assets/inspinia/js/plugins/metisMenu/jquery.metisMenu.js",
"../../../assets/inspinia/js/plugins/slimscroll/jquery.slimscroll.min.js",
"../../../assets/inspinia/js/plugins/pace/pace.min.js",
 "../../../assets/inspinia/js/angular/angular.min.js",
 "../../../assets/inspinia/js/angular/angular-resource.js",
 "../../../assets/inspinia/js/angular/angular-sanitize.js",
 "../../../assets/inspinia/js/plugins/oclazyload/dist/ocLazyLoad.js",
 "../../../assets/inspinia/js/angular-translate/angular-translate.js",
 "../../../assets/inspinia/js/ui-router/angular-ui-router.js",
 "../../../assets/inspinia/js/bootstrap/ui-bootstrap-tpls-0.12.0.js",
 "../../../assets/inspinia/js/plugins/angular-idle/angular-idle.js",
 "../../../assets/inspinia/js/plugins/angular-notify/angular-notify.min.js",
 "../../../assets/inspinia/js/plugins/codemirror/codemirror.js",
 "../../../assets/inspinia/js/plugins/codemirror/mode/javascript/javascript.js",
 "../../../assets/inspinia/js/plugins/codemirror/addon/hint/show-hint.js",
 "../../../assets/inspinia/js/plugins/ui-codemirror/ui-codemirror.min.js",
 "../../../assets/inspinia/js/plugins/sweetalert/sweetalert.min.js",
 "../../../assets/inspinia/js/plugins/sweetalert/angular-sweetalert.min.js",
 "../../../assets/inspinia/js/plugins/uiTree/angular-ui-tree.min.js",
 "../../../assets/inspinia/js/bootstrap/ui-bootstrap-tpls-0.12.0.min.js",
 "../../../assets/inspinia/js/angular/angular-bind-html-compile.js",
"../../../assets/clipboard/clipboard.min.js",
"../../../assets/clipboard/ngclipboard.min.js",
"../../../assets/clipboard/tooltips.js"
 
 
 
    ];


var vendorBaseScripts1 = [
 "../../../assets/inspinia/js/jquery/jquery-2.1.1.min.js",
 "../../../assets/inspinia/js/plugins/jquery-ui/jquery-ui.js",
 "../../../assets/inspinia/js/bootstrap/bootstrap.min.js",
"../../../assets/inspinia/js/plugins/metisMenu/jquery.metisMenu.js",
"../../../assets/inspinia/js/plugins/slimscroll/jquery.slimscroll.min.js"];
var vendorBaseScripts2 = [
"../../../assets/inspinia/js/plugins/pace/pace.min.js",
 "../../../assets/inspinia/js/angular/angular.min.js"];
 
 var vendorBaseScripts22 = [
 "../../../assets/inspinia/js/angular/angular-resource.js",
 "../../../assets/inspinia/js/angular/angular-sanitize.js",
 "../../../assets/inspinia/js/plugins/oclazyload/dist/ocLazyLoad.js",
 "../../../assets/inspinia/js/angular-translate/angular-translate.js"];

 var vendorBaseScripts3 = [
 "../../../assets/inspinia/js/ui-router/angular-ui-router.js",
 "../../../assets/inspinia/js/bootstrap/ui-bootstrap-tpls-0.12.0.js",
 "../../../assets/inspinia/js/plugins/angular-idle/angular-idle.js",
 "../../../assets/inspinia/js/plugins/angular-notify/angular-notify.min.js",
 "../../../assets/inspinia/js/plugins/codemirror/codemirror.js",
 "../../../assets/inspinia/js/plugins/codemirror/mode/javascript/javascript.js"];
 var vendorBaseScripts4 = [
 "../../../assets/inspinia/js/plugins/codemirror/addon/hint/show-hint.js",
 "../../../assets/inspinia/js/plugins/ui-codemirror/ui-codemirror.min.js",
 "../../../assets/inspinia/js/plugins/sweetalert/sweetalert.min.js"];

 var vendorBaseScripts5 = [
 "../../../assets/inspinia/js/plugins/sweetalert/angular-sweetalert.min.js",
 "../../../assets/inspinia/js/plugins/uiTree/angular-ui-tree.min.js",
 "../../../assets/inspinia/js/bootstrap/ui-bootstrap-tpls-0.12.0.min.js"];
 var vendorBaseScripts6 = [
"../../../assets/inspinia/js/angular/angular-bind-html-compile.js",
"../../../assets/clipboard/clipboard.min.js",
"../../../assets/clipboard/ngclipboard.min.js",
"../../../assets/clipboard/tooltips.js"
];

// SOURCES CONFIG
var source = {
	scripts: {
		app: ["config/inspinia.js",'config/app.js','config/service.js'
    		,'config/config.js'
    		 ,'components/ui/config.js','config/directives.js'
    		 ,'config/controllers.js','components/ui/ctrl.js'],
		vendor1: vendorBaseScripts1,
		vendor2: vendorBaseScripts2,
		vendor22: vendorBaseScripts22,
		vendor3: vendorBaseScripts3,
		vendor4: vendorBaseScripts4,
		vendor5: vendorBaseScripts5,
		vendor6: vendorBaseScripts6,
		vendor:vendorBaseScripts,
		watch: ['js/*.js', 'js/**/*.js']
	},
	styles: {
		app: {
			css: [
			 "../../../assets/inspinia/css/bootstrap.css",
			 "../../../assets/inspinia/font-awesome/css/font-awesome.css" ,
			"../../../assets/inspinia/css/animate.css" ,"../../../assets/inspinia/css/style.css" ,"../../../assets/inspinia/css/plugins/angular-notify/angular-notify.css" ,
			"../../../assets/inspinia/css/plugins/codemirror/codemirror.css" ,
			"../../../assets/inspinia/css/plugins/codemirror/ambiance.css" ,
			"../../../assets/inspinia/js/plugins/codemirror/addon/hint/show-hint.css" ,
			"../../../assets/inspinia/css/plugins/uiTree/angular-ui-tree.css" ,"../../../assets/clipboard/tooltipped.css"]
		}
	}
};

// BUILD TARGET CONFIG
var build = {
	scripts: {
		app: {
			main: 'app.js',
			dir: 'build/js/'
		},
		vendor: {
		    main: 'vendor.js',
			dir: 'build/js/'
		},
		vendor1: {
			main: 'vendor1.js',
			dir: 'build/js/'
		},
		vendor2: {
			main: 'vendor2.js',
			dir: 'build/js/'
		},
		vendor22: {
			main: 'vendor22.js',
			dir: 'build/js/'
		},
		vendor3: {
			main: 'vendor3.js',
			dir: 'build/js/'
		},
		vendor4: {
			main: 'vendor4.js',
			dir: 'build/js/'
		},
		vendor5: {
			main: 'vendor5.js',
			dir: 'build/js/'
		},
		vendor6: {
			main: 'vendor6.js',
			dir: 'build/js/'
		}
	},
	styles: {
		main:'app.css',
		dir:'build/css'
	}
};

 
// TASK
gulp.task('scripts:app', function () {
	gulp.src(source.scripts.app) // path to your files
    .pipe(concat(build.scripts.app.main))
    .pipe(gulp.dest(build.scripts.app.dir));
});

gulp.task('scripts:vendor', function () {
	gulp.src(source.scripts.vendor) // path to your files
    .pipe(concat(build.scripts.vendor.main))
    .pipe(uglify(build.scripts.vendor.main))
    .pipe(gulp.dest(build.scripts.vendor.dir));
});
gulp.task('scripts:vendor1', function () {
	gulp.src(source.scripts.vendor1) // path to your files
    .pipe(concat(build.scripts.vendor1.main))
    .pipe(uglify(build.scripts.vendor1.main))
    .pipe(gulp.dest(build.scripts.vendor.dir));
});

gulp.task('scripts:vendor2', function () {
	gulp.src(source.scripts.vendor2) // path to your files
    .pipe(concat(build.scripts.vendor2.main))
    .pipe(uglify(build.scripts.vendor2.main))
    .pipe(gulp.dest(build.scripts.vendor.dir));
});

gulp.task('scripts:vendor22', function () {
	gulp.src(source.scripts.vendor22) // path to your files
    .pipe(concat(build.scripts.vendor22.main))
    .pipe(uglify(build.scripts.vendor22.main))
    .pipe(gulp.dest(build.scripts.vendor.dir));
});

gulp.task('scripts:vendor3', function () {
	gulp.src(source.scripts.vendor3) // path to your files
    .pipe(concat(build.scripts.vendor3.main))
   // .pipe(uglify(build.scripts.vendor3.main))
    .pipe(gulp.dest(build.scripts.vendor.dir));
});

gulp.task('scripts:vendor4', function () {
	gulp.src(source.scripts.vendor4) // path to your files
    .pipe(concat(build.scripts.vendor4.main))
    .pipe(uglify(build.scripts.vendor4.main))
    .pipe(gulp.dest(build.scripts.vendor.dir));
});

gulp.task('scripts:vendor5', function () {
	gulp.src(source.scripts.vendor5) // path to your files
    .pipe(concat(build.scripts.vendor5.main))
    .pipe(uglify(build.scripts.vendor5.main))
    .pipe(gulp.dest(build.scripts.vendor.dir));
});
  
gulp.task('scripts:vendor6', function () {
	gulp.src(source.scripts.vendor6) // path to your files
    .pipe(concat(build.scripts.vendor6.main))
    .pipe(uglify(build.scripts.vendor6.main))
    .pipe(gulp.dest(build.scripts.vendor.dir));
});

gulp.task('styles:vendor', function () {
	gulp.src(source.styles.app.css) // path to your files
    .pipe(cssconcat(build.styles.main))
    .pipe(gulp.dest(build.styles.dir));
});

gulp.task('prod:scripts:app', function () {
	gulp.src(source.scripts.app) // path to your files
    .pipe(concat(build.scripts.app.main))
    .pipe(gulp.dest(build.scripts.app.dir));
});
//,'scripts:vendor2','scripts:vendor22','scripts:vendor3','scripts:vendor4','scripts:vendor5','scripts:vendor6',

gulp.task('build', ['styles:vendor','scripts:vendor1','scripts:vendor2','scripts:vendor22','scripts:vendor3','scripts:vendor4','scripts:vendor5','scripts:vendor6','scripts:app']);

gulp.task('prod-build', [ 'prod:scripts:app']);

