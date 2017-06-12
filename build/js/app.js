/**

 *
 * Custom scripts
 */

$(document).ready(function () {


    // Full height of sidebar
    function fix_height() {
        var heightWithoutNavbar = $("body > #wrapper").height() - 61;
        $(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");

        var navbarHeigh = $('nav.navbar-default').height();
        var wrapperHeigh = $('#page-wrapper').height();

        if(navbarHeigh > wrapperHeigh){
            $('#page-wrapper').css("min-height", navbarHeigh + "px");
        }

        if(navbarHeigh < wrapperHeigh){
            $('#page-wrapper').css("min-height", $(window).height()  + "px");
        }

    }

    $(window).bind("load resize scroll", function() {
        if(!$("body").hasClass('body-small')) {
                fix_height();
        }
    })

    // Move right sidebar top after scroll
    $(window).scroll(function(){
        if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav') ) {
            $('#right-sidebar').addClass('sidebar-top');
        } else {
            $('#right-sidebar').removeClass('sidebar-top');
        }
    });

    setTimeout(function(){
        fix_height();
    });

});

// Minimalize menu when screen is less than 768px
$(function() {
	$('body').addClass('skin-3');
    $(window).bind("load resize", function() {
        if ($(this).width() < 769) {
            $('body').addClass('body-small')
        } else {
            $('body').removeClass('body-small')
        }
    })
});
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

