/**
 * Created by spark on 4/1/2016.
 * */

(function(){
    angular
        .module("KnightMovesApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $location, UserGameService, $rootScope) {
        $scope.currentUser = UserService.getCurrentUser();
        if (!$scope.currentUser) {
            $location.url("/home");
        }

        $rootScope.$on("updateCurrentUser", function(){
            $scope.currentUser = UserService.getCurrentUser();
        });

        UserGameService
            .findAllGamesForUser($scope.currentUser._id)
            .then(function(response){
                $scope.userGames = response.data;
            });

        $scope.addGame = addGame;
        $scope.removeGame = removeGame;

        function addGameForUser(gameName){
            UserGameService.findGameByName(gameName)
                .then(function(response){
                    var game = response.data;
                    UserService.addUserToGame($scope.currentUser._id, game)
                        .then(function(response){
                            $scope.games = response.data;
                        });
                });
        }

        function removeGame(game){
            UserGameService
                .deleteGameByIdForUser(game._id, $scope.currentUser._id)
                .then(function(response){
                    $scope.games = response.data;
                })
        }
    }
})();
