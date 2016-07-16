/**
 * Created by spark on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($location, UserService, $route, $rootScope) {
        var vm = this;

        vm.$location = $location;
        vm.$route  = $route;
        vm.currentUser = UserService.getCurrentUser();

        $rootScope.$on("updateCurrentUser", function(){
            vm.currentUser = UserService.getCurrentUser();
        });
    }
})();