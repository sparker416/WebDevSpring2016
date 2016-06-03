/**
 * Created by spark on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, $location, FormService, UserService, $rootScope, FieldService) {
        $scope.$location = $location;
        $scope.currentUser = UserService.getCurrentUser();
        $scope.selectedForm = FormService.getCurrentForm();
        $scope.sortableArray = FieldService.getCurrentFields();
        console.log($scope.sortableArray);

        $scope.$watch("sortableArray", function(value) {
            console.log("SortableArray: " + value.map(function(e){return e.id}).join(','));
        },true);

        $rootScope.$on("updateCurrentFields", function(){
            FieldService
                .getFieldsForForm($scope.selectedForm._id)
                .then(function(response){
                    FieldService.setCurrentFields(response.data);
                    $scope.sortableArray = FieldService.getCurrentFields();
                });
        });

        $scope.addField = addField;
        $scope.editField = editField;
        $scope.removeField = removeField;
        $scope.selectField = selectField;

        function addField(type)
        {

        }

        function editField(field)
        {

        }

        function removeField(field)
        {
            FieldService
                .deleteFieldFromForm($scope.selectedForm._id, field._id)
                .then(function(response){
                    FieldService.setCurrentFields(response.data);
                    $rootScope.$broadcast("updateCurrentFields");
                });
        }

        function selectField(index)
        {
            FieldService
                .getFieldForForm($scope.sortableArray[index]._id)
                .then(function(response){
                    $scope.currentField = response.data;
                });
        }
    }
})();