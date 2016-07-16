/**
 * Created by spark on 5/27/2016.
 */

/**
 * Created by spark on 5/27/2016.
 */
var q = require('q');

module.exports = function(db, mongoose, FieldSchema) {
    var FormSchema = require("./form.schema.server")(mongoose, FieldSchema);

    var FormModel = mongoose.model("FormModel", FormSchema);

    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle,
        findAllFormsForUser: findAllFormsForUser
    };
    return api;

    function createForm(newForm){
        var deferred = q.defer();

        FormModel.create(newForm, function(err, doc){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllForms() {
        var deferred = q.defer();

        FormModel.find({}, function(err, data){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(data);
            }
        });

        return deferred.promise;
    }

    function findFormById(formId) {
        var deferred = q.defer();

        FormModel.findById({_id: formId},
            function(err, data){
                if(err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(data);
                }
            });

        return deferred.promise;
    }

    function updateForm(formId, form) {
        var deferred = q.defer();

        FormModel.findByIdAndUpdate(formId,
            {
                userId: form.userId,
                title: form.title,
                fields: form.fields,
                created: form.created,
                updated: form.updated
            },
            function(err, data){
                if(err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(data);
                }
            });

        return deferred.promise;
    }

    function deleteForm(formId) {
        var deferred = q.defer();

        FormModel.findByIdAndRemove(formId, function(err, data) {
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(findAllFormsForUser(data.userId));
            }
        });
        return deferred.promise;
    }

    function findFormByTitle(title) {
        var deferred = q.defer();

        FormModel.findOne({title: title},
            function(err, data){
                if(err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(data);
                }
            });

        return deferred.promise;
    }

    function findAllFormsForUser(usrId) {
        var deferred = q.defer();

        FormModel.find({userId: usrId},
            function(err, data){
                if(err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(data);
                }
            });

        return deferred.promise;
    }
};