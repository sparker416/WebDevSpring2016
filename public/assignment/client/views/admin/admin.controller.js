/**
 * Created by spark on 2/27/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $location, $route, UserService, $rootScope) {
        $scope.$location = $location;
        $scope.$route = $route;
        $scope.currentUser = UserService.getCurrentUser();
        $scope.selectedUser = null;
        $scope.currentUsers = UserService.getCurrentUsers();

        UserService
            .findAllUsers()
            .then(function (response) {
                UserService.setCurrentUsers(response.data);
                $scope.currentUsers = UserService.getCurrentUsers();
            });
        
        $rootScope.$on("updateCurrentUsers", function(){
            UserService
                .findAllUsers()
                .then(function (response) {
                    UserService.setCurrentUsers(response.data);
                    $scope.currentUsers = UserService.getCurrentUsers();
                });
        });

        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.deleteUser = deleteUser;
        $scope.selectUser = selectUser;

        function addUser(newUser)
        {
            if (newUser.username == null || newUser.username == ""
            || newUser.password == null || newUser.password == ""){

            } else {
                var user = {
                    username: newUser.username,
                    password: newUser.password,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    emails: [],
                    phones: [],
                    roles: newUser.roles
                };
                UserService
                    .createUser(user)
                    .then(function () {
                        $rootScope.$broadcast("updateCurrentUsers");
                    });
            }
        }

        function updateUser(user, id)
        {
            var updatedUser = {
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                emails: user.emails,
                phones: user.phones,
                roles: user.roles
            };

            UserService
                .updateUser(selectedUser._id, updatedUser)
                .then(function(){
                    $scope.selectedUser = null;
                    $scope.newUser = null;
                    $rootScope.$broadcast("updateCurrentUsers");
                });
        }

        function deleteUser(user)
        {
            UserService
                .deleteUserById(user._id)
                .then(function(response){
                    UserService.setCurrentUsers(response.data);
                    $rootScope.$broadcast("updateCurrentUsers");
                });
        }

        function selectUser(user)
        {
            $scope.selectedUser = user;
            $scope.newUser = $scope.selectedUser;
        }
    }
})();