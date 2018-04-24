import { Window } from '../Models/Window';
import { IApiConfiguration } from '../Interfaces/IApiConfiguration';
import { Route } from '../Models/Route';
import { ApiConfigurationValidationError } from '../Errors/ApiConfigurationValidationError';

export class ApiService {
    private environments: { [environment: string]: string[] } = null;

    /**
     * Expects the api-name and the routeConfiguration of the respective API
     */
    private apiConfigurations: IApiConfiguration[] = [];
    private apiDictionary: { [api: string]: { [environment: string]: IApiConfiguration } } = {};
    private window: Window;


    public constructor() {
        this.window = new Window();
        this.window.hostName = window.location.hostname;
        this.window.port = window.location.port;
        if (window.location.pathname && window.location.pathname.length > 1) {
            this.window.pathName = window.location.pathname;
        }
        this.environments = null;
        this.apiConfigurations = [];
    }

    /**
     * @param environments
     */
    public setEnvironments(environments: { [environment: string]: string[] }) {
        this.environments = environments;
    }

    /**
     * @param apiConfigurations
     */
    public setApiConfigurations(apiConfigurations: IApiConfiguration[]) {
        this.apiConfigurations = apiConfigurations;
        for (let apiConfiguration of this.apiConfigurations) {
            this.baseUrlIsValid(apiConfiguration.baseRoute);
            let tmpRoutes: Route[] = [];
            for (let route of apiConfiguration.routes) {
                route.route = apiConfiguration.baseRoute + route.route;
                tmpRoutes.push(route);
            }
            apiConfiguration.routes = tmpRoutes;
            let environmentsConfiguration: { [environment: string]: IApiConfiguration } = {};
            environmentsConfiguration[apiConfiguration.environment] = apiConfiguration;
            let existingEnvironmentsConfiguration = this.apiDictionary[apiConfiguration.api];
            environmentsConfiguration = Object.assign({}, environmentsConfiguration, existingEnvironmentsConfiguration);
            this.apiDictionary[apiConfiguration.api] = environmentsConfiguration;
        }
    }

    /**
     * Reads the route configuraiton path from global aurelia-configuration-config file, builds the final
     * route and returns it.
     * This method assumes, that the correct path the the route file is configured correctly.
     * development: {
     *      eventer-api-routes: "path-to-json-file"
     * }
     * @param apiName Name of the config-key, where the path the the route file is configured.
     * @param routeKey Key of the route.
     */
    public get(api: string, title: string, replacement?: { [key: string]: string }, environment?: string): string {
        let currentEnvironment: string = this.defineCurrentEnvironment(environment);
        let route = this.getRoute(api, title, replacement, environment);
        return route.route;
    }

