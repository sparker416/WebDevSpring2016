/**
 * Created by spark on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $location, $route, $rootScope) {
        $scope.$location = $location;
        $scope.$route  = $route;

        $scope.error = null;
        $scope.message = null;

        $scope.currentUser = UserService.getCurrentUser();

        $scope.usernamePlaceholder = $scope.currentUser.username;
        $scope.firstNamePlaceholder = $scope.currentUser.firstName;
        $scope.lastNamePlaceholder = $scope.currentUser.lastName;

        $rootScope.$on("updateCurrentUser", function(){
            $scope.currentUser = UserService.getCurrentUser();
//            $scope.currentUserIsAdmin = UserService.userIsAdmin($scope.currentUser);

        });

        $scope.updateUser = updateUser;

        function updateUser (username, password, firstName, lastName) {
            $scope.error = null;
            $scope.message = null;

            var user = $scope.currentUser;

            var updatedUser = {
                "_id": user._id,
                "firstName": firstName,
                "lastName": lastName,
                "username": username,
                "password": password,
                "roles": user.roles
            };

            UserService
                .updateUser(user._id, updatedUser)
                .then(function(response){
                    if(response.data === updatedUser){
                        UserService.setCurrentUser(response.data);
                        $scope.message = "User updated successfully";
                        $rootScope.$broadcast("updateCurrentUser");
                    } else {
                        $scope.error = "Unable to update the user";
                    }
                });

        }
    }
})();