//config 
/**
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
        debug: false
    });
  $urlRouterProvider.otherwise("/app/components");
    $stateProvider
        .state('app.components', {
            url: "/components",
            templateUrl: "components/ui/view.html",
            data: { pageTitle: 'Components' }
        }).state('app.addc', {
            url: "/addc/:id",
            templateUrl: "components/ui/add.html",
            data: { pageTitle: 'Add Component' }
        })
        .state('app.icons', {
            url: "/icons",
            templateUrl: "components/ui/icons.html",
            data: { pageTitle: 'Icons' }
        })
}
UIHelp
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
        $rootScope.appName = "UIHelp";
    });