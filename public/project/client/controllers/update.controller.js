/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("UpdateController", UpdateController);

    function UpdateController($scope, UserService, $location, $rootScope) {
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

            var updatedUser = {
                _id: $scope.currentUser._id,
                email: user.email,
                username: user.username,
                password: user.password,
                games: $scope.currentUser.games,
                roles: $scope.currentUser.roles
            };

            UserService
                .updateUser($scope.currentUser._id, updatedUser)
                .then(function (response) {
                    if (response.data) {
                        $scope.currentUser = response.data;
                        $scope.message = "User updated successfully";
                        $rootScope.$broadcast("updateCurrentUser");
                    } else {
                        $scope.error = "Unable to update the user";
                    }
                });
        }
    }
})();