/**
 * Created by spark on 5/27/2016.
 */
var mockUsers = require("./user.mock.json");
console.log(mockUsers);

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
        return mockUsers;
    }

    function findAllUsers() {
        return mockUsers;
    }

    function findUserById(userId) {
        var user = null;
        for(var i=0; i<mockUsers.length; i++){
            if(mockUsers[i]._id === userId){
                user = mockUsers[i];
            }
        }
        return user;
    }

    function updateUser(userId, user) {
        var index = mockUsers.indexOf(findUserById(userId));
        mockUsers[index]._id = user._id;
        mockUsers[index].firstName = user.firstName;
        mockUsers[index].lastName = user.lastName;
        mockUsers[index].username = user.username;
        mockUsers[index].password = user.password;
        return mockUsers[index];
    }

    function deleteUser(userId) {
        var user = findUserById(userId);
        var index = mockUsers.indexOf(user);
        mockUsers.splice(index, 1);
        return mockUsers;
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
        console.log(username);
        console.log(password);
        for(var i=0; i<mockUsers.length; i++){
            if(mockUsers[i].username === username && mockUsers[i].password === password){
                user = mockUsers[i];
            }
        }
        console.log(user);
        return user;
    }
};