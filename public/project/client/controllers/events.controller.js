/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("EventsController", EventsController);

    function EventsController($scope, $location) {
        console.log($location);
        $scope.$location = $location;
    }
})();