
exports.handles = {
    get: function(req, res) {
        var id = req.params.id;
        res.json(200, "{'id':"+id+",'name':'Bacher','pass':'123'}");
    },
    post: function(req, res) {
        debugger;
        res.json(200, "");
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
