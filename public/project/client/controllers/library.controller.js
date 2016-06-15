/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("LibraryController", LibraryController);

    function LibraryController($scope, $location, UserGameService, UserService) {
        $scope.$location = $location;
        $scope.displayUsernames = displayUsernames;

        UserGameService
            .findAllGames()
            .then(function(response) {
                $scope.allGames = response.data;
            });

        var playerId = $scope.currentPlayerId;
        UserService.findUserById(playerId)
            .then(function (response) {
                $scope.playerUsername(response.data);
            });


        function displayUsernames(playerIds){
            $scope.usernames = [];
            for(var i in playerIds){
                console.log(i);
                console.log(playerIds[i]);
                UserService.findUserById(playerIds[i])
                    .then(function(response){
                        $scope.usernames.push(response.data);
                    });
            }
            console.log($scope.usernames);
            return $scope.usernames;
        }
    }
})();