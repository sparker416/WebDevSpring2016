/**
 * Created by spark on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HomeController", homeController);

    function homeController($scope, $location) {
        $scope.$location = $location;
    }
})();