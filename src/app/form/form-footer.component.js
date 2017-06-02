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
var app_service_1 = require("../service/app.service");
var router_1 = require("@angular/router");
var eoa_entity_form_component_1 = require("../entity/eoa-entity-form.component");
var form_control_service_1 = require("./form-control.service");
var common_1 = require("@angular/common");
var FormFooterComponent = (function (_super) {
    __extends(FormFooterComponent, _super);
    function FormFooterComponent(formControlService, app, route, router, location) {
        var _this = _super.call(this, formControlService, app, route) || this;
        _this.formControlService = formControlService;
        _this.app = app;
        _this.route = route;
        _this.router = router;
        _this.location = location;
        _this.form = {};
        return _this;
    }
    return FormFooterComponent;
}(eoa_entity_form_component_1.EOAEntityFormComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], FormFooterComponent.prototype, "form", void 0);
FormFooterComponent = __decorate([
    core_1.Component({
        selector: 'form-footer',
        templateUrl: './form-footer.component.html',
        providers: [form_control_service_1.FormControlService]
    }),
    __metadata("design:paramtypes", [form_control_service_1.FormControlService,
        app_service_1.AppService,
        router_1.ActivatedRoute,
        router_1.Router,
        common_1.Location])
], FormFooterComponent);
exports.FormFooterComponent = FormFooterComponent;
//# sourceMappingURL=form-footer.component.js.map