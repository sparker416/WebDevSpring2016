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

            var userId = $scope.currentUser._id;

            var updatedUser = {
                "_id": userId,
                "firstName": firstName,
                "lastName": lastName,
                "username": username,
                "password": password
            };

            UserService
                .updateUser(userId, updatedUser)
                .then(function(response){
                    if(response.data){
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