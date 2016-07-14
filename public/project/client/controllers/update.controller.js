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

            var updatedEmail;
            if(user.email){
                updatedEmail=user.email;
            } else {
                updatedEmail=$scope.currentUser.email;
            }

            var updatedUsername;
            if(user.username){
                updatedUsername=user.username;
            } else {
                updatedUsername=$scope.currentUser.username;
            }

            var updatedPassword;
            if(user.password && (user.password==user.confirmPassword)){
                updatedPassword=user.password;
            } else {
                updatedPassword=$scope.currentUser.password;
                $scope.error = "Password not updated.";
            }

            var updatedUser = {
                email: updatedEmail,
                username: updatedUsername,
                password: updatedPassword,
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