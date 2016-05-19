/**
 * Created by spark on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController ($scope, UserService, $location, $rootScope) {
        $scope.$location = $location;

        $scope.error = null;
        $scope.currentUser = UserService.getCurrentUser(null);

        $scope.login = login;

        function login (usrnm, psswrd) {
            $scope.error = null;

            UserService.findUserByCredentials(usrnm, psswrd, UserService.setCurrentUser);
            $scope.currentUser = UserService.getCurrentUser();

            if ($scope.currentUser) {
                $location.url("/profile");
            } else {
                $scope.error = "Could not log you in";
            }
        }
    }
})();