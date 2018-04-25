import { FrameworkConfiguration } from 'aurelia-framework';
import { RouteService } from './RouteService';

export function configure(aurelia: FrameworkConfiguration, configCallback?: (config: RouteService) => Promise<any>) {
    let instance = aurelia.container.get(RouteService) as RouteService;
    let promise: Promise<any> | null = null;

    if (configCallback !== undefined && typeof (configCallback) === 'function') {
        promise = Promise.resolve(configCallback(instance));
    } else {
        promise = Promise.resolve();
    }
    //Waiting for configuration is ready
    return promise.then(function () { return true; });
}

export { RouteService };