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
        $scope.currentUser = UserService.getCurrentUser();

        $scope.login = login;

        function login (usrnm, psswrd) {
            $scope.error = null;
            
            UserService
                .findUserByCredentials(usrnm, psswrd)
                .then(function(response){
                    console.log(response);
                    if(response.data){
                        console.log(response.data);
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                        $rootScope.$broadcast("updateCurrentUser");
                    } else {
                        $scope.error = "Could not log you in";
                    }
                });
        }
    }
})();