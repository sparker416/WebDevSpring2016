/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("DirectionsController", DirectionsController);

    function DirectionsController($scope, $location) {
        console.log($location);
        $scope.$location = $location;
    }
})();