
var express = require("express"),
    http = require("http"),
    path = require("path"),
    crud = require("./framework/crud");

var publicDir = path.join(__dirname, "../Content");
var app = express();

app.set("env", "development");

app.set("port", process.env.PORT || 8080);
app.use(express.logger("dev"));
//app.use(express.bodyParser());
app.use(express.json());
app.use(express.methodOverride());
//app.use(app.router);
app.use(express.static(publicDir));

app.get("/users/:id", crud.handles.get);
app.post("/users", crud.handles.post);
app.put("/users", crud.handles.put);
app.del("/users/:id", crud.handles.del);

// Development Mode
if("development" === app.get("env")) {
    app.use(express.errorHandler());
}

app.listen(app.get("port"), function(){
    console.log("Express server listening on port " + app.get("port"));
});
