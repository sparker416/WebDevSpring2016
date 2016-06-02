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
                setCurrentForm: setCurrentForm,
                getCurrentForm: getCurrentForm,
                createFormForUser: createFormForUser,
                findAllFormsForUser: findAllFormsForUser,
                findFormById: findFormById,
                findFormByTitle: findFormByTitle,
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

            function setCurrentForm(form)
            {
                $rootScope.currentForm = form;
            }

            function getCurrentForm()
            {
                return $rootScope.currentForm;
            }

            function createFormForUser(userId, form)
            {
                return $http.post("/api/assignment/user/" + userId + "/form", form);
            }

            function findAllFormsForUser(userId)
            {
                return $http.get("/api/assignment/user/" + userId + "/form");
            }

            function findFormById(formId)
            {
                return $http.get("/api/assignment/form/" + formId);
            }

            function findFormByTitle(title)
            {
                return $http.get("/api/assignment/form/" + title);
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