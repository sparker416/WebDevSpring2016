/**
 * Created by spark on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $location, UserService, $route) {
        $scope.$location = $location;
        $scope.$route  = $route;

        $scope.currentUser = UserService.getCurrentUser();
        $scope.currentUserIsAdmin = UserService.userIsAdmin($scope.currentUser);
    }
})();