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