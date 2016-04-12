/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("ProfileController", ProfileController);


    function ProfileController($scope, UserService, $location) {
        $scope.error = null;
        $scope.message = null;

        $scope.currentUser = UserService.getCurrentUser();
        if (!$scope.currentUser) {
            $location.url("/home");
        }

        $scope.profileUpdate = profileUpdate;

        function profileUpdate (user) {
            // same validation as register
            $scope.error = null;
            $scope.message = null;

            $scope.currentUser = UserService.updateUser($scope.currentUser);

            if (user) {
                $scope.message = "User updated successfully";
            } else {
                $scope.message = "Unable to update the user";
            }
        }
    }
})();