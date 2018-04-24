import { IApiConfiguration } from '../../src/Interfaces/IApiConfiguration';

export class TestSecondApiConfigurationDev implements IApiConfiguration {
    public api  = 'secondApi';
    public environment = 'development';
    public endpoint = 'localhost';
    public baseRoute = 'http://localhost:9000/api/v1/';
    public headerData = {'Content-Type': 'application/json'};
    public routes = [
        { group: 'user', title: 'getUserById', method: 'GET', route: 'dev/users/{user-id}'}
    ];
}
