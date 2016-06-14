module.exports = function(app, model) {
    app.post("/rest/api/project/user", function(req, res){
        var user = req.body;
        res.json(model.createUser(user));
    });

    app.get("/rest/api/project/user", function(req, res){
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

    app.get("/rest/api/project/user/:id", function(req, res){
        var userId = req.params.id;
        res.json(model.findUserById(userId));
    });

    app.put("/rest/api/project/user/:id", function(req, res){
        var userId  = req.params.id;
        var user  = req.body;
        res.json(model.updateUser(userId, user));
    });

    app.delete("/rest/api/project/user/:id", function(req, res){
        var userId = req.params.id;
        res.json(model.deleteUser(userId));
    });
};
