/**
 * Created by spark on 4/4/2016.
 */
(function()
{
    angular
        .module("KnightMovesApp")
        .factory("GameService", GameService);

    function GameService($rootScope)
    {
        var model = {
            games: [
                {
                    _id: "000",
                    name: "Risk",
                    userId: 123,
                    counter: 1
                },
                {
                    _id: "010",
                    name: "Monopoly",
                    userId: 123,
                    counter: 2
                },
                {
                    _id: "020",
                    name: "Clue",
                    userId: 234,
                    counter: 1
                }
            ],

            addGameByIdForUser: addGameByIdForUser,
            findAllGamesForUser: findAllGamesForUser,
            deleteGameByIdForUser: deleteGameByIdForUser
        };
        return model;

        function addGameByIdForUser(gameId, game, userId) {
            for (var i = 0; i < model.games.length; i++) {
                if (model.games[i].userId === userId) {
                    for (var u = 0; u < model.games.length; u++) {
                        if (model.games[u]._id === gameId) {
                            model.games[u].counter++;
                            return null;
                        }
                    }
                    model.games.push(game);
                    return model.games;
                }
            }
        }

        function findAllGamesForUser(userId)
        {
            var g = [];
            for (var u = 0; u < model.games.length; u++) {
                if(model.games[u].userId === userId){
                    g.push(model.games[u]);
                }
            }
            return g;
        }

        function deleteGameByIdForUser(gameId, userId)
        {
            for (var u = 0; u < model.games.length; u++) {
                if (model.games[u].id === gameId
                    && model.games[u].userId === userId) {
                    model.games.splice(u, 1);
                    return model.games;
                }
            }
            return null;
        }
    }
})();