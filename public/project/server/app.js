module.exports = function(app){
    var projectUserModel = require("./models/user.model.js")();
    var projectGameModel = require("./models/game.model.js")();

    require("./services/user.service.server.js")(app, projectUserModel);
    require("./services/game.service.server.js")(app, projectGameModel);
};