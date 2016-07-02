(function(){
    angular
        .module("KnightMovesApp")
        .controller("DetailController", DetailController);

    function DetailController($scope, UserService, UserGameService, $rootScope, $location) {
        $scope.$location = $location;
        $scope.currentUser = UserService.getCurrentUser();
        $scope.currentGame = UserGameService.getCurrentGame();

        console.log($scope.currentGame);

        $rootScope.$on("updateCurrentGame", function(){
            $scope.currentGame = UserGameService.getCurrentGame();
        });
    }
})();
