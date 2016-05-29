/**
 * Created by spark on 3/4/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);

    function MainController($scope, $location, UserService) {
        $scope.$location = $location;
        $scope.currentUser = UserService.getCurrentUser();
    }
})();