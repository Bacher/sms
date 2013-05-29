
!function() {
    var sms = {};
    sms.models = {};

    sms.loadModel = function(name, fields) {
        sms.models[name] = function(prot) {
            for(var prop in prot) {
                this[prop] = prot[prop];
            }
        };

        sms.models.prototype = {}
        for(var prop in fields) {
            sms.models.prototype[prop] = "default";
        }
    };

    window.sms = sms;
}();
