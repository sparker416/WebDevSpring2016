/**
 * Created by spark on 3/5/2016.
 */
/**
 * Created by spark on 3/5/2016.
 */
(function(){
        angular
            .module("FormBuilderApp")
            .factory("FormService", FormService);

        function FormService($http, $rootScope) {
            var model = {
                setCurrentForms: setCurrentForms,
                getCurrentForms: getCurrentForms,

                createFormForUser: createFormForUser,
                findAllFormsForUser: findAllFormsForUser,
                deleteFormById: deleteFormById,
                updateFormById: updateFormById
            };
            return model;

            function setCurrentForms(forms)
            {
                $rootScope.currentForms = forms;
            }

            function getCurrentForms()
            {
                return $rootScope.currentForms;
            }

            function createFormForUser(userId, form)
            {
                return $http.post("/api/assignment/user/" + userId + "/form", form);
            }

            function findAllFormsForUser(userId)
            {
                return $http.get("/api/assignment/user/" + userId + "/form");
            }

            function deleteFormById(formId)
            {
                return $http.delete("/api/assignment/form/" + formId);
            }

            function updateFormById(formId, newForm)
            {
                return $http.put("/api/assignment/form/" + formId, newForm);
            }
        }
    }
)();