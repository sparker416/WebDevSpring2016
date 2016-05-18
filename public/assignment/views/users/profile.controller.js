/**
 * Created by spark on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $location, $route) {
        $scope.$location = $location;
        $scope.$route  = $route;

        $scope.error = null;
        $scope.message = null;

        $scope.currentUser = UserService.getCurrentUser;


        $scope.updateUser = updateUser;

        function updateUser (user) {
            // same validation as register
            $scope.error = null;
            $scope.message = null;

            $scope.currentUser = UserService.updateUser(user._id, user, UserService.setCurrentUser);

            if (user) {
                $scope.message = "User updated successfully";
            } else {
                $scope.message = "Unable to update the user";
            }
        }
    }
})();