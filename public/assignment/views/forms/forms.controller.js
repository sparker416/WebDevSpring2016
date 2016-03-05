/**
 * Created by spark on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", formController);

    function formController($scope, FormService, $location) {

        $scope.error = null;
        $scope.message = null;

        $scope.forms = FormService.findAllFormsForUser($scope.currentUser._id);

        function addForm(form){
            forms.push(FormService.createFormForUser($scope.currentUser._id, form));
        }

        function updateForm(form){
            FormService.updateFormById(form._id, form)
        }

        function deleteForm($index){
            FormService.deleteFormById(forms[$index]._id);
        }

        function selectForm($index){
            var currentForm = forms[$index];
            FormService.updateFormById(currentForm._id, currentForm);
        }

        function updateUser (user) {
            // same validation as register
            $scope.error = null;
            $scope.message = null;

            $scope.currentUser = UserService.updateUser(user);

            if (user) {
                $scope.message = "User updated successfully";
                UserService.setCurrentUser($scope.currentUser);
            } else {
                $scope.message = "Unable to update the user";
            }
        }
    }
})();