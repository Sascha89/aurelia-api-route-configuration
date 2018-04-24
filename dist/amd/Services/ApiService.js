define(["require", "exports", "../Models/Window", "../Errors/ApiConfigurationValidationError"], function (require, exports, Window_1, ApiConfigurationValidationError_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var ApiService = (function () {
        function ApiService() {
            this.environments = null;
            this.apiConfigurations = [];
            this.apiDictionary = {};
            this.window = new Window_1.Window();
            this.window.hostName = window.location.hostname;
            this.window.port = window.location.port;
            if (window.location.pathname && window.location.pathname.length > 1) {
                this.window.pathName = window.location.pathname;
            }
            this.environments = null;
            this.apiConfigurations = [];
        }
        ApiService.prototype.setEnvironments = function (environments) {
            this.environments = environments;
        };
        ApiService.prototype.setApiConfigurations = function (apiConfigurations) {
            this.apiConfigurations = apiConfigurations;
            for (var _i = 0, _a = this.apiConfigurations; _i < _a.length; _i++) {
                var apiConfiguration = _a[_i];
                this.baseUrlIsValid(apiConfiguration.baseRoute);
                var tmpRoutes = [];
                for (var _b = 0, _c = apiConfiguration.routes; _b < _c.length; _b++) {
                    var route = _c[_b];
                    route.route = apiConfiguration.baseRoute + route.route;
                    tmpRoutes.push(route);
                }
                apiConfiguration.routes = tmpRoutes;
                var environmentsConfiguration = {};
                environmentsConfiguration[apiConfiguration.environment] = apiConfiguration;
                var existingEnvironmentsConfiguration = this.apiDictionary[apiConfiguration.api];
                environmentsConfiguration = Object.assign({}, environmentsConfiguration, existingEnvironmentsConfiguration);
                this.apiDictionary[apiConfiguration.api] = environmentsConfiguration;
            }
        };
        ApiService.prototype.get = function (api, title, replacement, environment) {
            var currentEnvironment = this.defineCurrentEnvironment(environment);
            var route = this.getRoute(api, title, replacement, environment);
            return route.route;
        };
        ApiService.prototype.getRoute = function (api, title, replacement, environment) {
            var currentEnvironment = this.defineCurrentEnvironment(environment);
            if (Object.keys(this.environments).length <= 0) {
                throw Error('No environments are set');
            }
            if (Object.keys(this.apiDictionary).length <= 0) {
                throw Error('No api configurations are set.');
            }
            if (this.apiDictionary[api] === undefined) {
                throw Error('No API Configuration for api' + api + ' available');
            }
            if (currentEnvironment === undefined || currentEnvironment === null) {
                throw Error('Not able to determine the current environment');
            }
            var currentEnvironment;
            (environment === undefined) ? currentEnvironment = this.getCurrentEnvironment() : currentEnvironment = environment;
            if (currentEnvironment === undefined || currentEnvironment === null) {
                throw Error('Not able to determine the current environment');
            }
            var apiConfiguration = this.apiDictionary[api][currentEnvironment];
            if (apiConfiguration === undefined) {
                throw Error('No apiConfiguration for current Environment "' + currentEnvironment + '" found.');
            }
            for (var _i = 0, _a = apiConfiguration.routes; _i < _a.length; _i++) {
                var route = _a[_i];
                if (route.title === title) {
                    route.route = this.replaceUrlKeys(route.route, replacement);
                    return route;
                }
            }
            throw new Error('No route-object for api ' + api + ' and route-title ' + title + ' found');
        };
        ApiService.prototype.getHeaderObject = function (api, environment) {
            var currentEnvironment;
            (environment === undefined) ? currentEnvironment = this.getCurrentEnvironment() : currentEnvironment = environment;
            return this.apiDictionary[api][currentEnvironment].headerData;
        };
        ApiService.prototype.getRequestHeader = function (api, title, body, environment) {
            var currentEnvironment = this.defineCurrentEnvironment(environment);
            var route = this.getRoute(api, title, undefined, environment);
            var requestHeader = {};
            requestHeader = Object.assign({}, { headers: this.apiDictionary[api][currentEnvironment].headerData });
            requestHeader = Object.assign(requestHeader, { method: route.method });
            if (body !== undefined && body !== '' && Object.keys(body).length > 0) {
                requestHeader = Object.assign(requestHeader, { body: body });
            }
            return requestHeader;
        };
        ApiService.prototype.getAll = function (api, environment) {
            var currentEnvironment;
            (environment === undefined) ? currentEnvironment = this.getCurrentEnvironment() : currentEnvironment = environment;
            return this.apiDictionary[api][currentEnvironment].routes;
        };
        ApiService.prototype.getAllByGroup = function (api, group, environment) {
            var currentEnvironment;
            (environment === undefined) ? currentEnvironment = this.getCurrentEnvironment() : currentEnvironment = environment;
            var routesByGroup = [];
            var routes = this.apiDictionary[api][currentEnvironment].routes;
            routes.forEach(function (route) {
                if (route.group === group) {
                    routesByGroup.push(route);
                }
            });
            return routesByGroup;
        };
        ApiService.prototype.getAllByEnvironment = function (api, environment) {
            return this.apiDictionary[api][environment].routes;
        };
        ApiService.prototype.getCurrentEnvironment = function () {
            var hostname = this.window.hostName;
            if (this.window.port !== '') {
                hostname += ':' + this.window.port;
            }
            if (this.environments) {
                for (var _i = 0, _a = Object.entries(this.environments); _i < _a.length; _i++) {
                    var _b = _a[_i], environment = _b[0], hosts = _b[1];
                    for (var _c = 0, hosts_1 = hosts; _c < hosts_1.length; _c++) {
                        var host = hosts_1[_c];
                        if (hostname.search(host) !== -1) {
                            return environment;
                        }
                    }
                }
            }
            return null;
        };
        ApiService.prototype.replaceUrlKeys = function (apiRoute, replacement) {
            var replacedString = apiRoute;
            if (replacement !== undefined && replacement !== null && Object.keys(replacement).length > 0) {
                Object.entries(replacement).forEach(function (_a) {
                    var key = _a[0], value = _a[1];
                    replacedString = replacedString.replace(key, value);
                });
            }
            return replacedString;
        };
        ApiService.prototype.defineCurrentEnvironment = function (environment) {
            var currentEnvironment;
            (environment === undefined) ? currentEnvironment = this.getCurrentEnvironment() : currentEnvironment = environment;
            return currentEnvironment;
        };
        ApiService.prototype.baseUrlIsValid = function (baseUrl) {
            var regexp = new RegExp('^(http|https):\/\/');
            if (!regexp.test(baseUrl)) {
                throw new ApiConfigurationValidationError_1.ApiConfigurationValidationError('The base url must start with http:// or https://');
            }
            return true;
        };
        return ApiService;
    }());
    exports.ApiService = ApiService;
});
