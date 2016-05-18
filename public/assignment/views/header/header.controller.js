/**
 * Created by spark on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, UserService) {
        $scope.$location = $location;
        $scope.currentUser = UserService.getCurrentUser();
        $scope.currentUserIsAdmin = UserService.userIsAdmin($scope.currentUser);

        $scope.logout = logout;

        function logout()
        {
            $scope.currentUser = UserService.setCurrentUser(null);
            $location.url("/home");
        }

    }
})();