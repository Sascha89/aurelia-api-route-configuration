import { FrameworkConfiguration } from 'aurelia-framework';
import { ApiService } from './Services/ApiService';
import { IApiConfiguration } from './Interfaces/IApiConfiguration';
import { Route } from './Models/Route';
export declare function configure(aurelia: FrameworkConfiguration, configCallback?: (config: ApiService) => Promise<any>): Promise<boolean>;
export { ApiService, IApiConfiguration, Route };
