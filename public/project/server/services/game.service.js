/**
 * Created by spark on 4/4/2016.
 */
(function()
{
    angular
        .module("KnightMovesApp")
        .factory("GameService", GameService);

    function GameService($http)
    {
        var svc = {
            addGame: addGame,
            findAllGames: findAllGames,
            findOneGame: findOneGame,
            deleteGame: deleteGame,
            updateGame: updateGame,
            findGameByName: findGameByName,
            findAllGamesForUser: findAllGamesForUser
        };
        return svc;

        function findAllGames(callback)
        {
            $http.get("/rest/game")
                .success(callback);
        }

        function findOneGame(id, callback)
        {
            $http
                .get("/rest/game/" + id)
                .success(callback);
        }

        function deleteGame(id, callback)
        {
            $http
                .delete("/rest/game/" + id)
                .then(callback);
        }

        function updateGame(id, callback)
        {
            $http
                .put("/rest/game/" + id)
                .then(callback);
        }

        function findAllGamesForUser(userId, gms)
        {
            var g = [];
            for (var u = 0; u < gms.length; u++) {
                if(gms[u].userId === userId){
                    g.push(gms[u]);
                }
            }
            return g;
        }

        function findGameByName(gameName, gms)
        {
            for (var u = 0; u < gms.length; u++) {
                if (gms[u].name.localeCompare(gameName) === 0){
                    return gms[u];
                }
            }
            return null;
        }

        function addGame(game, callback)
        {
            $http.post("/rest/game", game)
                .then(callback);
        }
    }
})();