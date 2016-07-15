/**
 * Created by spark on 7/7/2016.
 */
module.exports = function(mongoose){

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        emails: [String],
        phones: [String],
        roles: [String]
    },
        {collection: "user"});

    return UserSchema;
};