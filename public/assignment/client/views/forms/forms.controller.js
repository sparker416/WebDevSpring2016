/**
 * Created by spark on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $location, UserService, $rootScope, FieldService) {
        var vm = this;

        vm.$location = $location;
        vm.currentUser = UserService.getCurrentUser();
        vm.currentForm = null;
        FormService
            .findAllFormsForUser(vm.currentUser._id)
            .then(function(response){
                FormService.setCurrentForms(response.data);
                vm.currentForms = FormService.getCurrentForms();
            });

        $rootScope.$on("updateCurrentForms", function(){
            FormService
                .findAllFormsForUser(vm.currentUser._id)
                .then(function(response){
                    FormService.setCurrentForms(response.data);
                    vm.currentForms = FormService.getCurrentForms();
                });
        });

        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;

        function addForm(formTitle){
            if (formTitle == null || formTitle == ""){
                
            } else {
                var newForm = {
                    userId: vm.currentUser._id,
                    title: formTitle,
                    fields: [],
                    created: new Date(),
                    updated: new Date()
                };
                FormService
                    .createFormForUser(vm.currentUser._id, newForm)
                    .then(function (response) {
                        FormService.setCurrentForms(response.data);
                        FormServcie.setCurrentForm(null);
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
                    vm.formTitle = null;
                    vm.currentForm = null;
                    FormService.setCurrentForm(null);
                    $rootScope.$broadcast("updateCurrentForms");
                });
        }

        function deleteForm(form){
            FormService
                .deleteFormById(form._id)
                .then(function(response){
                    FormService.setCurrentForms(response.data);
                    $rootScope.$broadcast("updateCurrentForms");
                });
        }

        function selectForm(form){
            vm.currentForm = form;
            vm.formTitle = vm.currentForm.title;

            FormService.setCurrentForm(vm.currentForm);
            FieldService.setCurrentFields(vm.currentForm.fields);
        }
    }
})();