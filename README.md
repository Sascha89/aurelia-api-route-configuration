# Aurelia-Api-Router

Plugin that manages external api routes for different environments (development, staging, production).

## Installation

Add the following snippet to your package.json and run ```npm install```:

```json
"dependencies": [
   "aurelia-api-router": "git+https://github.com/Sascha89/aurelia-api-router.git#feature/initial-setup"
]
```

For Aurelia-Cli also add the following snippet to the aurelia.json and register the plugin in main.ts:

aurelia.json:

```json
{
  "name": "aurelia-api-router",
  "path": "../node_modules/aurelia-api-router/dist/amd",
  "main": "index.js"
}
```

### Aurelia CLI Support

Create route configuration files that implement the interface ```aurelia-api-router/IApiConfiguration``` (e.g. MyProjectApiConfigurationProd.ts). How to implement the IApiConfiguration is ocumented [here](#ApiConfiguration-File).

> It's recommended to have one file per environment.

main.ts:

```typescript
aurelia.use
    .plugin('aurelia-api-router', config => {
      config.setEnvironments({
        development: ['localhost', '127.0.0.1'],
        staging: ['staging.myproject.de'],
        production: ['myproject.de']
      });
      config.setApiConfigurations([
        new myProjectApiConfigurationsDev(),
        new myProjectApiConfigurtionsStaging(),
        new myProjectApiConfigurtionsProd()
      ]);
    });
```

## ApiConfiguration-File

```typescript
import { IApiConfiguration, Route } from 'aurelia-api-router';

export class EventerzaApiConfigurationDev implements IApiConfiguration{
    public api: string = 'eventerza';
    public environment: string =  'development';
    public endpoint: string =  'localhost';
    public baseRoute: string = 'localhost:9001/api/v1';
    public headerData: Object =  {};
    public routes: Route[] = [
        { group: "user",          title: "getUserById",   method: "GET",    route: "/user/{id}"     },
        { group: "user",          title: "saveUser",      method: "Post",   route: "/user/save"     },
        { group: "user",          title: "deleteUser",    method: "Post",   route: "/user/delete"   }
    ];
}
```

## Run Tests

The tests get started by entering the following command:

```shell
npm run test
```

## Usage

Having the plugin configured correctly, it can be used as follows:

```typescript
import { ApiService } from 'aurelia-api-router';

//Inject Service for Aurelia
export class myService {

  public constructor(private apiService: ApiService){}

  public attached(){
    // For common routes (without replacements)
    let myCommonRoute: string = apiService.get('myApi', 'routeTitle');
    // For Routes where a variable has to be replaced (e.g. user-id)
    let myReplacedRoute: string = apiService.get('myApi', 'routeTitle', { '{my-key-to-be-replaced}': 'my-replacement-string'});
     // For Routes where a variable has to be replaced (e.g. user-id) and for a specific environment (not the current)
    let myReplacedRouteForDevelopment: string = apiService.get('myApi', 'routeTitle', { '{my-key-to-be-replaced}': 'my-replacement-string'}, 'development');
    // For Routes for a specific environment (not the current)
    let myRouteForDevelopment1: string = apiService.get('myApi', 'routeTitle', {}, 'development');
    let myReplacedRouteForDevelopment2: string = apiService.get('myApi', 'routeTitle', undefined, 'development');
  }
```
