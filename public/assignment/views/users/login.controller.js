/**
 * Created by spark on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController ($scope, UserService, $location, $rootScope) {
        $scope.login = login;

        function login (user) {
            var user = UserService.findUserByCredentials({username: user.username, password: user.password});
            if (user) {
                $rootScope.currentUser = user;
                $location.url("/profile");
            }
        }
    }
})();