UIHelp.service('Util', function($filter) {
    this.trim = function(value) {
     return function(value) {
        if(!angular.isString(value)) {
            return value;
        }  
        return value.replace(/^\s+|\s+$/g, ''); // you could use .trim, but it's not going to work in IE<9
     };
    }
    this.convertDate = function(_date) {
        return $filter('date')(_date, "dd-MM-yyyy");
    }
    this.convertMMDate = function(_date) {
        return $filter('date')(_date, "MM/dd/yyyy");
    }
    this.convertDBDate = function(_date) {
        if (console) {
            console.log(_date + ":" + $filter('date')(_date, "yyyy-MM-dd HH:mm:ss"));
        }
        return $filter('date')(_date, "yyyy-MM-dd HH:mm:ss");
    }
    this.isEmpty = function(src) {
       if(src == undefined || src.trim().length == 0) {
           return true;
       }
       return false;
    }
});
UIHelp.service('BSServiceUtil', function(notify, ExportService, BSService, Cache) {
    this.getLookups = function(lookupType,callback,isCache) {
        var _key = 'lookup_res_' + lookupType;
        if (isCache && Cache.get(_key)) {
            return Cache.get(_key);
        } else {
            if(!isCache) {
              _key = '_NOCACHE_';
            
            }
            //queryResultWithCallback = function(dsName,keyName,wC,wCparams,oB,callback)
            return this.queryResultWithCallback("c3pLookupsRef", _key, 'LOOKUP_TYPE = ?', [lookupType], null, callback);
        }
    }
    this.removeData = function(key) {
        Cache.remove(key);
    }
    this.queryResultWithCallback = function(dsName, keyName, wC, wCparams, oB, callback, limit, offset, isCount, isExport, selectClause) {
        var inputJSON = {
            "ds": dsName,
            "executeCountSql": "N"
        };
        if (wC) {
            inputJSON.wC = wC;
        }
        if (wCparams) {
            inputJSON.params = wCparams;
        }
        if (oB) {
            inputJSON.oB = oB;
        }
        if (limit) {
            inputJSON.limit = limit;
        }
        if (offset) {
            inputJSON.offset = offset;
        }
        if (isCount) {
            inputJSON.is_count = "Y";
        }
        if (selectClause) {
            inputJSON.select = selectClause;
        }
        var _ser = BSService;
        if (isExport && isExport == "Y") {
            _ser = ExportService;
        }
        _ser.query({
            "method": "data"
        }, inputJSON, function(result) {
            if (result.status === "E") {
                notify({
                    message: result.title + ' - ' + result.errorMsg,
                    classes: 'alert-danger'
                });
            } else {
                if (!(isExport == "Y") && result.data.length > 0) {
                    if (keyName && keyName !== '_NOCACHE_') {
                        Cache.put(keyName, result.data);
                    }
                } //else {
                if (callback) {
                    if (isExport == "Y" || isCount) {
                        callback(result);
                    } else {
                        callback(result.data);
                    }
                }
                //callback();
                //}
            }
        });
    }
    this.queryResult = function(dsName, keyName) {
        var inputJSON = {
            "ds": dsName,
            "executeCountSql": "N"
        };
        if (dsName === "usersRef") {
            inputJSON.skipCondtions = "Y";
        }
        inputJSON.oB = "CREATION_DATE ASC";
        BSService.query({
            "method": "data"
        }, inputJSON, function(result) {
            console.log(result);
            if (result.status === "E") {
                notify({
                    message: result.title + ' - ' + result.errorMsg,
                    classes: 'alert-danger'
                });
            } else {
                if (result.data.length > 0) {
                    Cache.put(keyName, result.data);
                    return Cache.get(keyName);
                }
            }
        });
    }
});
UIHelp.service('EmailService', function(notify, BSService) {
    this.sendEmail = function(body, sourceId, attachmentIds) {
        var operation = "INSERT";
        var datajson = {
            'ds': 'c3pEmailService',
            'operation': operation,
            'data': {
                'srcId': sourceId,
                'body': body,
                'attachmentIds': attachmentIds
            }
        };
        BSService.save({
            'method': 'update'
        }, datajson, function(result) {
            if (result.status === "E") {
                notify({
                    message: result.title + ' - ' + result.errorMsg,
                    classes: 'alert-danger'
                });
            }
        });
    };
});
UIHelp.service('CommentService', function(notify, BSService) {
    var addOnlyComments = function(inputJson, callback) {
        var operation;
        var datajson;
        operation = "INSERT";
        var dataItem = {
            'ACTIVITY_ID': inputJson.actId,
            'COMMENT': inputJson.comment,
            'APP_ID': inputJson._appId,
            'ORG_ID': inputJson._orgId,
            'IS_CUSTOMER_UPDATE': 'N',
            'ATTACHMENT_ID': inputJson._fileId
        };
        var datajson = {
            'ds': 'commCommentsRef',
            'operation': operation,
            'data': dataItem
        };
        BSService.save({
            'method': 'update'
        }, datajson, function(result) {
            callback(result);
        });
    };
    this.addComment = function(inputJson, callback) {
        var operation = "INSERT";
        var _activityName = inputJson.comment;
        if (_activityName.length > 250) {
            _activityName = _activityName.substring(0, 240);
        }
        datajson = {
            'ds': 'commActivitiesRef',
            'operation': 'INSERT',
            'data': {
                'SOURCE_OBJECT_ID': inputJson.actId,
                'ACTIVITY_NAME': _activityName,
                'ACTIVITY_TYPE_ID': 0,
                'APP_ID': inputJson._appId,
                'ORG_ID': inputJson._orgId,
                //'CREATION_DATE': new Date(),
                'CREATED_BY': inputJson._uId,
                'LAST_UPDATED_BY': inputJson._uId,
                // 'LAST_UPDATE_DATE': new Date(),
                'isGenIds': "Y"
            }
        };
        BSService.save({
            'method': 'update'
        }, datajson, function(result) {
            if (result.status === "E") {
                notify({
                    message: result.title + ' - ' + result.errorMsg,
                    classes: 'alert-danger'
                });
            } else {
                var _genIds = result.ids;
                addOnlyComments(inputJson, callback);
            }
        });
    };
    this.getComments = function(input, callback) {
        var inputJSON = {
            'ds': 'deGetCommentsRefV',
            'executeCountSql': 'N'
        };
        inputJSON.wC = "ACTIVITY_ID = ? and APP_ID = ? and ORG_ID = ?";
        inputJSON.oB = "CREATION_DATE DESC";
        inputJSON.params = [input.actId, input._appId, input._orgId];
        BSService.query({
            'method': 'data'
        }, inputJSON, function(result) {
            callback(result);
        });
    };
});
var baseUrl = _appUrl + "/api/";
var importUrl = _appUrl + "/import";
var exportUrl = _appUrl + "/export/?isTemplate=N";
var attachUrl = _appUrl + "/aservice";
UIHelp.factory('ExportService', function($resource) {
    return $resource(exportUrl, {
        '8180': ':8180'
    }, {
        query: {
            method: 'POST',
            params: {},
            isArray: false
        },
        save: {
            method: 'POST',
            params: {},
            isArray: false
        },
        invoke: {
            method: 'POST',
            params: {},
            isArray: false
        },
        saveAll: {
            method: 'POST',
            params: {},
            isArray: true
        }
    });
});
UIHelp.factory('BSService', function($resource) {
    return $resource(baseUrl + ':method', {
        '8180': ':8180'
    }, {
        query: {
            method: 'POST',
            params: {},
            isArray: false
        },
        save: {
            method: 'POST',
            params: {},
            isArray: false
        },
        invoke: {
            method: 'POST',
            params: {},
            isArray: false
        },
        saveAll: {
            method: 'POST',
            params: {},
            isArray: true
        }
    });
});
var infoTemplate =  'common/notify.html';
UIHelp.service('AlertService', function(SweetAlert,notify) {
    this.showError = function(errTitle, errMessage) {
       this.showNotifyError(errTitle + "-" + errMessage);
    }
    this.showInfo = function(title, message) {
        notify({ message: title ,
                     classes: 'alert-info'});
    }
    this.showNotifyError =  function(title) {
         notify({ message: title ,
                     classes: 'alert-danger', 
                     templateUrl: infoTemplate});
    }
    this.showNotifyWarning =  function(title) {
         notify({ message: title ,
                     classes: 'alert-warning', 
                     templateUrl: infoTemplate});
    }
    this.showNotifySuccess =  function(title) {
         notify({ message: title ,
                     classes: 'alert-success', 
                     templateUrl: infoTemplate});
    }
    
    this.showNotifyInfo =  function(title) {
         notify({ message: title ,
                     classes: 'alert-info', 
                     templateUrl: infoTemplate});
    }
    
});
UIHelp.service('AppService', function(notify, BSServiceUtil, AlertService, Cache)
{
    this.getAppConstants = function(constName) {
        var callback = function(result) {
            if (result && result.length > 0) {
                return result[0].VAR_CODE;
            } else {
                AlertService.showError("App Error", "No value found for " + constName);
            }
        }
        BSServiceUtil.queryResultWithCallback("deAppEnvVarRef", "_NOCACHE_", "VAR_NAME = ? and APP_ID = ?", [constName, Cache.loggedInUserAppId()], undefined, callback);
    }
    this.getCountries = function(callercb) {
        var callback = function(result) {
            if (result && result.length > 0) {
               callercb(result);
            } else {
                AlertService.showError("App Error", "Error while getting countries list");
            }
        }
        BSServiceUtil.queryResultWithCallback("DeCountriesRef", "_NOCACHE_", undefined,undefined, undefined, callback);
    }
    
    this.getStates = function(callbackb,wC,wCParams) {
        var callback = function(result) {
            if (result && result.length > 0) {
               callbackb(result);
            } else {
                AlertService.showError("App Error", "Error while getting states list");
            }
        }
        BSServiceUtil.queryResultWithCallback("DeStatesRef", "_NOCACHE_", wC,wCParams, undefined, callback);
    }
    
    this.getLookupValue = function(lookuptype, lookupcode) {
        var _lookpus = this.getStaticLookups(lookuptype);
        if (_lookpus) {
            for(var i = 0 ; i < _lookpus.length; i++) {
              if(_lookpus[i].id === lookupcode) {
                 return _lookpus[i].value;
              }
            }
        }
    }
});
UIHelp.service('Cache', function() {
    var map;
    this.getRawValue = function(key) {
        return localStorage.getItem(key);
    };
    this.init = function() {
        if (map) {
            return;
        }
        if (localStorage.getItem('Cache')) {
            map = angular.fromJson(localStorage.getItem('Cache'));
        } else {
            map = {};
        }
    };
    this.get = function(k) {
        this.init();
        return map[k];
    };
    this.put = function(k, v) {
        this.init();
        map[k] = v;
        localStorage.setItem('Cache', angular.toJson(map));
        return map[k];
    };
    this.remove = function(k) {
        this.init();
        delete map[k];
        localStorage.setItem('Cache', angular.toJson(map));
    };
    this.loggedInUser = function() {
        return JSON.parse(angular.fromJson(localStorage.$_u));
    };
    this.loggedInUserAppId = function() {
        var _xUser = this.loggedInUser();
        return _xUser.appId;
    };
    this.loggedInRole = function() {
        var _xUser = this.loggedInUser();
        return _xUser.appRoles;
    }
});
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
/**
 * pageTitle - Directive for set Page title - mata title
 */
