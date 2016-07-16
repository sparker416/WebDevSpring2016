/**
 * Created by spark on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService, $rootScope) {
        var vm = this;

        vm.$location = $location;
        vm.currentUser = UserService.getCurrentUser();

        $rootScope.$on("updateCurrentUser", function(){
            vm.currentUser = UserService.getCurrentUser();
        });

        vm.logout = logout;

        function logout(user)
        {
            UserService.logout(user)
                .then(function(response){
                    UserService.setCurrentUser(null);
                    $rootScope.$broadcast("updateCurrentUser");
                    $location.url("/home");
                });
        }
    }
})();