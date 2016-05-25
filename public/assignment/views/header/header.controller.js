/**
 * Created by spark on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, UserService, $rootScope) {
        $scope.$location = $location;
        $scope.currentUser = UserService.getCurrentUser();
        $scope.currentUserIsAdmin = UserService.userIsAdmin(UserService.getCurrentUser());

        $rootScope.$on("updateCurrentUser", function(){
            $scope.currentUser = UserService.getCurrentUser();
            $scope.currentUserIsAdmin = UserService.userIsAdmin($scope.currentUser);

        });

        $scope.logout = logout;

        function logout()
        {
            UserService.setCurrentUser(null);
            $rootScope.$broadcast("updateCurrentUser");
            $location.url("/home");
        }

    }
})();