/**
 * Created by spark on 3/24/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location) {
        console.log($location);
        $scope.$location = $location;
    }
})();