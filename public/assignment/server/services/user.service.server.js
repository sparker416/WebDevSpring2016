module.exports = function(app, model) {
    app.post("/api/assignment/user", function(req, res){
        var user = req.body;
        res.json(model.createUser(user));
    });

    app.get("/api/assignment/user", function(req, res){
        if(req.query.username != null && req.query.password != null){
            var credentials = {
                username: req.query.username,
                password: req.query.password
            };
            res.json(model.findUserByCredentials(credentials));
        } if (req.query.username != null) {
            var username = req.query.username;
            res.json(model.findUserByUsername(username));
        } else {
            res.json(model.findAllUsers());
        }
    });

    app.get("/api/assignment/user/:id", function(req, res){
        var userId = req.params.id;
        res.json(model.findUserById(userId));
    });

    app.put("/api/assignment/user/:id", function(req, res){
        var userId  = req.params.id;
        var user  = req.body;
        res.json(model.updateUser(userId, user));
    });

    app.delete("/api/assignment/user/:id", function(req, res){
        var userId = req.params.id;
        res.json(model.deleteUserById(userId));
    });
};
