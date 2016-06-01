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
                    "_id": new Date().getTime(),
                    "firstName": "First Name",
                    "lastName": "Last Name",
                    "username": username,
                    "password": password
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
                $scope.error="Passwords do not match."
            }
        }
    }
})();