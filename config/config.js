/**
 * UIHelp 
 * Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function appconfig($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        debug: false
    });

    $stateProvider
        .state('app', {
            abstract: true,
            url: "/app",
            templateUrl: "common/content.html",
        })
}
UIHelp.config(appconfig)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
        $rootScope.appName = "UIHelp";
    });