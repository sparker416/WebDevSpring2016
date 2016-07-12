module.exports = function(app, model) {
    app.post("/api/assignment/user", function(req, res){
        var user = req.body;
        model.createUser(user)
            .then(function(doc){
                res.json(doc);
            }, function(err){
                res.status(400).send(err);
            });
    });

    app.get("/api/assignment/user", function(req, res){
        if(req.query.username != null && req.query.password != null){
            var credentials = {
                username: req.query.username,
                password: req.query.password
            };
            model.findUserByCredentials(credentials)
                .then(function(data){
                    res.json(data);
                }, function(err){
                    res.status(400).send(err);
                })
        } if (req.query.username != null) {
            var username = req.query.username;
            model.findUserByUsername(username)
                .then(function(data){
                    res.json(data);
                }, function(err){
                    res.status(400).send(err);
                });
        } else {
            model.findAllUsers()
                .then(function(data){
                    res.json(data);
                }, function(err){
                    res.status(400).send(err);
                });
        }
    });

    app.get("/api/assignment/user/:id", function(req, res){
        var userId = req.params.id;
        model.findUserById(userId)
            .then(function(data){
                res.json(data);
            }, function(err){
                res.status(400).send(err);
            });
    });

    app.put("/api/assignment/user/:id", function(req, res){
        var userId  = req.params.id;
        var user  = req.body;
        model.updateUser(userId, user)
            .then(function(data){
                res.json(data);
            }, function(err){
                res.status(400).send(err);
            });
    });

    app.delete("/api/assignment/user/:id", function(req, res){
        var userId = req.params.id;
        model.deleteUser(userId)
            .then(function(data){
                res.json(data);
            }, function(err){
                res.status(400).send(err);
            });
    });
};
