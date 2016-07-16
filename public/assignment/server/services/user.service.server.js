module.exports = function(app, model) {
    var passport = require('passport');
    var bcrypt = require("bcrypt-nodejs");
    var LocalStrategy = require('passport-local').Strategy;

    var auth = authorized;

    app.post("/api/assignment/login", passport.authenticate('local'), login);
    app.post("/api/assignment/logout", logout);
    app.post("/api/assignment/register", register);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/admin/user", auth, createUser);
    app.get("/api/assignment/admin/user", auth, findAllUsers);
    app.get("/api/assignment/admin/user/:userId", auth, findById);
    app.put("/api/assignment/admin/user/:userId", auth, updateUser);
    app.delete("/api/assignment/admin/user/:userId", auth, deleteUser);

    app.get("/api/assignment/isAdmin", function(req, res)
    {
        if(req.isAuthenticated())
        {
            var user = req.user;
            var username = user.username;
            model.findUserByUsername(username)
                .then(
                    function(foundUser) {
                        if (foundUser) {
                            var roles = foundUser.roles;
                            var isAdmin = (roles.indexOf("admin") > -1);
                            if (isAdmin) {
                                res.json(foundUser);
                            } else {
                                res.send('0');
                            }
                        }
                    }, function(err){
                        res.send('0');
                    })
        } else {
            res.send('0');
        }
    });

    passport.use(new LocalStrategy(localStrategy));

    function localStrategy(username, password, done){
        model
            .findUserByUsername(username)
            .then(
                function(user){
                    if (!user){
                        return done(null, false);
                    } else {
                        if(bcrypt.compareSync(password, user.password)) {
                            return done(null, user);
                        } else {
                            return done(null, false);
                        }
                    }
                },
                function(err){
                    if (err){
                        return done(err);
                    }
                }
            );
    }

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function serializeUser(user, done){
        done(null, user);
    }

    function deserializeUser(user, done){
        model.findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );

    }

    function authorized(req, res, next){
        if(!req.isAuthenticated()){
            res.send(401);
        } else {
            next();
        }
    }

    function login(req, res){
        var user = req.user;
        res.json(user);
    }

    function logout(req, res){
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res){
        var answer = req.isAuthenticated() ? req.user : '0';
        res.send(answer);
    }

    function register(req, res){
        var newUser = req.body;
        newUser.roles = ["student"];

        model
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user){
                        res.json(null);
                    } else {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return model.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if (user){
                        req.login(user, function(err){
                            if(err){
                                res.status(400).send(err);
                            } else{
                                res.json(user);
                            }
                        })
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findAllUsers(req, res){
        if(isAdmin(req.user)){
            model
                .findAllUsers()
                .then(
                    function(users){
                        res.json(users);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function findById(req, res){
        if(isAdmin(req.user)){

            model
                .findUserById(req.params.userId)
                .then(
                    function(user){
                        res.json(user);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
        } else {
            res.status(403);
        }
    }

    function deleteUser(req, res) {
        if(isAdmin(req.user)) {

            model
                .deleteUser(req.params.userId)
                .then(
                    function(users){
                        res.json(users);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function updateUser(req, res){
        var newUser = req.body;
        if(!isAdmin(req.user)){
            delete newUser.roles;
        }
        if(typeof newUser.roles == "string"){
            newUser.roles = newUser.roles.split(",");
        }
        newUser.password = bcrypt.hashSync(req.body.password);

        model
            .updateUser(req.params.userId, newUser)
            .then(
                function(user){
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function createUser(req, res) {
        var newUser = req.body;
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }

        // first check if a user already exists with the username
        model
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    // if the user does not already exist
                    if(user == null) {
                        // create a new user
                        return model.createUser(newUser)
                            .then(
                                // fetch all the users
                                function(){
                                    return model.findAllUsers();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return model.findAllUsers();
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }


    function isAdmin(user) {
        if(user.roles.indexOf("admin") > -1){
            return true;
        } else {
            return false;
        }
    }
};
