/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("OwnerController", OwnerController);

    function OwnerController($scope, $location, UserService, $rootScope) {
        $scope.$location = $location;
        $scope.currentUser = UserService.getCurrentUser();

        $scope.isOwner = UserService.isOwner($scope.currentUser);

        if(!$scope.isOwner){
            $location.url("/home");
        }

        $scope.selectedUser = null;

        UserService.findAllUsers()
            .then(function(response){
                $scope.allUsers = response.data;
            });

        $rootScope.$on("refreshUsers", function(){
            UserService.findAllUsers()
                .then(function(response){
                    $scope.allUsers = response.data;
                    $scope.selectedUser = null;
                    $scope.newUser = null;
                });
        });

        $scope.addUser = addUser;
        $scope.editUser = editUser;
        $scope.deleteUser = deleteUser;
        $scope.selectUser = selectUser;

        function addUser(user)
        {
            var newRoles = [];

            if($scope.newUser.player){
                newRoles.push("player")
            } if($scope.newUser.admin){
                newRoles.push("admin")
            } if($scope.newUser.owner){
                newRoles.push("owner")
            }

            var newUser = {
                email: user.email,
                username: user.username,
                password: user.password,
                games: [],
                roles: newRoles
            };

            UserService.createUser(newUser)
                .then(function(response){
                    $scope.allUsers = response.data;
                    $scope.selectedUser = null;
                    $rootScope.$broadcast("refreshUsers");
                });
        }

        function editUser(userId, user)
        {
            var newRoles = [];

            if($scope.newUser.player){
                newRoles.push("player")
            } if($scope.newUser.admin){
                newRoles.push("admin")
            } if($scope.newUser.owner){
                newRoles.push("owner")
            }

            var updatedUser = {
                _id: user._id,
                email: user.email,
                username: user.username,
                password: user.password,
                games: user.games,
                roles: newRoles
            };

            UserService.updateUser(userId, updatedUser)
                .then(function(response){
                    $scope.allUsers = response.data;
                    $scope.selectedUser = null;
                    $rootScope.$broadcast("refreshUsers");
                });
        }

        function deleteUser($index)
        {
            var userId = $scope.allUsers[$index]._id;
            UserService.deleteUserById(userId)
                .then(function(response){
                    $scope.allUsers = response.data;
                    $scope.selectedUser = null;
                    $rootScope.$broadcast("refreshUsers");
                });
        }

        function selectUser($index)
        {
            $scope.selectedUser = $scope.allUsers[$index];
            $scope.newUser = $scope.selectedUser;
        }
    }
})();