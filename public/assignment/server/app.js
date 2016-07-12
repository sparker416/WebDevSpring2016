/**
 * Created by spark on 5/27/2016.
 */
module.exports = function(app, db, mongoose) {
    var fieldSchema = require("./models/field.schema.server")(mongoose);

    var userModel = require("./models/user.model.js")(db, mongoose);
    var formModel = require("./models/form.model.js")(db, mongoose, fieldSchema);
    var fieldModel = require("./models/field.model.js")(db, mongoose);

    var userServerService = require("./services/user.service.server.js")(app, userModel);
    var formServerService = require("./services/form.service.server.js")(app, formModel);
    var fieldServerService = require("./services/field.service.server.js")(app, fieldModel);
};