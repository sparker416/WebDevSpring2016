/**
 * Created by spark on 4/4/2016.
 */
(function()
{
    angular
        .module("KnightMovesApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http)
    {
        var model = {
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserById: findUserById
        };
        return model;

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }

        function findUserByCredentials(username, password)
        {
            return $http.get("/rest/api/project/user?username=" + username + "&password=" + password);
        }

        function findAllUsers()
        {
            return $http.get("/rest/api/project/user");
        }

        function createUser(user)
        {
            return $http.post("/rest/api/project/user", user);
        }

        function deleteUserById(userId)
        {
            return $http.delete("/rest/api/project/user/" + userId);
        }

        function updateUser(userId, user)
        {
            return $http.put("/rest/api/project/user/" + userId, user);
        }

        function findUserById(userId)
        {
            return $http.get("/rest/api/project/user/" + userId);
        }

        function findUserByUsername(name)
        {
            return $http.get("/rest/api/project/user?username=" + username);
        }
    }
})();