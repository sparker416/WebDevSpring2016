/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $location) {
        $scope.$location = $location;
    }
})();