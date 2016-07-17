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
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            logout: logout,
            adminAddUser: adminAddUser
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

        function findUserByCredentials(user)
        {
            return $http.post("/api/assignment/login", user);
        }

        function findAllUsers()
        {
            return $http.get("/api/assignment/admin/user");
        }

        function createUser(user)
        {
            return $http.post("/api/assignment/register", user);
        }

        function adminAddUser(user)
        {
            return $http.post("/api/assignment/admin/user", user);
        }

        function deleteUserById(userId)
        {
            return $http.delete("/api/assignment/admin/user/" + userId);
        }

        function updateUser(userId, user)
        {
            return $http.put("/api/assignment/admin/user/" + userId, user);
        }

        function logout(user)
        {
            return $http.post("/api/assignment/logout", user);
        }
    }
})();