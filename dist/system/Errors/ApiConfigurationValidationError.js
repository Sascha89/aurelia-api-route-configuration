System.register([], function (exports_1, context_1) {
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __moduleName = context_1 && context_1.id;
    var ApiConfigurationValidationError;
    return {
        setters: [],
        execute: function () {
            ApiConfigurationValidationError = (function (_super) {
                __extends(ApiConfigurationValidationError, _super);
                function ApiConfigurationValidationError(message) {
                    var _newTarget = this.constructor;
                    var _this = _super.call(this, message) || this;
                    Object.setPrototypeOf(_this, _newTarget.prototype);
                    return _this;
                }
                return ApiConfigurationValidationError;
            }(Error));
            exports_1("ApiConfigurationValidationError", ApiConfigurationValidationError);
        }
    };
});
