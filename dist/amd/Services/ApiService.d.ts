import { IApiConfiguration } from '../Interfaces/IApiConfiguration';
import { Route } from '../Models/Route';
export declare class ApiService {
    private environments;
    private apiConfigurations;
    private apiDictionary;
    private window;
    constructor();
    setEnvironments(environments: {
        [environment: string]: string[];
    }): void;
    setApiConfigurations(apiConfigurations: IApiConfiguration[]): void;
    get(api: string, title: string, replacement?: {
        [key: string]: string;
    }, environment?: string): string;
    getRoute(api: string, title: string, replacement?: {
        [key: string]: string;
    }, environment?: string): Route;
    getHeaderObject(api: string, environment?: string): Object;
    getRequestHeader(api: string, title: string, body?: {}, environment?: string): {};s
    getAll(api: string, environment?: string): Route[];
    getAllByGroup(api: string, group: string, environment?: string): Route[];
    getAllByEnvironment(api: string, environment: string): Route[];
    private getCurrentEnvironment();
    private replaceUrlKeys(apiRoute, replacement?);
    private defineCurrentEnvironment(environment?);
    private baseUrlIsValid(baseUrl);
}
