import { FrameworkConfiguration } from 'aurelia-framework';
import { ApiService } from './Services/ApiService';
import { IApiConfiguration } from './Interfaces/IApiConfiguration';
import { Route } from './Models/Route';

export function configure(aurelia: FrameworkConfiguration, configCallback?: (config: ApiService) => Promise<any>) {
    let instance = aurelia.container.get(ApiService) as ApiService;
    let promise: Promise<any> | null = null;

    if (configCallback !== undefined && typeof (configCallback) === 'function') {
        promise = Promise.resolve(configCallback(instance));
    } else {
        promise = Promise.resolve();
    }
    return promise.then(function () { return true; });
}

export {
    ApiService,
    IApiConfiguration,
    Route
};
