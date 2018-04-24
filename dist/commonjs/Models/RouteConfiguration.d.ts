import { IApiConfiguration } from '../Interfaces/IApiConfiguration';
export declare class ExampleApiConfiguration implements IApiConfiguration {
    api: 'example-api-name';
    endpoint: 'localhost';
    environment: 'development';
    baseRoute: 'localhost';
    headerData: {};
    routes: [{
        group: 'test';
        title: 'test';
        method: 'test';
        route: 'test';
    }];
}
