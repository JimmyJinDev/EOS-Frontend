"use strict";
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
require("rxjs/add/operator/toPromise");
var app_service_1 = require("../../service/app.service");
var router_1 = require("@angular/router");
var ProductLineService = (function (_super) {
    __extends(ProductLineService, _super);
    function ProductLineService(router) {
        var _this = _super.call(this, router) || this;
        _this.router = router;
        _this.entity_type = 'productLine';
        return _this;
    }
    ProductLineService.prototype.update = function (productLine) {
        var url = this.apiUrl + "/productLine";
        return this.http
            .post(url, JSON.stringify(productLine), { headers: this.headers })
            .toPromise()
            .then(function () { return productLine; })
            .catch(this._handleError);
    };
    ProductLineService.prototype.create = function (productLineName) {
        var url = this.apiUrl + "/productLine";
        return this.http
            .post(url, JSON.stringify({ ProductLineName: productLineName }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().value; })
            .catch(this._handleError);
    };
    ProductLineService.prototype.delete = function (id) {
        var url = this.apiUrl + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this._handleError);
    };
    ProductLineService.prototype._handleError = function (error) {
        if (error.status.toString() === "404") {
            return Promise.resolve(undefined);
        }
        return _super.prototype._handleError.call(this, error);
    };
    return ProductLineService;
}(app_service_1.AppService));
ProductLineService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router])
], ProductLineService);
exports.ProductLineService = ProductLineService;
//# sourceMappingURL=productLine.service.js.map