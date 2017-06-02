"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var appData_type_1 = require("../appData.type");
require("rxjs/add/operator/toPromise");
var logger_service_1 = require("./logger.service");
var router_1 = require("@angular/router");
var BaseService = BaseService_1 = (function () {
    // public sidebar: AppSidebarModule;
    function BaseService(router) {
        this.router = router;
        //public appDataLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false);
        // private apiUrl2 = 'http://offeradmin.odata';
        //  private apiUrl = 'http://localhost:1797/odata';
        // private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
        //public apiUrl = 'api';
        this.dev_mode = 'iis';
        this.apiUrl = '/api';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.http = BaseService_1.injector.get(http_1.Http);
        this.logger = BaseService_1.injector.get(logger_service_1.LoggerService);
        this.appData = BaseService_1.injector.get(appData_type_1.AppData);
        // this.sidebar = BaseService.injector.get(AppSidebarModule);
    }
    BaseService.prototype.getApiUrl = function () {
    };
    BaseService.prototype._getResponseValue = function (response) {
        var responseValue = this.dev_mode !== 'jit' ? response.json() : response.json().data;
        return responseValue;
    };
    BaseService.prototype._log = function (msg, type) {
        if (this.logger) {
            this.logger.log(msg, type);
        }
    };
    BaseService.prototype.MSG = function (msg) {
        this._log(msg, 'MSG');
    };
    BaseService.prototype._handleError = function (error) {
        if (undefined !== error.status) {
            if (error.status.toString() === '404') {
                return Promise.resolve(undefined);
            }
            if (error.status.toString() === '500') {
                // @TODO: Show error dashpop
                console.error('A catchable 500 error occurred', error);
                return Promise.resolve(undefined);
            }
        }
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    return BaseService;
}());
BaseService = BaseService_1 = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router])
], BaseService);
exports.BaseService = BaseService;
var BaseService_1;
//# sourceMappingURL=base.service.js.map