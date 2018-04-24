import { Route } from '../Models/Route';

export interface IApiConfiguration {
    api: string;
    environment: string;
    endpoint: string;
    baseRoute: string;
    headerData: Object;
    routes: Route[];
}