function pageTitle($rootScope, $timeout) {
    return {
        link: function(scope, element) {
            var listener = function(event, toState, toParams, fromState, fromParams) {
                // Default title - load on Dashboard 1
                var title = 'UIHelp | Responsive Admin Theme';
                // Create your own title pattern
                if (toState.data && toState.data.pageTitle) title = 'UIHelp | ' + toState.data.pageTitle;
                $timeout(function() {
                    element.text(title);
                });
            };
            $rootScope.$on('$stateChangeStart', listener);
        }
    }
};

/**
 * sideNavigation - Directive for run metsiMenu on sidebar navigation
 */
function sideNavigation($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            // Call the metsiMenu plugin and plug it to sidebar navigation
            $timeout(function(){
                element.metisMenu();
            });
        }
    };
};

/**
 * iboxTools - Directive for iBox tools elements in right corner of ibox
 */
function iboxTools($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            },
                // Function for close ibox
                $scope.closebox = function () {
                    var ibox = $element.closest('div.ibox');
                    ibox.remove();
                }
        }
    };
};

/**
 * minimalizaSidebar - Directive for minimalize sidebar
*/
function minimalizaSidebar($timeout) {
    return {
        restrict: 'A',
        template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
        controller: function ($scope, $element) {
            $scope.minimalize = function () {
                $("body").toggleClass("mini-navbar");
                if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                    // Hide menu in order to smoothly turn on when maximize menu
                    $('#side-menu').hide();
                    // For smoothly turn on menu
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(500);
                        }, 100);
                } else if ($('body').hasClass('fixed-sidebar')){
                    $('#side-menu').hide();
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(500);
                        }, 300);
                } else {
                    // Remove all inline style from jquery fadeIn function to reset menu state
                    $('#side-menu').removeAttr('style');
                }
            }
        }
    };
};



