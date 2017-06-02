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
var router_1 = require("@angular/router");
require("rxjs/add/operator/switchMap");
var app_service_1 = require("../../service/app.service");
var eoa_entity_form_component_1 = require("../eoa-entity-form.component");
var advertiser_form_service_1 = require("./advertiser-form.service");
var advertiser_service_1 = require("./advertiser.service");
var advertiser_type_1 = require("./advertiser.type");
var common_1 = require("@angular/common");
var AdvertiserFormComponent = (function (_super) {
    __extends(AdvertiserFormComponent, _super);
    function AdvertiserFormComponent(formControlService, app, route, router, location, _changeDetectionRef) {
        var _this = _super.call(this, formControlService, app, route) || this;
        _this.formControlService = formControlService;
        _this.app = app;
        _this.route = route;
        _this.router = router;
        _this.location = location;
        _this._changeDetectionRef = _changeDetectionRef;
        return _this;
    }
    AdvertiserFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.data.entity = new advertiser_type_1.Advertiser;
        this.data.entity_type = advertiser_type_1.Advertiser._entity_type;
        this.data.entity_abbreviation = advertiser_type_1.Advertiser._entity_abbreviation;
        this.data.entityName = this.app.capitalize(this.data.entity_type);
        this.data.entityService = new advertiser_service_1.AdvertiserService(this.router);
        this.data.collapse = {
            offer: true,
            comment: true,
            audit: true,
        };
        // this.data.relatedForms = {
        //   offer: true,
        //   comment: true,
        //   audit: true,
        // }
        this.app.isDataLoaded.subscribe(function (val) { return _this.AppDataLoaded(val); });
    };
    AdvertiserFormComponent.prototype.ngAfterViewInit = function () {
        this._changeDetectionRef.detectChanges();
    };
    return AdvertiserFormComponent;
}(eoa_entity_form_component_1.EOAEntityFormComponent));
AdvertiserFormComponent = __decorate([
    core_1.Component({
        selector: 'advertiser-form',
        templateUrl: './advertiser-form.component.html',
        encapsulation: core_1.ViewEncapsulation.None,
        providers: [advertiser_form_service_1.AdvertiserFormService],
    }),
    core_1.Injectable(),
    __metadata("design:paramtypes", [advertiser_form_service_1.AdvertiserFormService,
        app_service_1.AppService,
        router_1.ActivatedRoute, router_1.Router,
        common_1.Location,
        core_1.ChangeDetectorRef])
], AdvertiserFormComponent);
exports.AdvertiserFormComponent = AdvertiserFormComponent;
//# sourceMappingURL=advertiser-form.component.js.map