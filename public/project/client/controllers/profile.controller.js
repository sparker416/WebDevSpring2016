/**
 * Created by spark on 4/1/2016.
 * */

(function(){
    angular
        .module("KnightMovesApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $location, UserGameService, $rootScope) {
        $scope.currentUser = UserService.getCurrentUser();
        $scope.error = null;

        if (!$scope.currentUser) {
            $location.url("/home");
        }

        $rootScope.$on("updateCurrentUser", function(){
            $scope.currentUser = UserService.getCurrentUser();
        });

        UserService
            .findAllGamesForUser($scope.currentUser._id)
            .then(function(response){
                $scope.userGames = response.data;
            });

        $rootScope.$on("updateUserGames", function(){
            UserService
                .findAllGamesForUser($scope.currentUser._id)
                .then(function(response){
                    $scope.userGames = response.data;
                });
        });



        $scope.addGameForUser = addGameForUser;
        $scope.removeGameForUser = removeGameForUser;
        $scope.selectGame = selectGame;

        function addGameForUser(userId, gameName){
            UserGameService.findGameByName(gameName)
                .then(function(response){
                    if(response.data){
                        $scope.error = null;
                        var game = response.data;
                        UserGameService
                            .addUserToGame(userId, game.id)
                            .then(function(response){
                                console.log(response.data);
                            });

                        UserService.addGame(userId, gameName)
                            .then(function(response){
                                $scope.userGames = response.data;
                                $rootScope.$broadcast("updateUserGames");
                            });
                    }
                    else {
                        $scope.error = "Game does not exist in database.";
                    }
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
