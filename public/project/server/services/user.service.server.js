module.exports = function(app, userModel) {
    app.post("/rest/api/project/user", function(req, res){
        var user = req.body;
        res.json(userModel.createUser(user));
    });

    app.get("/rest/api/project/user", function(req, res){
        if(req.query.username != null && req.query.password != null){
            var credentials = {
                username: req.query.username,
                password: req.query.password
            };
            res.json(userModel.findUserByCredentials(credentials));
        } if (req.query.username != null) {
            var username = req.query.username;
            res.json(userModel.findUserByUsername(username));
        } else {
            res.json(userModel.findAllUsers());
        }
    });

    app.get("/rest/api/project/user/:id", function(req, res){
        var userId = req.params.id;
        res.json(userModel.findUserById(userId));
    });

    app.put("/rest/api/project/user/:id", function(req, res){
        var userId  = req.params.id;
        var user  = req.body;
        res.json(userModel.updateUser(userId, user));
    });

    app.delete("/rest/api/project/user/:id", function(req, res){
        var userId = req.params.id;
        res.json(userModel.deleteUser(userId));
    });
};
