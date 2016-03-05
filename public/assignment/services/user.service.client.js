/**
 * Created by spark on 3/5/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService()
    {
        var model = {
            currentUsers: [
                {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                    "username":"alice",  "password":"alice",   "roles": ["student"]		},
                {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                    "username":"bob",    "password":"bob",     "roles": ["admin"]		},
                {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                    "username":"charlie","password":"charlie", "roles": ["faculty"]		},
                {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                    "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
                {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                    "username":"ed",     "password":"ed",      "roles": ["student"]		}
            ],
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return model;

        function findUserByCredentials(username, password, callback){
            for(var u in model.currentUsers){
                if(model.currentUsers[u].username===username && model.currentUsers[u].password===password){
                    callback(model.currentUsers[u]);
                } else{
                    callback(null);
                }
            }
        }

        function findAllUsers(callback){
            callback(model.currentUsers);
        }

        function createUser(user, callback){
            user._id = (new Date).getTime();
            model.currentUsers.push(user);
            callback(user);
        }

        function deleteUserById(userId, callback) {
            for(var u in model.currentUsers){
                if(model.currentUsers[u]._id === userId){
                    model.currentUsers.splice(userId, 1);
                    callback(model.currentUsers);
                } else{
                    callback(model.currentUsers);
                }
            }
        }

        function updateUser(userId, user, callback){
            for(var u in model.currentUsers){
                if(model.currentUsers[u]._id === userId){
                    model.currentUsers[u]._id = user._id;
                    model.currentUsers[u].firstName = user.firstName;
                    model.currentUsers[u].lastName = user.lastName;
                    model.currentUsers[u].username = user.username;
                    model.currentUsers[u].password = user.password;
                    model.currentUsers[u].roles = user.roles;
                    callback(model.currentUsers[u]);
                } else{
                    callback(model.currentUsers[u]);
                }
            }
        }
    }
})();