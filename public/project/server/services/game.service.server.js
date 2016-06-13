module.exports = function(app, model) {
    app.get("/rest/api/KM/game", function(req, res){
        res.json(model.getAllGames());
    });

    app.get("/rest/api/KM/user/:userId/game", function(req, res){
        var userId = req.params.userId;
        res.json(model.getAllGamesForUser(userId));
    });

    app.get("/rest/api/KM/game/:gameId", function(req, res){
        if (req.params.gameId.isNumber()) {
            var gameId = req.params.gameId;
            res.json(model.getGameById(gameId));
        } else {
            var gameTitle = req.params.gameId;
            res.json(model.getGameByName(gameTitle));
        }
    });

    app.delete("/rest/api/KM/admin/game/:gameId", function(req, res){
        var gameId = req.params.gameId;
        res.json(model.deleteGame(gameId));
    });

    app.post("/rest/api/KM/admin/game", function(req, res){
        var game = req.body;
        res.json(model.createGame(game));
    });

    app.put("/rest/api/KM/admin/game/:gameId", function(req, res){
        var gameId = req.params.gameId;
        var game = req.body;
        res.json(model.editGame(gameId, game));
    });
    
    app.get("/rest/api/KM/user/:userId/game/:gameId", function (req, res){
        var userId = req.params.userId;
        var gameId = req.params.gameId;
        res.json(model.addUserToGame(userId, gameId));
    })

    app.delete("/rest/api/KM/user/:userId/game/:gameId", function (req, res){
        var userId = req.params.userId;
        var gameId = req.params.gameId;
        res.json(model.deleteUserFromGame(userId, gameId));
    })
};