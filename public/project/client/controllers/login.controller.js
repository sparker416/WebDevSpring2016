/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, UserService, $location, $rootScope) {
        $scope.login = login;

        function login (user) {
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(function(response){
                    UserService.setCurrentUser(response.data);
                    $rootScope.$broadcast("updateCurrentUser");
                    $location.url("/profile")
                });
        }
    }
})();