/**
 *
 * Pass all functions into module
 */
angular
    .module('UIHelp')
    .directive('pageTitle', pageTitle)
    .directive('sideNavigation', sideNavigation)
    .directive('iboxTools', iboxTools)
    .directive('minimalizaSidebar', minimalizaSidebar);
/**
 * MainCtrl - controller
 */
function MainCtrl($scope,AlertService) {
  $scope.onSuccess = function(e) {
		e.clearSelection();
	    AlertService.showInfo('Copied!');
    };

    $scope.onError = function(e) {
	     AlertService.showError((e.action));
    }
};


UIHelp
    .controller('MainCtrl', MainCtrl);
UIHelp.controller("CompListCtrl",function($state,Cache,$scope,$location,BSServiceUtil,Util,$modal,BSService,AlertService){
 $scope.addComponent  = function() {
     $location.path("/app/addc/new");
 }
 $scope.editComponent  = function(id) {
     $state.go("app.addc",{"id":id});
 }
 var getComponents = function() {
      var callback = function(result) {
            if(result) {
                $scope.components = result;     
            } else {
                $scope.components = [];
            }
        } 
        BSServiceUtil.queryResultWithCallback("UIHComponentsRef","_NOCACHE_",undefined,undefined,undefined,callback);
   
 }
 getComponents();
$scope.previewPopup = function(comp) {
    $scope.selectComp = comp;
    var modalInstance = $modal.open({
	            templateUrl: 'components/ui/preview.html',
	            size: 'lg',
	            scope:$scope,
	            controller: PrviewComponentCtrl
	        });
 }
});
//end of complist ctrl

