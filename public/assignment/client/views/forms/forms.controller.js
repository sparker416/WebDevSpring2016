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
        FormService
            .findAllFormsForUser($scope.currentUser._id)
            .then(function(response){
                FormsService.setCurrentForms(response);
            });
        $scope.currentForms = FormService.getCurrentForms();

        $rootScope.$on("updateCurrentForms", function(){
            FormService
                .findAllFormsForUser($scope.currentUser._id)
                .then(function(response){
                    FormsService.setCurrentForms(response);
                });
            $scope.currentForms = FormService.getCurrentForms();
        });

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function addForm(formTitle){
            var newForm = {
                "_id": new Date().getTime(),
                "title": formTitle,
                "userId": $scope.currentUser._id,
                "fields": []
            };
            FormService
                .createFormForUser($scope.currentUser._id, newForm)
                .then(function(response){
                    FormService.setCurrentForms(response.data);
                    $rootScope.$broadcast("updateCurrentForms");
                });
        }

        function updateForm(formTitle, form){
            var updatedForm = {
                "_id": form._id,
                "title": formTitle,
                "userId": form.userId,
                "fields": form.fields
            };
            FormService
                .updateFormById(form._id, updatedForm)
                .then(function(response){
                    FormService.setCurrentForms(response.data);
                    $scope.formTitle = null;
                    $scope.currentForm = null;
                    $rootScope.$broadcast("updateCurrentForms");
                });
        }

        function deleteForm($index){
            FormService
                .deleteFormById($scope.currentForms[$index]._id)
                .then(function(response){
                    FormService.setCurrentForms(response.data);
                    $rootScope.$broadcast("updateCurrentForms");
                });
        }

        function selectForm($index){
            $scope.currentForm = $scope.currentForms[$index];
            $scope.formTitle = $scope.currentForm.title;
        }
    }
})();