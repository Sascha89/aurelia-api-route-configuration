define(["require", "exports", "./Services/ApiService", "./Models/Route"], function (require, exports, ApiService_1, Route_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ApiService = ApiService_1.ApiService;
    exports.Route = Route_1.Route;x
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
    exports.configure = configure;
});
