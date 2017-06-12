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