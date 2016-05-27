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

    function FormService($rootScope)
    {
        var model = {
            forms: [
                {"_id": "000", "title": "Contacts", "userId": 123},
                {"_id": "010", "title": "ToDo",     "userId": 123},
                {"_id": "020", "title": "CDs",      "userId": 234}
            ],
            setCurrentForms: setCurrentForms,
            getCurrentForms: getCurrentForms,
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return model;

        function setCurrentForms(forms){
            $rootScope.currentForms = forms;
        }

        function getCurrentForms(){
            return $rootScope.currentForms;
        }

        function createFormForUser(userId, formTitle, callback){
            var newForm =
            {
                _id: (new Date).getTime(),
                title: formTitle,
                userId: userId
            };
            model.forms.push(newForm);
            callback(model.forms);
        }

        function findAllFormsForUser(userId, callback){
            var userForms = [];
            for(var u in model.forms){
                if(model.forms[u].userId === userId) {
                    userForms.push(model.forms[u]);
                }
                callback(userForms);
            }
        }

        function deleteFormById(formId, callback){
            for(var u in model.forms){
                if(model.forms[u]._id === formId){
                    model.forms.splice(u, 1);
                }
                callback(model.forms);
            }
        }

        function updateFormById(formId, formTitle, callback){
            for(var u in model.forms){
                if(model.forms[u]._id === formId){
                    model.forms[u].title = formTitle;
                }
                callback(model.forms);
            }
        }
    }
})();