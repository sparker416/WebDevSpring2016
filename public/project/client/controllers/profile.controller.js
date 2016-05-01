/**
 * Created by spark on 4/1/2016.

(function(){
    angular
        .module("KnightMovesApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $location, UserGameService) {
        $scope.currentUser = UserService.getCurrentUser();
        if (!$scope.currentUser) {
            $location.url("/home");
        }

        $scope.userGames = UserGameService.findAllGamesForUser($scope.currentUser._id, $scope.games);

        $scope.addGame = addGame;
        $scope.removeGame = removeGame;

        function addGame(gameName){
            var game = UserGameService.findGameByName(gameName);
            $scope.games = UserGameService.addGameForUser(game, $scope.currentUser._id);
        }

        function removeGame(game){
            $scope.games = UserGameService.deleteGameByIdForUser(game._id, $scope.currentUser._id);
        }
    }
})();
 */