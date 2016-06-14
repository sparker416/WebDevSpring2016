/**
 * Created by spark on 4/30/2016.
 */
var userDB = require("./user.mock.json");

module.exports = function() {
    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findAllGamesForUser: findAllGamesForUser,
        addGame: addGame,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;
    
    function createUser(newUser){
        userDB.push(newUser);
        return userDB[userDB.length-1];
    }

    function findAllUsers(){
        return userDB;
    }

    function findUserById(userId) {
        var user = null;
        for(var i=0; i<userDB.length; i++){
            if(userDB[i]._id == userId){
                user = userDB[i];
            }
        }
        return user;
    }

    function findAllGamesForUser(userId)
    {
        var games = [];
        for(var i=0; i<userDB.length; i++){
            if(userId == userDB[i]._id){
                for(var j=0; j<userDB[i].games.length; j++){
                    games.push(userDB[i].games[j]);
                }
            }
        }
        return games;
    }

    function addGame(userId, gameName)
    {
        var updatedGames = findAllGamesForUser(userId);
        for(var g=0; g<updatedGames.length; g++) {
            if(updatedGames[g].name == gameName){
                updatedGames[g].timesPlayed++;
                updatedGames[g].dateLastPlayed = new Date().getMonth()+1 + "/" + new Date().getDate() + "/" + new Date().getFullYear();
                findUserById(userId).games = updatedGames;
                return findUserById(userId).games;
            }
        }
        updatedGames.push({"name": gameName, "dateLastPlayed": new Date().getMonth()+1 + "/" + new Date().getDate() + "/" + new Date().getFullYear(), "timesPlayed": 1});
        findUserById(userId).games = updatedGames;
        return findUserById(userId).games;
    }
    
    function updateUser(userId, user) {
        var newUser = null;
        for(var i=0; i<userDB.length; i++) {
            if (userDB[i]._id == userId) {
                userDB[i] = user;
                newUser = userDB[i];
            }
        }
        return newUser;
    }

    function deleteUser(userId) {
        var index = null;
        for(var i=0; i<userDB.length; i++){
            if(userDB[i]._id == userId){
                index = i;
                userDB.splice(index, 1);
                return userDB;
            }
        }
    }

    function findUserByUsername(username) {
        var user = null;
        for(var i=0; i<userDB.length; i++){
            if(userDB[i].username === username){
                user = userDB[i];
            }
        }
        return user;
    }

    function findUserByCredentials(credentials) {
        var username = credentials.username;
        var password = credentials.password;
        var user = null;
        for(var i=0; i<userDB.length; i++){
            if(userDB[i].username === username && userDB[i].password === password){
                user = userDB[i];
            }
        }
        return user;
    }
};