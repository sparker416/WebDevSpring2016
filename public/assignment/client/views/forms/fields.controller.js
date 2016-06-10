/**
 * Created by spark on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, ngDialog, $location, FormService, UserService, $rootScope, FieldService, $routeParams) {
        $scope.$location = $location;
        $scope.currentUser = UserService.getCurrentUser();
        $scope.selectedForm = FormService.getCurrentForm();
        $scope.sortableArray = FieldService.getCurrentFields();
        $scope.userId = $routeParams.userId;
        $scope.formId = $routeParams.formId;

        FieldService.getFieldsForForm($scope.formId)
            .then(function(response){
                FieldService.setCurrentFields(response.data);
                $scope.sortableArray = FieldService.getCurrentFields();
            });

        $rootScope.$on("updateCurrentFields", function(){
            FieldService
                .getFieldsForForm($scope.formId)
                .then(function(response){
                    FieldService.setCurrentFields(response.data);
                    $scope.sortableArray = FieldService.getCurrentFields();
                });
        });

        $scope.addField = addField;
        $scope.editField = editField;
        $scope.removeField = removeField;
        $scope.selectField = selectField;
        $scope.openDialog = openDialog;

        function addField(type)
        {
            var newField;
            if (type === "Single Line Text Field"){
                newField = {
                    "_id": new Date().getTime(),
                    "label": "New Text Field",
                    "type": "TEXT",
                    "placeholder": "New Field"
                };
            } else if (type === "Multi Line Text Field"){
                newField = {
                    "_id": new Date().getTime(),
                    "label": "New Text Field",
                    "type": "TEXTAREA",
                    "placeholder": "New Field"
                };
            } else if (type === "Date Field") {
                newField = {
                    "_id": new Date().getTime(),
                    "label": "New Date Field",
                    "type": "DATE"
                };
            } else if (type === "Dropdown Field"){
                newField = {
                    "_id": new Date().getTime(),
                    "label": "New Dropdown",
                    "type": "OPTIONS",
                    "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]
                };
            } else if (type === "Checkboxes Field"){
                newField = {
                    "_id": new Date().getTime(),
                    "label": "New Checkboxes",
                    "type": "CHECKBOXES",
                    "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]
                };
            } else if (type === "Radio Buttons Field") {
                newField = {
                    "_id": new Date().getTime(),
                    "label": "New Radio Buttons",
                    "type": "RADIOS",
                    "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]
                };
            }
            FieldService
                .createFieldForForm($scope.formId, newField)
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
                    scope: $scope
                });
                dialog.closePromise.then(function(data){
                    $scope.editField(field, data.value.label, data.value.placeholder, null);
                });
            } else if (type === "TEXTAREA"){
                dialog = ngDialog.open({
                    template: 'TEXTAREADialogBox',
                    scope: $scope
                });
                dialog.closePromise.then(function(data){
                    $scope.editField(field, data.value.label, data.value.placeholder, null);
                });
            } else if (type === "DATE") {
                dialog = ngDialog.open({
                    template: 'DATEDialogBox',
                    scope: $scope
                });
                dialog.closePromise.then(function(data){
                    $scope.editField(field, data.value, null, null);
                });
            } else if (type === "OPTIONS"){
                dialog = ngDialog.open({
                    template: 'OPTIONSDialogBox',
                    scope: $scope
                });
                dialog.closePromise.then(function(data){
                    $scope.editField(field, data.value.label, null, data.value.options);
                });
            } else if (type === "CHECKBOXES"){
                dialog = ngDialog.open({
                    template: 'CHECKBOXESDialogBox',
                    scope: $scope
                });
                dialog.closePromise.then(function(data){
                    $scope.editField(field, data.value.label, null, data.value.options);
                });
            } else if (type === "RADIOS") {
                dialog = ngDialog.open({
                    template: 'RADIOSDialogBox',
                    scope: $scope
                });
                dialog.closePromise.then(function(data){
                    $scope.editField(field, data.value.label, null, data.value.options);
                });
            }
        }

        function editField(field, label, placeholder, options) {
            var updatedField;
            var updatedOptionsArray;
            var updatedOptions;
            if (field.type == "TEXT"){
                updatedField = {
                    "_id": field._id,
                    "label": label,
                    "type": "TEXT",
                    "placeholder": placeholder
                };
                FieldService
                    .updateField($scope.formId, updatedField._id, updatedField)
                    .then(function(response){
                        FieldService.setCurrentFields(response.data);
                        $rootScope.$broadcast("updateCurrentFields");
                    });
            } else if (field.type === "TEXTAREA"){
                updatedField = {
                    "_id": field._id,
                    "label": label,
                    "type": "TEXTAREA",
                    "placeholder": placeholder
                };
                FieldService
                    .updateField($scope.formId, updatedField._id, updatedField)
                    .then(function(response){
                        FieldService.setCurrentFields(response.data);
                        $rootScope.$broadcast("updateCurrentFields");
                    });
            } else if (field.type === "DATE") {
                updatedField = {
                    "_id": field._id,
                    "label": label,
                    "type": "DATE"
                };
                FieldService
                    .updateField($scope.formId, updatedField._id, updatedField)
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
                    "_id": field._id,
                    "label": label,
                    "type": "OPTIONS",
                    "options": updatedOptions
                };
                FieldService
                    .updateField($scope.formId, updatedField._id, updatedField)
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
                    "_id": field._id,
                    "label": label,
                    "type": "CHECKBOXES",
                    "options": updatedOptions
                };

                FieldService
                    .updateField($scope.formId, updatedField._id, updatedField)
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
                    "_id": field._id,
                    "label": label,
                    "type": "RADIOS",
                    "options": updatedOptions
                };

                FieldService
                    .updateField($scope.formId, updatedField._id, updatedField)
                    .then(function(response){
                        FieldService.setCurrentFields(response.data);
                        $rootScope.$broadcast("updateCurrentFields");
                    });
            }
        }


        function removeField($index)
        {
            var fieldId = $scope.sortableArray[$index]._id;
            FieldService
                .deleteFieldFromForm($scope.formId, fieldId)
                .then(function(response){
                    FieldService.setCurrentFields(response.data);
                    $rootScope.$broadcast("updateCurrentFields");
                });
        }

        function selectField($index)
        {
            FieldService
                .getFieldForForm($scope.sortableArray[$index]._id)
                .then(function(response){
                    $scope.currentField = response.data;
                });
        }
    }
})();