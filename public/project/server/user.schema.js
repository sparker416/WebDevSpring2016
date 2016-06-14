/**
 * Created by spark on 6/14/2016.
 */
var ProjectUserSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
    admin: {type: Boolean, default: false},
    owner: {type: Boolean, default: false},
    games: {type: [{name: String, dateLastPlayed: Date, timesPlayed: Number}], default: []}
}, {collection: "projectUser"});

var ProjectUser = mongoose.model("ProjectUser", ProjectUserSchema);

ProjectUser.create({email: "alice@alice.com", username: "alice", password: "alice"},
function(err, results){
    console.log(err);
    console.log(results);
});