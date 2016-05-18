/**
 * Created by spark on 3/5/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService($rootScope)
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
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            userIsAdmin: userIsAdmin
        };
        return model;

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }

        function findUserByCredentials(username, password, callback){
            for(var u = 0; u < model.currentUsers.length; u++){
                var user = model.currentUsers[u];
                if(user.username===username && user.password===password){
                    callback(user);
                } else{
                    callback(null);
                }
            }
        }

        function findAllUsers(callback){
            callback(model.currentUsers);
        }

        function createUser(user, callback){
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

        function userIsAdmin(user)
        {
            if(user==null){
                return false;
            }
            else
            {
                var roles = user.roles;

                for(var i=0; i<roles.length; i++){
                    if(roles[i] === "admin")
                    {
                        return true;
                    }
                }
                return false;
            }
        }
    }
})();