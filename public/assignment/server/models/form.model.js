/**
 * Created by spark on 5/27/2016.
 */

/**
 * Created by spark on 5/27/2016.
 */
var mockForms = require("./form.mock.json");

module.exports = function() {
    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle,
        findAllFormsForUser: findAllFormsForUser,
        findFieldsByFormId: findFieldsByFormId,
        findFieldById: findFieldById,
        deleteFieldById: deleteFieldById,
        createField: createField,
        updateFieldById: updateFieldById
    };
    return api;

    function createForm(newForm){
        mockForms.push(newForm);
        return mockForms;
    }

    function findAllForms() {
        return mockForms;
    }

    function findFormById(formId) {
        var form = null;
        for(var i=0; i<mockForms.length; i++){
            if(mockForms[i]._id === formId){
                form = mockForms[i];
            }
        }
        return form;
    }

    function updateForm(formId, form) {
        var index = mockForms.indexOf(findFormById(formId));
        mockForms[index]._id = form._id;
        mockForms[index].title = form.title;
        mockForms[index].userId = form.userId;
        mockForms[index].fields = form.fields;
        return mockForms;
    }

    function deleteForm(formId) {
        var form = findFormById(formId);
        var index = mockForms.indexOf(form);
        mockForms.splice(index, 1);
        return mockForms;
    }

    function findFormByTitle(title) {
        var form = null;
        for(var i=0; i<mockForms.length; i++){
            if(mockForms[i].title === title){
                form = mockForms[i];
            }
        }
        return form;
    }

    function findAllFormsForUser(userId) {
        var forms = [];
        for(var i=0; i<mockForms.length; i++){
            if(mockForms[i].userId == userId){
                forms.push(mockForms[i]);
            }
        }
        return forms;
    }

    function findFieldsByFormId(formId) {
        var form = findFormById(formId);
        return form.fields;
    }

    function findFieldById(formId, fieldId) {
        var form = findFormById(formId);
        var fields = form.fields;
        var field = null;
        for(var i=0; i<fields.length; i++){
            if(fields[i]._id == fieldId){
                field = fields[i];
            }
        }
        return field;
    }

    function deleteFieldById(formId, fieldId) {
        var fields = findFieldsByFormId(formId);
        for(var i=0; i<fields.length; i++){
            if(fields[i]._id == fieldId){
                var index = fields.indexOf(fields[i]);
                console.log(index);
                fields.splice(index, 1);
            }
        }
        return fields;
    }

    function createField(formId, field) {
        var form = findFormById(formId);
        var fields = form.fields;
        fields.push(field);
        return fields;
    }

    function updateFieldById (formId, fieldId, updatedField) {
        var form = findFormById(formId);
        var fields = form.fields;
        var field = findFieldById(formId, fieldId);
        var index = fields.indexOf(field);
        fields[index] = updatedField;
        return fields;
    }
};