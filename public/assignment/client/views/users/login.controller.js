/**
 * Created by spark on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController (UserService, $location, $rootScope) {
        var vm = this;

        vm.$location = $location;

        vm.error = null;
        vm.currentUser = UserService.getCurrentUser();

        vm.login = login;

        function login (user) {
            vm.error = null;

            UserService
                .findUserByCredentials(user)
                .then(function(response){
                    if(response.data){
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                        $rootScope.$broadcast("updateCurrentUser");
                    } else {
                        vm.error = "Could not log you in";
                    }
                });
        }
    }
})();