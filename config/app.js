/**
 * UIHelp
 */
(function () {
    angular.module('UIHelp', [
        'ui.router',                    // Routing
        'oc.lazyLoad',                  // ocLazyLoad
        'ui.bootstrap','ngclipboard',
         'cgNotify',
         'angular-bind-html-compile',
          'oitozero.ngSweetAlert' ,
        'ngResource',
        'ui.tree',
        'ui.codemirror' //code mirror 
    ])
})();

var UIHelp = angular.module('UIHelp');

function getBaseURL() {
	   return location.protocol + "//" + location.hostname + 
	      (location.port && ":" + location.port) ;
}; 
function getAppName(p) {
   return "/";
};
var _appUrl = getBaseURL()+getAppName(window.location.pathname);