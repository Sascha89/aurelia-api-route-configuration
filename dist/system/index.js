System.register(["./Services/ApiService", "./Models/Route"], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    function configure(aurelia, configCallback) {
        var instance = aurelia.container.get(ApiService_1.ApiService);
        var promise = null;
        if (configCallback !== undefined && typeof (configCallback) === 'function') {
            promise = Promise.resolve(configCallback(instance));
        }
        else {
            promise = Promise.resolve();
        }
        return promise.then(function () { return true; });
    }
    exports_1("configure", configure);
    var ApiService_1, Route_1;
    return {
        setters: [
            function (ApiService_1_1) {
                ApiService_1 = ApiService_1_1;
            },
            function (Route_1_1) {
                Route_1 = Route_1_1;
            }
        ],
        execute: function () {
            exports_1("ApiService", ApiService_1.ApiService);
            exports_1("Route", Route_1.Route);
        }
    };
});
