module.exports = function(app, model) {
    app.get("/api/assignment/user/:userId/form", function(req, res){
        var userId = req.params.userId;
        model.findAllFormsForUser(userId)
            .then(function(doc){
                res.json(doc);
            }, function(err){
                res.status(400).send(err);
            });
    });

    app.get("/api/assignment/form/:formId", function(req, res) {
        if (req.params.formId.isNumber()) {
            var formId = req.params.formId;
            model.findFormById(formId)
                .then(function (doc) {
                    res.json(doc);
                }, function (err) {
                    res.status(400).send(err);
                });
        } else {
            var formTitle = req.params.formId;
            model.findFormByTitle(formTitle)
                .then(function (doc) {
                    res.json(doc);
                }, function (err) {
                    res.status(400).send(err);
                });
        }
    });

    app.delete("/api/assignment/form/:formId", function(req, res){
        var formId = req.params.formId;
        model.deleteForm(formId)
            .then(function(doc){
                res.json(doc);
            }, function(err){
                res.status(400).send(err);
            });
    });

    app.post("/api/assignment/user/:userId/form", function(req, res){
        var userId = req.params.userId;
        var form = req.body;
        model.createForm(form)
            .then(function(doc){
                res.json(doc);
            }, function(err){
                res.status(400).send(err);
            });
    });

    app.put("/api/assignment/form/:formId", function(req, res){
        var formId = req.params.formId;
        var form = req.body;
        model.updateForm(formId, form)
            .then(function(doc){
                res.json(doc);
            }, function(err){
                res.status(400).send(err);
            });
    });
};