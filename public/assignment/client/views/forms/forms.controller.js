/**
 * Created by spark on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, FormService, $location, UserService, $rootScope, FieldService) {
        $scope.$location = $location;
        $scope.currentUser = UserService.getCurrentUser();
        $scope.currentForm = null;
        FormService
            .findAllFormsForUser($scope.currentUser._id)
            .then(function(response){
                FormService.setCurrentForms(response.data);
                $scope.currentForms = FormService.getCurrentForms();
            });

        $rootScope.$on("updateCurrentForms", function(){
            FormService
                .findAllFormsForUser($scope.currentUser._id)
                .then(function(response){
                    FormService.setCurrentForms(response.data);
                    $scope.currentForms = FormService.getCurrentForms();
                });
        });

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function addForm(formTitle){
            if (formTitle == null || formTitle == ""){
                
            } else {
                var newForm = {
                    userId: $scope.currentUser._id,
                    title: formTitle,
                    fields: [],
                    created: new Date(),
                    updated: new Date()
                };
                console.log(newForm);
                FormService
                    .createFormForUser($scope.currentUser._id, newForm)
                    .then(function (response) {
                        console.log(response);
                        FormService.setCurrentForms(response.data);
                        $rootScope.$broadcast("updateCurrentForms");
                    });
            }
        }

        function updateForm(formTitle, form){
            var updatedForm = {
                _id: form._id,
                userId: form.userId,
                "title": formTitle,
                "fields": form.fields,
                created: form.created,
                updated: new Date()
            };
            FormService
                .updateFormById(form._id, updatedForm)
                .then(function(response){
                    FormService.setCurrentForms(response.data);
                    $scope.formTitle = null;
                    $scope.currentForm = null;
                    FormService.setCurrentForm(null);
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

            FormService.setCurrentForm($scope.currentForm);
            FieldService.setCurrentFields($scope.currentForm.fields);
        }
    }
})();