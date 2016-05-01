/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, UserService, $location) {
        $scope.login = login;

        function login (user) {
            var u = UserService.findUserByCredentials(user.username, user.password);
            if (u) {
                UserService.setCurrentUser(u);
                $location.url("/profile");
            }
        }
    }
})();