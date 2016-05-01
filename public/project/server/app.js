/**
 * Created by spark on 3/4/2016.
 */
(function(){
    angular
        .module("KnightMovesApp", ["ngRoute"])
        .controller("GameController", GameController);

    function GameController($scope, GameService, UserService)
    {
        $scope.currentUser = UserService.getCurrentUser();

        $scope.renderGames = renderGames;
        $scope.selectGame = selectGame;
        $scope.removeGame = removeGame;
        $scope.createGame = createGame;
        $scope.updateGame = updateGame;

        GameService.findAllGames(renderGames);


        function renderGames(response)
        {
            $scope.games = response;
      //      $scope.userGames = GameService.findAllGamesForUser($scope.currentUser._id, $scope.games);
        }
        
        function selectGame(index)
        {
            $scope.selectedGameIndex = index;
            GameService.findOneGame(index, function(response)
            {
                $scope.currentGame = response;
            })
        }
        
        function removeGame(index)
        {
            GameService.deleteGame(index, renderGames);
        }
        
        function createGame(gameName)
        {
            var game = GameService.findGameByName(gameName, $scope.games);
            var newGame = {};
            newGame._id = game._id;
            newGame.name = game.name;
            newGame.userId = currentUser._id;
            newGame.counter = 1;
            newGame.dateLastPlayed = new Date();
            GameService.addGame(newGame, renderGames);
        }
        
        function updateGame(index)
        {
            GameService.updateGame(index, renderGames);
        }
    }
})();