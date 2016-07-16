/**
 * Created by spark on 2/27/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($location, $route, UserService, $rootScope) {
        var vm = this;

        vm.$location = $location;
        $rootScope.$location = $location;
 //       $scope.$route = $route;
        vm.currentUser = UserService.getCurrentUser();
        vm.selectedUser = null;
        vm.currentUsers = UserService.getCurrentUsers();

        UserService
            .findAllUsers()
            .then(function (response) {
                UserService.setCurrentUsers(response.data);
                vm.currentUsers = UserService.getCurrentUsers();
            });
        
        $rootScope.$on("updateCurrentUsers", function(){
            UserService
                .findAllUsers()
                .then(function (response) {
                    UserService.setCurrentUsers(response.data);
                    vm.currentUsers = UserService.getCurrentUsers();
                });
        });

        vm.addUser = addUser;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.selectUser = selectUser;

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
                    vm.selectedUser = null;
                    vm.newUser = null;
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
            vm.selectedUser = user;
            vm.newUser = vm.selectedUser;
        }
    }
})();