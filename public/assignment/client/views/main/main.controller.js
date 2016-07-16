/**
 * Created by spark on 3/4/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);

    function MainController($location, UserService) {
        var vm = this;
        
        vm.$location = $location;
        vm.currentUser = UserService.getCurrentUser();
    }
})();