    /**
     * Returns a route object of the current environment. The route of the route object is already a full qualified path
     * @param api name of the target api
     * @param title title of the respective route configured in ApiConfiguration
     * @param body json object that should be send to api
     * @param environment if a divergent api should be requested
     * @returns Route
     */
    public getRoute(api: string, title: string, replacement?: { [key: string]: string }, environment?: string): Route {
        let currentEnvironment: string = this.defineCurrentEnvironment(environment);
        if (Object.keys(this.environments).length <= 0) { throw Error('No environments are set'); }
        if (Object.keys(this.apiDictionary).length <= 0) { throw Error('No api configurations are set.'); }
        if (this.apiDictionary[api] === undefined) { throw Error('No API Configuration for api' + api + ' available'); }
        if (currentEnvironment === undefined || currentEnvironment === null) { throw Error('Not able to determine the current environment'); }
        let apiConfiguration: IApiConfiguration = this.apiDictionary[api][currentEnvironment];
        if (apiConfiguration === undefined) { throw Error('No apiConfiguration for current Environment "' + currentEnvironment + '" found.'); }
        for (let route of apiConfiguration.routes) {
            if (route.title === title) {
                route.route = this.replaceUrlKeys(route.route, replacement);
                return route;
        }
        throw new Error('No route-object for api ' + api + ' and route-title ' + title + ' found');
    }

    /**
     * Returns the header data of the staging route configuration. E.g. "endpoint" or "api-header"
     * @param api name of the target api
     * @param environment if a divergent api should be requested
     */
    public getHeaderObject(api: string, environment?: string): Object {
        let currentEnvironment: string;
        (environment === undefined) ? currentEnvironment = this.getCurrentEnvironment() : currentEnvironment = environment;
        return this.apiDictionary[api][currentEnvironment].headerData;
    }

    /**
     * Returns a json object including at least the header and method items. Depnding on the body parameter,
     * also the body element is included.
     * @param api name of the target api
     * @param title title of the respective route configured in ApiConfiguration
     * @param body json object that should be send to api
     * @param environment if a divergent api should be requested
     */
    public getRequestHeader(api: string, title: string, body?: {}, environment?: string): {} {
        let currentEnvironment: string = this.defineCurrentEnvironment(environment);
        let route: Route = this.getRoute(api, title, undefined, environment);
        let requestHeader: {} = {};
        requestHeader = Object.assign({}, { headers: this.apiDictionary[api][currentEnvironment].headerData });
        requestHeader = Object.assign(requestHeader, { method: route.method });
        if (body !== undefined && body !== '' && Object.keys(body).length > 0) { requestHeader = Object.assign(requestHeader, { body: body }); }
        return requestHeader;
    }

    /**
     * returns an array of all routes of the respective api of the current environment.
     * @param api name of the target api
     * @param environment optional parameter to get routes from another environment than the current one.
     */
    public getAll(api: string, environment?: string): Route[] {
        let currentEnvironment: string;
        (environment === undefined) ? currentEnvironment = this.getCurrentEnvironment() : currentEnvironment = environment;
        return this.apiDictionary[api][currentEnvironment].routes;
    }

    /**
     * @param api name of the target api
     * @param group filter to request all routes of a specific group
     * @param environment optional parameter to get routes from another environment than the current one.
     */
    public getAllByGroup(api: string, group: string, environment?: string): Route[] {
        let currentEnvironment: string;
        (environment === undefined) ? currentEnvironment = this.getCurrentEnvironment() : currentEnvironment = environment;
        let routesByGroup: Route[] = [];
        let routes: Route[] = this.apiDictionary[api][currentEnvironment].routes;
        routes.forEach((route) => {
            if (route.group === group) { routesByGroup.push(route); }
        });
        return routesByGroup;
    }

    /**
     * @param api
     * @param environment optional parameter to get routes from another environment than the current one.
     */
    public getAllByEnvironment(api: string, environment: string): Route[] {
        return this.apiDictionary[api][environment].routes;
    }

    /**
     * checks the current hostname and returns the current environment.
     */
    private getCurrentEnvironment(): string {
        let hostname = this.window.hostName;
        if (this.window.port !== '') { hostname += ':' + this.window.port; }
        if (this.environments) {
            for (let [environment, hosts] of Object.entries(this.environments)) {
                for (let host of hosts) {
                    if (hostname.search(host) !== -1) { return environment; }
                }
            }
        }
        return null;
    }

    /**
     * Validates the base url
     * @param baseUrl baseUrl from ApiConfiguration
     * @returns Boolean if the baseUrl is valid
     */
    private baseUrlIsValid(baseUrl: string): boolean {
        let regexp = new RegExp('^(http|https):\/\/');
        if (!regexp.test(baseUrl)) { throw new ApiConfigurationValidationError('The base url must start with http:// or https://'); }
        return true;
    }

    private replaceUrlKeys(apiRoute: string, replacement: { [key: string]: string }) {
        let replacedString: string = apiRoute;
        if (replacement !== undefined && replacement !== null && Object.keys(replacement).length > 0) {
            Object.entries(replacement).forEach(([key, value]) => {
                replacedString = replacedString.replace(key, value);
            });
        }
        return replacedString;
    }

    /**
     * Returns the current environment
     * @param environment optional parameter to get routes from another environment than the current one.
     */
    private defineCurrentEnvironment(environment?: string): string {
        let currentEnvironment: string;
        (environment === undefined) ? currentEnvironment = this.getCurrentEnvironment() : currentEnvironment = environment;
        return currentEnvironment;
    }
}
