module.exports = function(app){
    var userModel = require("./models/user.mock.json");
    var gameModel = require("./models/games.mock.json");

    var userService = require("./services/user.service.js")(app, userModel);
    var gameService = require("./services/game.service.server.js")(app, gameModel);
};