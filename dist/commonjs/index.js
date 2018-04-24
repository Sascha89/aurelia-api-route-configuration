Object.defineProperty(exports, "__esModule", { value: true });
var ApiService_1 = require("./Services/ApiService");
exports.ApiService = ApiService_1.ApiService;
var Route_1 = require("./Models/Route");
exports.Route = Route_1.Route;
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
