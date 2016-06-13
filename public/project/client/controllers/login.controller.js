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

        function login (username, password) {
            UserService
                .findUserByCredentials(username, password)
                .then(function(response){
                    console.log(response.data);
                    UserService.setCurrentUser(response.data);
                    $rootScope.$broadcast("updateCurrentUser");
                    $location.url("/profile")
                });
        }
    }
})();