/**
 * Created by spark on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HomeController", HomeController);

    function HomeController($location, $route, UserService) {
        var vm = this;

        vm.$location = $location;
        vm.$route  = $route;
        vm.currentUser = UserService.getCurrentUser();
    }
})();