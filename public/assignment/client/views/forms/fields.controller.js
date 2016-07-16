/**
 * Created by spark on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController(ngDialog, $location, FormService, UserService, $rootScope, FieldService, $routeParams) {
        var vm = this;

        vm.$location = $location;
        vm.currentUser = UserService.getCurrentUser();
        vm.selectedForm = FormService.getCurrentForm();
        vm.sortableArray = FieldService.getCurrentFields();
        vm.userId = $routeParams.userId;
        vm.formId = $routeParams.formId;

        FieldService.getFieldsForForm(vm.formId)
            .then(function(response){
                FieldService.setCurrentFields(response.data);
                vm.sortableArray = FieldService.getCurrentFields();
            });

        $rootScope.$on("updateCurrentFields", function(){
            FieldService
                .getFieldsForForm(vm.formId)
                .then(function(response){
                    FieldService.setCurrentFields(response.data);
                    vm.sortableArray = FieldService.getCurrentFields();
                });
        });

        vm.addField = addField;
        vm.editField = editField;
        vm.removeField = removeField;
        vm.selectField = selectField;
        vm.openDialog = openDialog;

        function addField(type)
        {
            var newField;
            if (type === "Single Line Text Field"){
                newField = {
                    "label": "New Text Field",
                    "type": "TEXT",
                    "placeholder": "New Field",
                    options: []
                };
            } else if (type === "Multi Line Text Field"){
                newField = {
                    "label": "New Text Field",
                    "type": "TEXTAREA",
                    "placeholder": "New Field",
                    options: []
                };
            } else if (type === "Date Field") {
                newField = {
                    "label": "New Date Field",
                    "type": "DATE",
                    placeholder: "",
                    options: []
                };
            } else if (type === "Dropdown Field"){
                newField = {
                    "label": "New Dropdown",
                    "type": "OPTIONS",
                    placeholder: "",
                    "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]
                };
            } else if (type === "Checkboxes Field"){
                newField = {
                    "label": "New Checkboxes",
                    "type": "CHECKBOXES",
                    placeholder: "",
                    "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]
                };
            } else if (type === "Radio Buttons Field") {
                newField = {
                    "label": "New Radio Buttons",
                    "type": "RADIOS",
                    placeholder: "",
                    "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]
                };
            }
            FieldService
                .createFieldForForm(vm.formId, newField)
                .then(function(response){
                    FieldService.setCurrentFields(response.data);
                    $rootScope.$broadcast("updateCurrentFields");
                });
        }

        function openDialog(type, field){
            var dialog;
            if (type == "TEXT"){
                dialog = ngDialog.open({
                    template: 'TEXTDialogBox',
                });
                dialog.closePromise.then(function(data){
                    vm.editField(field, data.value.label, data.value.placeholder, null);
                });
            } else if (type === "TEXTAREA"){
                dialog = ngDialog.open({
                    template: 'TEXTAREADialogBox',
                });
                dialog.closePromise.then(function(data){
                    vm.editField(field, data.value.label, data.value.placeholder, null);
                });
            } else if (type === "DATE") {
                dialog = ngDialog.open({
                    template: 'DATEDialogBox',
                });
                dialog.closePromise.then(function(data){
                    vm.editField(field, data.value, null, null);
                });
            } else if (type === "OPTIONS"){
                dialog = ngDialog.open({
                    template: 'OPTIONSDialogBox',
                });
                dialog.closePromise.then(function(data){
                    vm.editField(field, data.value.label, null, data.value.options);
                });
            } else if (type === "CHECKBOXES"){
                dialog = ngDialog.open({
                    template: 'CHECKBOXESDialogBox',
                });
                dialog.closePromise.then(function(data){
                    vm.editField(field, data.value.label, null, data.value.options);
                });
            } else if (type === "RADIOS") {
                dialog = ngDialog.open({
                    template: 'RADIOSDialogBox',
                });
                dialog.closePromise.then(function(data){
                    vm.editField(field, data.value.label, null, data.value.options);
                });
            }
        }

        function editField(field, label, placeholder, options) {
            var updatedField;
            var updatedOptionsArray;
            var updatedOptions;
            if (field.type == "TEXT"){
                updatedField = {
                    _id: field._id,
                    "label": label,
                    "type": "TEXT",
                    "placeholder": placeholder,
                    options: options
                };
                FieldService
                    .updateField(vm.formId, updatedField._id, updatedField)
                    .then(function(response){
                        console.log(response)
                        FieldService.setCurrentFields(response.data);
                        $rootScope.$broadcast("updateCurrentFields");
                    });
            } else if (field.type === "TEXTAREA"){
                updatedField = {
                    _id: field._id,
                    "label": label,
                    "type": "TEXTAREA",
                    "placeholder": placeholder,
                    options: options
                };
                FieldService
                    .updateField(vm.formId, updatedField._id, updatedField)
                    .then(function(response){
                        FieldService.setCurrentFields(response.data);
                        $rootScope.$broadcast("updateCurrentFields");
                    });
            } else if (field.type === "DATE") {
                updatedField = {
                    _id: field._id,
                    "label": label,
                    "type": "DATE",
                    placeholder: placeholder,
                    options: options
                };
                FieldService
                    .updateField(vm.formId, updatedField._id, updatedField)
                    .then(function(response){
                        FieldService.setCurrentFields(response.data);
                        $rootScope.$broadcast("updateCurrentFields");
                    });
            } else if (field.type === "OPTIONS"){
                updatedOptionsArray = options.split(/[:\n]+/);
                updatedOptions = [];

                for(i=0; i<updatedOptionsArray.length; i+=2) {
                    updatedOptions.push({"label": updatedOptionsArray[i], "value": updatedOptionsArray[i+1]})
                }

                updatedField = {
                    _id: field._id,
                    "label": label,
                    "type": "OPTIONS",
                    placeholder: "",
                    "options": updatedOptions
                };
                FieldService
                    .updateField(vm.formId, updatedField._id, updatedField)
                    .then(function(response){
                        FieldService.setCurrentFields(response.data);
                        $rootScope.$broadcast("updateCurrentFields");
                    });
            } else if (field.type === "CHECKBOXES"){
                updatedOptionsArray = options.split(/[:\n]+/);
                updatedOptions = [];

                for(i=0; i<updatedOptionsArray.length; i+=2) {
                    updatedOptions.push({"label": updatedOptionsArray[i], "value": updatedOptionsArray[i+1]})
                }

                updatedField = {
                    _id: field._id,
                    "label": label,
                    "type": "CHECKBOXES",
                    placeholder: placeholder,
                    "options": updatedOptions
                };

                FieldService
                    .updateField(vm.formId, updatedField._id, updatedField)
                    .then(function(response){
                        FieldService.setCurrentFields(response.data);
                        $rootScope.$broadcast("updateCurrentFields");
                    });
            } else if (field.type === "RADIOS") {
                updatedOptionsArray = options.split(/[:\n]+/);
                updatedOptions = [];

                for(i=0; i<updatedOptionsArray.length; i+=2) {
                    updatedOptions.push({"label": updatedOptionsArray[i], "value": updatedOptionsArray[i+1]})
                }

                updatedField = {
                    _id: field._id,
                    "label": label,
                    "type": "RADIOS",
                    placeholder: placeholder,
                    "options": updatedOptions
                };

                FieldService
                    .updateField(vm.formId, updatedField._id, updatedField)
                    .then(function(response){
                        FieldService.setCurrentFields(response.data);
                        $rootScope.$broadcast("updateCurrentFields");
                    });
            }
        }


        function removeField(field)
        {
            var fieldId = field._id;
            FieldService
                .deleteFieldFromForm(vm.formId, fieldId)
                .then(function(response){
                    FieldService.setCurrentFields(response.data);
                    $rootScope.$broadcast("updateCurrentFields");
                });
        }

        function selectField(field)
        {
            FieldService
                .getFieldForForm(vm.formId, field._id)
                .then(function(response){
                    vm.currentField = response.data;
                });
        }
    }
})();