/**
 * Created by spark on 5/27/2016.
 */
var mockUsers = require("./user.mock.json");

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
        mockUsers.push(newUser);
        return mockUsers[mockUsers.length-1];
    }

    function findAllUsers() {
        console.log(mockUsers);
        return mockUsers;
    }

    function findUserById(userId) {
        var user = null;
        for(var i=0; i<mockUsers.length; i++){
            if(mockUsers[i]._id == userId){
                user = mockUsers[i];
            }
        }
        return user;
    }

    function updateUser(userId, user) {
        var newUser = null;
        for(var i=0; i<mockUsers.length; i++) {
            if (mockUsers[i]._id == userId) {
                mockUsers[i] = user;
                newUser = mockUsers[i];
            }
        }
        return newUser;
    }

    function deleteUser(userId) {
        var index = null;
        for(var i=0; i<mockUsers.length; i++){
          if(mockUsers[i]._id == userId){
              index = i;
              mockUsers.splice(index, 1);
              return mockUsers;
          }
        }
    }

    function findUserByUsername(username) {
        var user = null;
        for(var i=0; i<mockUsers.length; i++){
            if(mockUsers[i].username === username){
                user = mockUsers[i];
            }
        }
        return user;
    }

    function findUserByCredentials(credentials) {
        var username = credentials.username;
        var password = credentials.password;
        var user = null;
        for(var i=0; i<mockUsers.length; i++){
            if(mockUsers[i].username === username && mockUsers[i].password === password){
                user = mockUsers[i];
            }
        }
        return user;
    }
};