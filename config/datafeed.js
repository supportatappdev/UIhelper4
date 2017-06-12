


UIHelp.service('DataUtil', function($filter) {
    
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