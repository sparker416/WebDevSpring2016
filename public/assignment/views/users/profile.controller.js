/**
 * Created by spark on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($scope, UserService, $location) {

        $scope.error = null;
        $scope.message = null;

        $scope.currentUser = UserService.findUserByCredentials($scope.currentUser.username, $scope.currentUser.password, updateUser($scope.currentUser));
        if (!$scope.currentUser) {
            $location.url("/home");
        }

        $scope.updateUser = updateUser;

        function updateUser (user) {
            // same validation as register
            $scope.error = null;
            $scope.message = null;

            $scope.currentUser = UserService.updateUser(user);

            if (user) {
                $scope.message = "User updated successfully";
                UserService.setCurrentUser($scope.currentUser);
            } else {
                $scope.message = "Unable to update the user";
            }
        }
    }
})();