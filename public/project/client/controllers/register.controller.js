/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $scope, UserService) {
        $scope.message = null;
        $scope.register = register;

        function register(user) {
            $scope.message = null;
            if (user == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.password2) {
                $scope.message = "Please provide a password";
                return;
            }

            if (user.password != user.password2) {
                $scope.message = "Passwords must match";
                return;
            }
            
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(function(response){
                    if (response.data != null) {
                        $scope.message = "User already exists";
                        $location.url("/login");
                    }                    
                });

            UserService
                .createUser(user)
                .then(function(response){
                    UserService.setCurrentUser(response.data);
                    $rootScope.$broadcast("updateCurrentUser");
                    $location.url("/profile");
                });
        }
    }
})();