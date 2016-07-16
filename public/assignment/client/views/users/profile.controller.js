/**
 * Created by spark on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location, $route, $rootScope) {
        var vm = this;

        vm.$location = $location;
        vm.$route  = $route;

        vm.error = null;
        vm.message = null;

        vm.currentUser = UserService.getCurrentUser();

        vm.usernamePlaceholder = vm.currentUser.username;
        vm.firstNamePlaceholder = vm.currentUser.firstName;
        vm.lastNamePlaceholder = vm.currentUser.lastName;
        
        $rootScope.$on("updateCurrentUser", function(){
            vm.currentUser = UserService.getCurrentUser();
        });

        vm.updateUser = updateUser;

        function updateUser (user) {
            vm.error = null;
            vm.message = null;

            var userId = vm.currentUser._id;

            var updatedUser = {
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                emails: vm.currentUser.emails,
                phones:vm.currentUser.phones,
                roles: vm.currentUser.roles
            };

            UserService
                .updateUser(userId, updatedUser)
                .then(function(response){
                    console.log(response);
                    if(response.data){
                        UserService.setCurrentUser(response.data);
                        vm.message = "User updated successfully";
                        $rootScope.$broadcast("updateCurrentUser");
                    } else {
                        vm.error = "Unable to update the user";
                    }
                });
        }
    }
})();