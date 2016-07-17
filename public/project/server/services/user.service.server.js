var passport = require("passport");
var bcrypt = require("bcrypt-nodejs");
var facebook = require("passport-facebook");

module.exports = function(app, model) {



    app.post("/rest/api/project/user", function(req, res){
        var user = req.body;
        model.createUser(user)
            .then(function(doc){
                res.json(doc);
            }, function(err){
                res.status(400).send(err);
            });
    });

    app.get("/rest/api/project/user", function(req, res){
        if(req.query.username != null && req.query.password != null){
            var credentials = {
                username: req.query.username,
                password: req.query.password
            };
            model.findUserByCredentials(credentials)
                .then(function(doc){
                    res.json(doc);
                }, function(err){
                    res.status(400).send(err);
                });
        } if (req.query.username != null) {
            var username = req.query.username;
            model.findUserByUsername(username)
                .then(function(doc){
                    res.json(doc);
                }, function(err){
                    res.status(400).send(err);
                });
        } else {
            model.findAllUsers()
                .then(function(doc){
                    res.json(doc);
                }, function(err){
                    res.status(400).send(err);
                });
        }
    });

    app.get("/rest/api/project/user/:userId/game", function(req, res){
        var userId = req.params.userId;
        res.json(model.findAllGamesForUser(userId));
    });

    app.post("/rest/api/project/user/:userId/game", function(req, res){
        var userId = req.params.userId;
        var gameName = req.body.name;
        model.addGame(userId, gameName)
            .then(function(doc){
                res.json(doc);
            }, function(err){
                res.status(400).send(err);
            });
    });

    app.get("/rest/api/project/user/:id", function(req, res){
        var userId = req.params.id;
        model.findUserById(userId)
            .then(function(doc){
                res.json(doc);
            }, function(err){
                res.status(400).send(err);
            });
    });

    app.put("/rest/api/project/user/:id", function(req, res){
        var userId  = req.params.id;
        var user  = req.body;
        model.updateUser(userId, user)
            .then(function(doc){
                res.json(doc);
            }, function(err){
                res.status(400).send(err);
            });
    });

    app.delete("/rest/api/project/user/:id", function(req, res){
        var userId = req.params.id;
        model.deleteUser(userId)
            .then(function(doc){
                res.json(doc);
            }, function(err){
                res.status(400).send(err);
            });
    });
};
