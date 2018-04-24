import { Route } from './Route';

export class RouteConfiguration{
    public endpoint: string;
    public routes: Route[];
    public baseRoute: string;
    public headerData: Object;

    public constructor(endpoint: string, routes: Route[], baseRoute: string, headerData: Object){
        if (baseRoute == '') throw new Error('Base route isn\'t configured for ' + apiName + '. To get correct urls, this parameter must be configured.');
        this.endpoint = endpoint;
        this.routes = routes;
        this.baseRoute = baseRoute;
        this.headerData = headerData;
    }

}