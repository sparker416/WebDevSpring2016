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
                    counter: 1,
                    dateLastPlayed: new Date()
                },
                {
                    _id: "010",
                    name: "Monopoly",
                    userId: 123,
                    counter: 2,
                    dateLastPlayed: new Date()
                },
                {
                    _id: "020",
                    name: "Clue",
                    userId: 234,
                    counter: 1,
                    dateLastPlayed: new Date()
                }
            ],

            addGameForUser: addGameForUser,
            findAllGamesForUser: findAllGamesForUser,
            deleteGameByIdForUser: deleteGameByIdForUser,
            findGameByName: findGameByName
        };
        return model;

        function addGameForUser(game, userId) {
            var userGames = findAllGamesForUser(userId);
            for (var i = 0; i < userGames.length; i++) {
                if (userGames[i]._id === game._id) {
                    userGames[i].counter++;
                    userGames[i].dateLastPlayed = new Date();
                    return userGames;
                }
            }
            model.games.push({
                _id: game._id,
                name: game.name,
                userId: userId,
                counter: 1,
                dateLastPlayed: new Date()
            });
            userGames = findAllGamesForUser(userId);
            return userGames;
        }

        function findGameByName(gameName){
            for (var u = 0; u < model.games.length; u++) {
                if (model.games[u].name.localeCompare(gameName) === 0){
                    return model.games[u];
                }
            }
            return null;
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
                if (model.games[u]._id == gameId
                    && model.games[u].userId === userId) {
                    model.games.splice(u, 1);
                    return findAllGamesForUser(userId);
                }
            }
            return findAllGamesForUser(userId);
        }
    }
})();