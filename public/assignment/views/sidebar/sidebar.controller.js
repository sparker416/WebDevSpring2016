/**
 * Created by spark on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", sidebarController);

    function sidebarController($scope, $location) {
        $scope.$location = $location;
    }
})();