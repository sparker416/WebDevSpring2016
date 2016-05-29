/**
 * Created by spark on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, $location) {
        $scope.$location = $location;
    }
})();