/**
 * Created by spark on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location) {
        $scope.$location = $location;

        $scope.register = register;

        var newUser = {
            "_id": new Date().getTime(),
            "firstName": "Place",
            "lastName": "Holder",
            "username": $scope.user.username,
            "password": $scope.user.password,
            "roles": ["student"]
        };
        
        function register() {
            UserService.createUser(newUser, UserService.setCurrentUser);
            $location.url("/profile");
        }
    }
})();