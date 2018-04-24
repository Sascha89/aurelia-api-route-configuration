import { IApiConfiguration } from '../Interfaces/IApiConfiguration';


export class ExampleApiConfiguration implements IApiConfiguration {
    public api: 'example-api-name';
    public endpoint: 'localhost';
    public environment: 'development';
    public baseRoute: 'localhost';
    public headerData: {
    };
    public routes: [
        { group: 'test', title: 'test', method: 'test', route: 'test' }
    ];
}
