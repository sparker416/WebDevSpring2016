/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("PricingController", PricingController);

    function PricingController($scope, $location) {
        console.log($location);
        $scope.$location = $location;
    }
})();