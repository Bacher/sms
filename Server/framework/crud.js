var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");

var User = mongoose.model("User", { name: String });

User.schema.options.toJSON = {transform: function(doc, ret, options) {
    delete ret.__v;
}};

exports.handles = {
    get: function(req, res) {
        var id = req.params.id;
        //id = new mongoose.Types.ObjectId();
        User.findById(id, function(err, user) {
            if(err)
                res.send(400);
            else if(user === null)
                res.send(404);
            else
                res.json(200, user);
        });
    },
    post: function(req, res) {
        var user = new User(req.body);
        user.save(function(err) {
            if(err)
                res.send(500);
            else
                res.json(200, user);
        });
    },
    put: function(req, res) {
        var id = req.params.id;
        req.json(200, "");
    },
    del: function(req, res) {
        var id = req.params.id;
        res.json(200, "");
    }
};
