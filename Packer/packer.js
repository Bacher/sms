
var fs = require("fs");

var MODEL_DIR = "../Models/";
var MODEL_SERVER_DIR = "../Server/models/";
var MODEL_CLIENT_DIR = "../Content/models/";

var FILE_CLIENT_PATTERN = "!function() { sms.loadModel(#NAME, #FIELDS); }();";
var FILE_SERVER_PATTERN = "exports.exec = function() { sms.loadModel(#NAME, #FIELDS); };";

fs.readdir(MODEL_DIR, function(err, files) {
    if(err !== null) throw new Error(err);

    for(var i = 0; i < files.length; ++i) {
        if(files[i].length > 4 && files[i].substr(-4) === "json") {
            Proccess(files[i]);
        }
    }
});

function Proccess(modelFile) {
    var modelFuncFile = modelFile.substring(0, modelFile.length - 4) + "js";
    var model = require(MODEL_DIR + modelFile);

    fs.readFile(MODEL_DIR + modelFuncFile, function(err, data) {
        var fileText = String(data);

        var functions = fileText.split("\r\n\r\n");
        var functionsHash = {};
        for(var i = 0; i < functions.length; ++i) {
            functions[i] = functions[i].replace(/\s*\r\n\s*/g, " ").trim();

            var functionName = functions[i].match(/function (\w*)/)[1];
            functionsHash[functionName] = functions[i];
        }

        var clientFileData = FILE_CLIENT_PATTERN.replace("#NAME", '"' + model.name + '"');
        var clientFileData = clientFileData.replace("#FIELDS", JSON.stringify(model.fields));

        var serverFileData = FILE_SERVER_PATTERN.replace("#NAME", '"' + model.name + '"');
        var serverFileData = serverFileData.replace("#FIELDS", JSON.stringify(model.fields));

        fs.writeFile(MODEL_SERVER_DIR + modelFuncFile, serverFileData);
        fs.writeFile(MODEL_CLIENT_DIR + modelFuncFile, clientFileData);
    });
}
