/**
 * Created by spark on 5/27/2016.
 */
var q = require('q');
var bcrypt = require("bcrypt-nodejs");

module.exports = function(db, mongoose) {
    var UserSchema = require("./user.schema.server")(mongoose);

    var User = mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function createUser(newUser){
        var deferred = q.defer();

        User.create(newUser, function(err, doc){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllUsers(){
        var deferred = q.defer();

        User.find({}, function(err, data){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(data);
            }
        });

        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();

        User.findById({_id: userId},
            function(err, data){
                if(err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(data);
                }
            });

        return deferred.promise;
    }

    function updateUser(userId, user) {
        var deferred = q.defer();

        User.findByIdAndUpdate(userId,
            user,
            function(err, data){
                if(err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(data);
                }
            });

        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();

        User.findByIdAndRemove(userId,
                User.find({}, function(err, data){
                    if(err){
                        deferred.reject(err);
                    } else {
                        deferred.resolve(data);
                    }
            }));
        return deferred.promise;
    }

    function findUserByUsername(usrnm) {
        var deferred = q.defer();

        User.findOne({username: usrnm}, function(err, foundUser){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(foundUser);
            }
        });

        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();

        User.findOne(
            { username: credentials.username,
                password: credentials.password },

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