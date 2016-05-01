/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("AboutController", AboutController);

    function AboutController($scope, $location) {
        console.log($location);
        $scope.$location = $location;
    }
})();