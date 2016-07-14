/**
 * Created by spark on 3/5/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope)
    {
        var model = {
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            setCurrentUsers: setCurrentUsers,
            getCurrentUsers: getCurrentUsers,
//            userIsAdmin: userIsAdmin,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return model;

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }

        function setCurrentUsers(users) {
            $rootScope.currentUsers = users;
        }

        function getCurrentUsers() {
            return $rootScope.currentUsers;
        }

        function findUserByUsername(username)
        {
            return $http.get("/api/assignment/user?username=" + username);
        }

        function findUserByCredentials(username, password)
        {
            return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
        }

        function findAllUsers()
        {
            return $http.get("/api/assignment/user");
        }

        function createUser(user)
        {
            return $http.post("/api/assignment/user", user);
        }

        function deleteUserById(userId)
        {
            return $http.delete("/api/assignment/user/" + userId);
        }

        function updateUser(userId, user)
        {
            return $http.put("/api/assignment/user/" + userId, user);
        }
    }
})();