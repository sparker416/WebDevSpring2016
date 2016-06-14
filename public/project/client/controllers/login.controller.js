/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, UserService, $location, $rootScope) {
        $scope.$location = $location;
        $scope.login = login;

        $rootScope.$on("updateCurrentUser", function(){
            $scope.currentUser = UserService.getCurrentUser();
        });

        function login (username, password) {
            UserService
                .findUserByCredentials(username, password)
                .then(function(response){
                    UserService.setCurrentUser(response.data);
                    $location.url("/profile");
                    $rootScope.$broadcast("updateCurrentUser");
                });
        }
    }
})();