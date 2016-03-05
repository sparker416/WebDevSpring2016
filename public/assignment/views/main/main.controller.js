/**
 * Created by spark on 3/4/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
    }
})();