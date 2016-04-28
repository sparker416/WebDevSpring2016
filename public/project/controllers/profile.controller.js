/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $location, GameService) {
        $scope.currentUser = UserService.getCurrentUser();
        if (!$scope.currentUser) {
            $location.url("/home");
        }

        $scope.games = GameService.findAllGamesForUser($scope.currentUser._id);

        $scope.addGame = addGame;
        $scope.removeGame = removeGame;

        function addGame(gameName){
            var game = GameService.findGameByName(gameName);
            $scope.games = GameService.addGameForUser(game, $scope.currentUser._id);
        }

        function removeGame(game){
            $scope.games = GameService.deleteGameByIdForUser(game._id, $scope.currentUser._id);
        }
    }
})();