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

    function FormService()
    {
        var model = {
            forms: [
                {"_id": "000", "title": "Contacts", "userId": 123},
                {"_id": "010", "title": "ToDo",     "userId": 123},
                {"_id": "020", "title": "CDs",      "userId": 234}
            ],
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return model;

        function createFormForUser(userId, form, callback){
            form._id = (new Date).getTime();
            form.userId = userId;
            model.forms.push(form);
            callback(form);
        }

        function findAllFormsForUser(userId, callback){
            for(var u in model.forms){
                if(model.forms[u].userId===userId){
                    var formsById = [];
                    formsById.push(model.forms[u]);
                    callback(formsById);
                } else {
                    callback([]);
                }
            }
        }

        function deleteFormById(formId, callback){
            for(var u in model.forms){
                if(model.forms[u]._id === formId){
                    model.forms.splice(formId, 1);
                    callback(model.forms);
                } else{
                    callback(model.forms);
                }
            }
        }

        function updateFormById(formId, newForm, callback){
            for(var u in model.forms){
                if(model.forms[u]._id === formId){
                    model.forms[u]._id = newForm._id;
                    model.forms[u].title = newForm.title;
                    callback(newForm);
                } else{
                    callback(newForm);
                }
            }
        }
    }
})();