/**
 * Created by spark on 4/1/2016.
 * */

(function(){
    angular
        .module("KnightMovesApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $location, UserGameService, $rootScope) {
        $scope.currentUser = UserService.getCurrentUser();
        $scope.userGames = UserGameService.getCurrentGames();
        if (!$scope.currentUser) {
            $location.url("/home");
        }

        $rootScope.$on("updateCurrentUser", function(){
            $scope.currentUser = UserService.getCurrentUser();
        });

        $rootScope.$on("updateUserGames", function(){
            $scope.userGames = UserGameService.getCurrentGames();
        });

        UserGameService
            .findAllGamesForUser($scope.currentUser._id)
            .then(function(response){
                $scope.userGames = response.data;
            });

        $scope.addGameForUser = addGameForUser;
        $scope.removeGameForUser = removeGameForUser;
        $scope.selectGame = selectGame;

        function addGameForUser(gameName){
            UserGameService.findGameByName(gameName)
                .then(function(response){
                    var game = response.data;
                    UserGameService
                        .addUserToGame($scope.currentUser._id, game)
                        .then(function(response){
                            UserGameService.setCurrentGames(response.data);
                            $rootScope.$broadcast("updateUserGames");
                        });
                });
        }

        function removeGameForUser(game){
            UserGameService
                .deleteUserFromGame($scope.currentUser._id, game.id)
                .then(function(response){
                    UserGameService.setCurrentGames(response.data);
                    $rootScope.$broadcast("updateUserGames");
                })
        }

        function selectGame($index){
            $scope.currentGame = $scope.userGames[$index];
        }
    }
})();