UIHelp.controller("AddCompCtrl",function($state, $stateParams,Cache,$scope,$location,BSServiceUtil,Util,$modal,BSService,AlertService)
{
 $scope.editorOptions2 = {
        lineNumbers: true,
        matchBrackets: true,
         smartIndent: true,
        autofocus: true,
        height:"600px",
        styleActiveLine: true,
        extraKeys: {"Ctrl-Space": "autocomplete"}
    };
    var _user = Cache.loggedInUser();
 var getTypes = function() {
      var callback = function(result) {
            if(result) {
                $scope.types = result;     
            } else {
                $scope.types = [];
            }
        } 
        BSServiceUtil.queryResultWithCallback("UIHComponentTypesRef","_NOCACHE_",undefined,undefined,undefined,callback);
   
 }
 getTypes();
 var _id = $stateParams.id;
 var getComponentDetails = function(id) {
 }
 $scope.rowdata = {};
 var operation = 'UPDATE';
 if(_id == 'new') {
     operation = 'INSERT';
 } else {
      var callback = function(result) {
            if(result) {
                $scope.tab1.name = result[0].NAME;     
                $scope.tab1.desc = result[0].DESCRIPTION;     
                $scope.tab1.icon = result[0].COMP_TEXT;
                $scope.tab1.type = result[0].TYPE_ID;
                $scope.tab2.htmlcode = result[0].HTML_TEXT;
                $scope.tab3.jscode = result[0].JS_TEXT;
                $scope.rowdata =  result[0];
            } else {
                $scope.components = [];
            }
        } 
        BSServiceUtil.queryResultWithCallback("UIHComponentsRef","_NOCACHE_"," ID = ? ",[_id],undefined,callback);
 
 }
 $scope.tab1 = {};
 $scope.tab2 = {};
 $scope.tab3 = {};
 
 $scope.save = function() {
    $scope.savecomponent = true;
         var inputJSON = {
                            TYPE_ID:$scope.tab1.type,
                             COMP_TEXT:$scope.tab1.icon,
                             DESCRIPTION:$scope.tab1.desc,
                             HTML_TEXT:$scope.tab2.htmlcode,
                             JS_TEXT: $scope.tab3.jscode,
                             NAME:$scope.tab1.name,
                            
                            };
            if(operation == 'UPDATE') {
                 inputJSON.LAST_UPDATED_BY = _user.uId;
                 inputJSON.ID = _id;
            } 
            var params = {'ds':'UIHComponentsRef',
                           'operation':operation,
                           'data':inputJSON};
             BSService.save({'method':'update'},params ,
             function(result){
                 $scope.savecomponent = false;
             if (result.status === "E") {
                 AlertService.showNotifyError(result.title+' - '+result.errorMsg);
             } else {
                $scope.back();
             }
         });
  }
 $scope.back = function() {
      $location.path("/app/components");
  }
}); 


function PrviewComponentCtrl(AlertService,$scope, $modalInstance,notify,Cache) {
    $scope.cancel = function () {
        delete $scope.selectComp;
        $modalInstance.dismiss('cancel');
    }
};