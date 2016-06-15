/**
 * Created by spark on 4/30/2016.
 */
var gameLibrary = require("./game.mock.json");

module.exports = function() {
    var api = {
        createGame: createGame,
        addUserToGame: addUserToGame,
        getAllGames: getAllGames,
        getGameById: getGameById,
        getGameByName: getGameByName,
        editGame: editGame,
        deleteGame: deleteGame,
        deleteUserFromGame: deleteUserFromGame
    };
    return api;

    function createGame(game){
        gameLibrary.push(game);
        return gameLibrary;
    }

    function addUserToGame(userId, gameId){
        var game = getGameById(gameId);
        for(var p in game.Players) {
            if (game.Players[p] == userId) {
                return game;
            } else {
                game.Players.push(userId);
                return game;
            }
        }
    }

    function getAllGames(){
        return gameLibrary;
    }

    function getGameById(gameId){
        var game = null;
        for (var i=0; i<gameLibrary.length; i++){
            if(gameId == gameLibrary[i].id){
                game = gameLibrary[i];
            }
        }
        return game;
    }

    function getGameByName(name){
        var game = null;
        for (var i=0; i<gameLibrary.length; i++){
            if(name == gameLibrary[i].Name){
                game = gameLibrary[i];
            }
        }
        return game;
    }

    function editGame(gameId, updatedGame){
        for (var i=0; i<gameLibrary.length; i++){
            if(gameId == gameLibrary[i].id){
                gameLibrary[i] = updatedGame;
            }
        }
        return gameLibrary;
    }

    function deleteGame(gameId){
        var index;
        for (var i=0; i<gameLibrary.length; i++){
            if(gameId == gameLibrary[i].id){
                gameLibrary.splice(i, 1);
            }
        }
        return gameLibrary;
    }

    function deleteUserFromGame(userId, gameId){
        var playerIndex;
        for (var i=0; i<gameLibrary.length; i++){
            if(gameLibrary[i].id == gameId){
                for(var j=0; j<gameLibrary[i].Players.length; j++) {
                    if (gameLibrary[i].Players[j] == userId) {
                        playerIndex = j;
                        gameLibray[i].Players.splice(playerIndex, 1);
                    }
                }
            }
        }
        return gameLibrary;
    }
};