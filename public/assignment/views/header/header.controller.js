/**
 * Created by spark on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location) {
        $scope.$location = $location;
    }
})();