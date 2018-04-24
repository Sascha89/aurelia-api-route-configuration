import { IApiConfiguration } from '../../src/Interfaces/IApiConfiguration';

export class TestApiConfigurationProd implements IApiConfiguration {
    public api  = 'testApi';
    public environment = 'production';
    public endpoint = 'localhost';
    public baseRoute = 'http://localhost:9000/api/v1/';
    public headerData = {'Content-Type': 'application/json'};
    public routes = [
        { group: 'user', title: 'getUserById', method: 'GET', route: 'prod/users/{user-id}'}
    ];
}
