/**
 * Created by spark on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, $location, FieldService, FormService, UserService) {
        $scope.$location = $location;
        $scope.currentUser = UserService.getCurrentUser();
        $scope.selectedForm = FormService.getCurrentForm();
        $scope.fields = FieldService.getCurrentFields();

        FieldService
            .getFieldsForForm($scope.selectedForm._id)
            .then(function(response){
                FieldService.setCurrentFields(response.data);
                $scope.fields = FieldService.getCurrentFields();
            });



    }
})();