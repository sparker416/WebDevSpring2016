/**
 * Created by spark on 5/27/2016.
 */

/**
 * Created by spark on 5/27/2016.
 */
var q = require('q');

module.exports = function(mongoose) {
    var FieldSchema = require("./field.schema.server")(mongoose);

    var FieldModel = mongoose.model("FieldModel", FieldSchema);

    var api = {
        findFieldsByFormId: findFieldsByFormId,
        findFieldById: findFieldById,
        deleteFieldById: deleteFieldById,
        createField: createField,
        updateFieldById: updateFieldById
    };
    return api;

    function findFieldsByFormId() {
        var deferred = q.defer();

        FieldModel.find({}, function(err, data){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(data);
            }
        });

        return deferred.promise;
    }

    function findFieldById(fieldId) {
        var deferred = q.defer();

        FieldModel.findOne({_id: fieldId},
            function(err, data){
                if(err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(data);
                }
            });

        return deferred.promise;
    }

    function deleteFieldById(fieldId) {
        var deferred = q.defer();

        FieldModel.findByIdAndRemove(fieldId,
            function(err, data){
                FieldModel.find({}, function(err, data){
                    if(err){
                        deferred.reject(err);
                    } else {
                        deferred.resolve(data);
                    }
                });
            });

        return deferred.promise;
    }

    function createField(field) {
        var deferred = q.defer();

        FieldModel.create(field, function(err, doc){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateFieldById (fieldId, updatedField) {
        var deferred = q.defer();

        FieldModel.findByIdAndUpdate(fieldId,
            {label: updatedField.label,
                type: updatedField.type,
                placeholder: updatedField.placeholder,
                options: updatedField.options
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
};