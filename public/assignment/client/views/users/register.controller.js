/**
 * Created by spark on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location, $rootScope) {
        var vm = this;

        vm.$location = $location;
        vm.currentUser = UserService.getCurrentUser();

        vm.error = null;

        vm.register = register;

        function register(username, password, verifyPassword) {

            vm.error=null;
            
            if (password === verifyPassword){
                var newUser = {
                    username: username,
                    password: password,
                    firstName: "First Name",
                    lastName: "Last Name",
                    emails: [],
                    phones: []
                };

                UserService.createUser(newUser)
                    .then(function(response){
                        if(response.data){
                            UserService.setCurrentUser(response.data);
                            $location.url("/profile");
                            $rootScope.$broadcast("updateCurrentUser");
                        }
                    });
            } else{
                vm.error="Passwords do not match."
            }
        }
    }
})();