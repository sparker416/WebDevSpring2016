/**
 * Created by spark on 5/27/2016.
 */
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
        User.findOne({username: newUser.username}, function(err, user)
        {
            if(user == null)
            {
                User.create(newUser, function(err, user){
                    User.findOne({username: newUser.username}, function(err, user){
                        return user;
                    });
                });
            }
        });
    }

    function findAllUsers(){
        User.find(function(err, data){
            console.log(data);
            return data;
        });
    }

    function findUserById(userId) {
        User.findById(userId, function(err, data){
            console.log(data);
            return data;
        })
    }

    function updateUser(userId, user) {
        User.update({_id: userId},
            {username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                emails: user.emails,
                phones: user.phones},
            function(err, data){
                User.find(function(err, data){
                    console.log(data);
                    return data;
                });
            });
    }

    function deleteUser(userId) {
        User.remove({_id: userId},
            function(err,data){
                User.find(function(err, data){
                    console.log(data);
                    return data;
                });
            });
    }

    function findUserByUsername(usrnm) {
        User.find({username: usrnm}, function(err, data){
            console.log(data);
            return data;
        });
    }

    function findUserByCredentials(credentials) {
        User.find({username: credentials.username,
                password: credentials.password},
            function(err, data){
                console.log(data);
                return data;
            });
    }
};