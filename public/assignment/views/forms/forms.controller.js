/**
 * Created by spark on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, FormService, $location, UserService) {
        $scope.$location = $location;
        $scope.currentUser = UserService.getCurrentUser();
        $scope.currentForm = null;
        $scope.currentForms = FormService.getCurrentForms();

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        $scope.forms = FormService.findAllFormsForUser($scope.currentUser._id, FormService.setCurrentForms);

        function addForm(form){
            forms.push(FormService.createFormForUser($scope.currentUser._id, form, FormService.setCurrentForms));
        }

        function updateForm(form){
            FormService.updateFormById(form._id, form, FormService.setCurrentForms);
        }

        function deleteForm($index){
            FormService.deleteFormById(forms[$index]._id, FormService.setCurrentForms);
        }

        function selectForm($index){
            $scope.currentForm = forms[$index];
        }
    }
})();