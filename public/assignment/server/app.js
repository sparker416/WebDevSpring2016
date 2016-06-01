/**
 * Created by spark on 5/27/2016.
 */
module.exports = function(app) {
    var userModel = require("./models/user.model.js")();
    var formModel = require("./models/form.model.js")();

    var userServerService = require("./services/user.service.server.js")(app, userModel);
    var formServerService = require("./services/form.service.server.js")(app, formModel);
    var fieldServerService = require("./services/field.service.server.js")(app, formModel);
};