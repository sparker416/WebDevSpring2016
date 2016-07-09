/**
 * Created by spark on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, UserService, $location, $rootScope) {
        $scope.$location = $location;
        $scope.currentUser = UserService.getCurrentUser();

        $scope.error = null;

        $scope.register = register;

        function register(username, password, verifyPassword) {

            $scope.error=null;
            
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
                        console.log(response);
                        console.log(response.config.data);
                        if(response.config.data){
                            UserService.setCurrentUser(response.config.data);
                            $location.url("/profile");
                            $rootScope.$broadcast("updateCurrentUser");
                        }
                    });
            } else{
                $scope.error="Passwords do not match."
            }
        }
    }
})();