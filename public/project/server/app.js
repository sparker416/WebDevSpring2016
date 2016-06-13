module.exports = function(app){
    var userModel = require("./models/user.model.js");
    var gameModel = require("./models/game.model.js");

    console.log(userModel);
    var userServerService = require("./services/user.service.server.js")(app, userModel);
    var gameServerService = require("./services/game.service.server.js")(app, gameModel);
};