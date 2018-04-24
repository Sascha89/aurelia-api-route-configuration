import { autoinject } from 'aurelia-framework';
import { AureliaConfiguration } from 'aurelia-configuration';

@autoinject
export class RouteService {
    //public enum Stages {Development, Staging, Production}

    public constructor(
        private config: AureliaConfiguration
    ) {

    }

    /**
     * Analyses the from routes and adds all routes (if not already exists) to the "to"-route configuration file.
     * Its also possible to stage from a stage to multiple stages.
     * @param from enum of stages
     * @param to enum of stages
     */
    public stageRoutes(from: string, to: string[]) {
        //TODO
    }

    public compareRouteFiles(initial: string, target: string){

    }

    /**
     * Reads the route configuraiton path from global aurelia-configuration-config file, builds the final 
     * route and returns it.
     * 
     * This method assumes, that the correct path the the route file is configured correctly.
     * development: {
     *      eventer-api-routes: "path-to-json-file"
     * }
     * 
     * @param apiName Name of the config-key, where the path the the route file is configured.
     * @param routeKey Key of the route.
     */
    public get(apiName: string, title: string): string {
        var RouteConfiguration = JSON.parse(apiName);
        for (let route of RouteConfiguration.routes) {
            if (route.title === title) return RouteConfiguration.baseRoute + route.route;
        }
        throw new Error('No route-object for api ' + apiName + ' and route-title ' + title + ' found');
    }

    /**
     * Returns the header data of the staging route configuration. E.g. "endpoint" or "api-header"
     * @param key 
     */
    public getHeaderData(apiName: string, key: string): Object {
        var RouteConfiguration = JSON.parse(apiName);
        if (RouteConfiguration.headerData == '') throw new Error('No data for api ' + apiName + ' and key ' + key + 'found.');
        return RouteConfiguration.headerData;
    }

    /**
     * 
     * @param apiName 
     */
    public getAll(apiName: string): Object[] {
        var RouteConfiguration = JSON.parse(apiName);
        return [{}];
    }

    public getAllByGroup(apiName: string, group: string): Object[] {
        return [{}];
    }

    public getAllByEnvironment(apiName: string, environment: string): Object[] {
        return [{}];
    }

    private getRouteConfig(apiName: string): Object {
        var routeConfigPath: string = this.config.get(apiName);
        return JSON.parse(routeConfigPath);
    }
}