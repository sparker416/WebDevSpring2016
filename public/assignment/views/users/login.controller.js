/**
 * Created by spark on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController ($scope, UserService, $location, $rootScope) {
        $scope.$location = $location;

        $scope.login = login;

        function login (username, password) {
            UserService.findUserByCredentials(username, password, UserService.setCurrentUser);
            if ($scope.currentUser) {
                $location.url("/profile");
            }
        }
    }
})();