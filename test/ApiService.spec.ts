import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';
import { ApiService } from '../src/Services/ApiService';
import { Route } from '../src/Models/Route';
import { TestApiConfigurationDev } from './Test-Files/TestApiConfigurationDev';
import { TestApiConfigurationProd } from './Test-Files/TestApiConfigurationProd';
import { TestSecondApiConfigurationDev } from './Test-Files/SecondTestApiConfigurationDev';
import { ApiConfigurationValidationError } from '../src/Errors/ApiConfigurationValidationError';
import { IApiConfiguration } from '../src/Interfaces/IApiConfiguration';

describe('ApiService', () => {
    let apiService: ApiService;
    let testApiDev: TestApiConfigurationDev;
    let testApiProd: TestApiConfigurationProd;
    let testSecDev: TestSecondApiConfigurationDev;

    beforeEach(() => {
        this.apiService = new ApiService();
        this.testApiDev = new TestApiConfigurationDev();
        this.testApiProd = new TestApiConfigurationProd();
        this.testSecDev = new TestSecondApiConfigurationDev();
        this.apiService.setEnvironments({
            development: ['', 'localhost'],
            staging: ['staging.myProject.com'],
            production: ['myProject.com']
        });
        this.apiService.setApiConfigurations([
            this.testApiDev,
            this.testApiProd,
            this.testSecDev
        ]);
    });

    it('should take over the routes into a dictionary', () => {
        let apiDict = this.apiService.apiDictionary[this.testApiDev.api];
        expect(apiDict).not.toBeNull();
    });

    it('should respond the development route for getUserById', () => {
        let expectedRoute = this.testApiDev.baseRoute + 'dev/users/{user-id}';
        expect(this.apiService.get('testApi', 'getUserById', {}, 'development')).toBe(expectedRoute);
        expect(this.apiService.get('testApi', 'getUserById', undefined, 'development')).toBe(expectedRoute);
    });

    it('should return all routes of testApi', () => {
        let routes: Route[] = this.apiService.getAll(this.testApiDev.api, 'development');
        expect(Object.keys(routes).length).toBe(3);
    });

    it('should return a route with replaced id', () => {
        let expectedRoute = this.testApiDev.baseRoute + 'dev/users/1234';
        expect(this.apiService.get('testApi', 'getUserById', { '{user-id}': '1234' }, 'development')).toBe(expectedRoute);
    });

    it('should return a header object', () => {
        let headerObjectWithBody: Object = {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET',
            body: { id: '1234' }
        };
        expect(this.apiService.getRequestHeader('testApi', 'getUserById', { 'id': '1234'})).toEqual(headerObjectWithBody);

        let headerObjectWithoutBody: Object = {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        };
        expect(expect(this.apiService.getRequestHeader('testApi', 'getUserById', {})).toEqual(headerObjectWithoutBody));
        expect(expect(this.apiService.getRequestHeader('testApi', 'getUserById', undefined)).toEqual(headerObjectWithoutBody));
        expect(expect(this.apiService.getRequestHeader('testApi', 'getUserById', '')).toEqual(headerObjectWithoutBody));
    });

    it('should throw an error because of invalid base url', () => {
        let errorApiConfiguration = new TestApiConfigurationDev();
        errorApiConfiguration.baseRoute = 'localhost:9000';
        expect( function() { this.apiService.setApiConfigurations([errorApiConfiguration]); } ).toThrow(Error);
    });

    it('should return all routes of testApi', () => {
        let routes: Route[] = this.apiService.getAll(this.testApiDev.api, 'development');
        expect(Object.keys(routes).length).toBe(3);
    });

    it('should return a route with replaced id', () => {
        let expectedRoute = this.testApiDev.baseRoute + 'dev/users/1234';
        expect(this.apiService.get('testApi', 'getUserById', { '{user-id}': '1234' }, 'development')).toBe(expectedRoute);
    });

    it('should return a header object', () => {
        let headerObjectWithBody: Object = {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET',
            body: { id: '1234' }
        };
        expect(this.apiService.getRequestHeader('testApi', 'getUserById', { 'id': '1234'})).toEqual(headerObjectWithBody);

        let headerObjectWithoutBody: Object = {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        };
        expect(expect(this.apiService.getRequestHeader('testApi', 'getUserById', {})).toEqual(headerObjectWithoutBody));
        expect(expect(this.apiService.getRequestHeader('testApi', 'getUserById', undefined)).toEqual(headerObjectWithoutBody));
        expect(expect(this.apiService.getRequestHeader('testApi', 'getUserById', '')).toEqual(headerObjectWithoutBody));
    });

    it('should throw an error because of invalid base url', () => {
        let errorApiConfiguration = new TestApiConfigurationDev();
        errorApiConfiguration.baseRoute = 'localhost:9000';
        expect( function() { this.apiService.setApiConfigurations([errorApiConfiguration]); } ).toThrow(Error);
    });

    it('should return all routes of testApi', () => {
        let routes: Route[] = this.apiService.getAll(this.testApiDev.api, 'development');
        expect(Object.keys(routes).length).toBe(3);
    });

    it('should return a route with replaced id', () => {
        let expectedRoute = this.testApiDev.baseRoute + 'dev/users/1234';
        expect(this.apiService.get('testApi', 'getUserById', { '{user-id}': '1234' }, 'development')).toBe(expectedRoute);
    });

    it('should return a header object', () => {
        let headerObjectWithBody: Object = {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET',
            body: { id: '1234' }
        };
        expect(this.apiService.getRequestHeader('testApi', 'getUserById', { 'id': '1234'})).toEqual(headerObjectWithBody);

        let headerObjectWithoutBody: Object = {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        };
        expect(expect(this.apiService.getRequestHeader('testApi', 'getUserById', {})).toEqual(headerObjectWithoutBody));
        expect(expect(this.apiService.getRequestHeader('testApi', 'getUserById', undefined)).toEqual(headerObjectWithoutBody));
        expect(expect(this.apiService.getRequestHeader('testApi', 'getUserById', '')).toEqual(headerObjectWithoutBody));
    });

    it('should throw an error because of invalid base url', () => {
        let errorApiConfiguration = new TestApiConfigurationDev();
        errorApiConfiguration.baseRoute = 'localhost:9000';
        expect( function() { this.apiService.setApiConfigurations([errorApiConfiguration]); } ).toThrow(Error);
    });

    it('should return all routes of testApi', () => {
        let routes: Route[] = this.apiService.getAll(this.testApiDev.api, 'development');
        expect(Object.keys(routes).length).toBe(3);
    });

    it('should return a route with replaced id', () => {
        let expectedRoute = this.testApiDev.baseRoute + 'dev/users/1234';
        expect(this.apiService.get('testApi', 'getUserById', { '{user-id}': '1234' }, 'development')).toBe(expectedRoute);
    });

    it('should return a header object', () => {
        let headerObjectWithBody: Object = {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET',
            body: { id: '1234' }
        };
        expect(this.apiService.getRequestHeader('testApi', 'getUserById', { 'id': '1234'})).toEqual(headerObjectWithBody);

        let headerObjectWithoutBody: Object = {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        };
        expect(expect(this.apiService.getRequestHeader('testApi', 'getUserById', {})).toEqual(headerObjectWithoutBody));
        expect(expect(this.apiService.getRequestHeader('testApi', 'getUserById', undefined)).toEqual(headerObjectWithoutBody));
        expect(expect(this.apiService.getRequestHeader('testApi', 'getUserById', '')).toEqual(headerObjectWithoutBody));
    });

    it('should throw an error because of invalid base url', () => {
        let errorApiConfiguration = new TestApiConfigurationDev();
        errorApiConfiguration.baseRoute = 'localhost:9000';
        expect( function() { this.apiService.setApiConfigurations([errorApiConfiguration]); } ).toThrow(Error);
    });
});
