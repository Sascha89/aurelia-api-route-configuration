import { IApiConfiguration } from '../../src/Interfaces/IApiConfiguration';

export class TestApiConfigurationDev implements IApiConfiguration {
    public api  = 'testApi';
    public environment = 'development';
    public endpoint = 'localhost';
    public baseRoute = 'http://localhost:9000/api/v1/';
    public headerData = {'Content-Type': 'application/json'};
    public routes = [
        { group: 'user', title: 'getUserById', method: 'GET', route: 'dev/users/{user-id}'},
        { group: 'user', title: 'getUsers', method: 'GET', route: 'dev/users/'},
        { group: 'permission', title: 'getPermissionById', method: 'GET', route: 'dev/permission/{permission-id}'}
    ];
}
