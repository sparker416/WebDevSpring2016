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

        function addUser(username, password)
        {
            if (username == null || username == ""
            || password == null || password == ""){

            } else {
                var newUser = {
                    username: username,
                    password: password,
                    firstName: "First Name",
                    lastName: "Last Name",
                    emails: [],
                    phones: []
                };
                UserService
                    .createUser(newUser)
                    .then(function () {
                        $rootScope.$broadcast("updateCurrentUsers");
                    });
            }
        }

        function updateUser(username, password, selectedUser)
        {
            var updatedUser = {
                username: username,
                password: password,
                firstName: selectedUser.firstName,
                lastName: selectedUser.lastName,
                emails: selectedUser.emails,
                phones: selectedUser.phones
            };

            UserService
                .updateUser(selectedUser._id, updatedUser)
                .then(function(){
                    $scope.selectedUser = null;
                    $scope.newUsername = null;
                    $scope.newPassword = null;
                    $rootScope.$broadcast("updateCurrentUsers");
                });
        }

        function deleteUser($index)
        {
            UserService
                .deleteUserById($scope.currentUsers[$index]._id)
                .then(function(response){
                    UserService.setCurrentUsers(response.data);
                    $rootScope.$broadcast("updateCurrentUsers");
                });
        }

        function selectUser($index)
        {
            $scope.selectedUser = $scope.currentUsers[$index];
            $scope.newUsername = $scope.selectedUser.username;
            $scope.newPassword = $scope.selectedUser.password;
        }
    }
})();