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
        vm.$route = $route;
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

        function addUser(newUser, newPassword)
        {
            if (newUser.username == null || newUser.username == ""
            || newPassword == null || newPassword == ""){

            } else {
                var user = {
                    username: newUser.username,
                    password: newPassword,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    emails: [],
                    phones: [],
                    roles: newUser.roles
                };
                UserService
                    .adminAddUser(user)
                    .then(function (response) {
                        vm.newUser = null;
                        $rootScope.$broadcast("updateCurrentUsers");
                        console.log(vm.currentUsers);
                    });
            }
        }

        function updateUser(user, id, newPassword)
        {
            var updatedUser;
            if(newPassword) {
                updatedUser = {
                    username: user.username,
                    password: newPassword,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    emails: user.emails,
                    phones: user.phones,
                    roles: user.roles
                };
            } else {
                updatedUser = {
                    username: user.username,
                    password: vm.selectedUser.password,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    emails: user.emails,
                    phones: user.phones,
                    roles: user.roles
                }
            }

            UserService
                .updateUser(id, updatedUser)
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