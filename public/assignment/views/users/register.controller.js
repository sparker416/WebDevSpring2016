/**
 * Created by spark on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location) {
        var vm = this;

        vm.register = register;

        function init() {

        }
        init();

        function register() {
            UserService
                .then(function(response){
                    var currentUser = response.data;
                    if(currentUser != null) {
                        UserService.createUser(currentUser);
                        $location.url("/profile");
                    }
                });
        }
    }
})();