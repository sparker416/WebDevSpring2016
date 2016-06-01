/**
 * Created by spark on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $location, $route, UserService) {
        $scope.$location = $location;
        $scope.$route = $route;
        $scope.currentUser = UserService.getCurrentUser();
        $scope.users = [];
        
        $scope.getUsers = getUsers;
        
        function getUsers() 
        {
            UserService.findAllUsers()
                .then(function(response){
                    $scope.users = response.data;
                });
        }

    }
})();