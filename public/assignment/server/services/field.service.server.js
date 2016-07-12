
module.exports = function(app, model) {
    app.get("/api/assignment/form/:formId/field", function(req, res){
        var formId = req.params.formId;
        model.findFieldsByFormId()
            .then(function(doc){
                res.json(doc);
            }, function(err){
                res.status(400).send(err);
            });
    });

    app.get("/api/assignment/form/:formId/field/:fieldId", function(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model.findFieldById(fieldId)
            .then(function(doc){
                res.json(doc);
            }, function(err){
                res.status(400).send(err);
            });
    });

    app.delete("/api/assignment/form/:formId/field/:fieldId", function(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model.deleteFieldById(fieldId)
            .then(function(doc){
                res.json(doc);
            }, function(err){
                res.status(400).send(err);
            });
    });

    app.post("/api/assignment/form/:formId/field", function(req, res){
        var formId = req.params.formId;
        var field = req.body;
        model.createField(field)
            .then(function(doc){
                res.json(doc);
            }, function(err){
                res.status(400).send(err);
            });
    });

    app.put("/api/assignment/form/:formId/field/:fieldId", function(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        model.updateFieldById(fieldId, field)
            .then(function(doc){
                res.json(doc);
            }, function(err){
                res.status(400).send(err);
            });
    });
};