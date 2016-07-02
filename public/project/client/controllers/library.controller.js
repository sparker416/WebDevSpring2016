/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("LibraryController", LibraryController);

    function LibraryController($scope, $location, UserGameService, $rootScope) {
        $scope.$location = $location;

        UserGameService
            .findAllGames()
            .then(function(response) {
                $scope.allGames = response.data;
            });


        $scope.goToDetails = goToDetails;

        function goToDetails($index)
        {
            $scope.currentGame = $scope.allGames[$index];
            UserGameService.setCurrentGame($scope.currentGame);
            $rootScope.$broadcast("updateCurrentGame");
            $location.url("/detail");
        }
    }
})();