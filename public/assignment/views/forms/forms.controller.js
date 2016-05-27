/**
 * Created by spark on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, FormService, $location, UserService, $rootScope) {
        $scope.$location = $location;
        $scope.currentUser = UserService.getCurrentUser();
        $scope.currentForm = null;
        FormService.findAllFormsForUser($scope.currentUser._id, FormService.setCurrentForms);
        $scope.currentForms = FormService.getCurrentForms();

        $rootScope.$on("updateCurrentForms", function(){
            FormService.findAllFormsForUser($scope.currentUser._id, FormService.setCurrentForms);
            $scope.currentForms = FormService.getCurrentForms();
        });


        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function addForm(formTitle){
            FormService.createFormForUser($scope.currentUser._id, formTitle, FormService.setCurrentForms);
            $rootScope.$broadcast("updateCurrentForms");
        }

        function updateForm(formTitle, form){
            FormService.updateFormById(form._id, formTitle, FormService.setCurrentForms);
            $scope.formTitle = null;
            $scope.currentForm = null;
            $rootScope.$broadcast("updateCurrentForms");
        }

        function deleteForm($index){
            FormService.deleteFormById($scope.currentForms[$index]._id, FormService.setCurrentForms);
            $rootScope.$broadcast("updateCurrentForms");
        }

        function selectForm($index){
            $scope.currentForm = $scope.currentForms[$index];
            $scope.formTitle = $scope.currentForm.title;
        }
    }
})();