/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("LibraryController", LibraryController);

    function LibraryController($scope, $location, UserGameService) {
        $scope.$location = $location;

        UserGameService
            .findAllGames()
            .then(function(response) {
                $scope.allGames = response.data;
            });
    }
})();