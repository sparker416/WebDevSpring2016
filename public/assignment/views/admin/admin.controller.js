/**
 * Created by spark on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $location, $route) {
        $scope.$location = $location;
        $scope.$route = $route;
    }
})();