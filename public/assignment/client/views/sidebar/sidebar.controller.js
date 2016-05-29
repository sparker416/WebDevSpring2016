/**
 * Created by spark on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $location, UserService, $route, $rootScope) {
        $scope.$location = $location;
        $scope.$route  = $route;
        $scope.currentUser = UserService.getCurrentUser();
        $scope.currentUserIsAdmin = UserService.userIsAdmin($scope.currentUser);


        $rootScope.$on("updateCurrentUser", function(){
            $scope.currentUser = UserService.getCurrentUser();
            $scope.currentUserIsAdmin = UserService.userIsAdmin($scope.currentUser);

        });
    }
})();