/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("OwnerController", OwnerController);

    function OwnerController($scope, $location) {
        $scope.$location = $location;
    }
})();