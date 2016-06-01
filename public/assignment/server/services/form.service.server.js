module.exports = function(app, model) {
    app.get("/api/assignment/user/:userId/form", function(req, res){
        var userId = req.params.userId;
        res.json(model.findAllFormsForUser(userId));
    });

    app.get("/api/assignment/form/:formId", function(req, res){
        if (req.params.formId.isNumber()) {
            var formId = req.params.formId;
            res.json(model.findFormById(formId));
        } else {
            var formTitle = req.params.formId;
            res.json(model.findFormByTitle(formTitle));
        }
    });

    app.delete("/api/assignment/form/:formId", function(req, res){
        var formId = req.params.formId;
        res.json(model.deleteForm(formId));
    });

    app.post("/api/assignment/user/:userId/form", function(req, res){
        var userId = req.params.userId;
        var form = req.body;
        res.json(model.createForm(form));
    });

    app.put("/api/assignment/form/:formId", function(req, res){
        var formId = req.params.formId;
        var form = req.body;
        res.json(model.updateForm(formId, form));
    });
};