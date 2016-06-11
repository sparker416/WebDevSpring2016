/**
 * Created by spark on 4/30/2016.
 */
var userDB = require("./user.mock.json");

module.exports = function() {
    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
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

    function findAllUsers() {
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