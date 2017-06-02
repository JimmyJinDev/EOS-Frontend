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
var ad_form_service_1 = require("./ad-form.service");
var ad_type_1 = require("./ad.type");
var common_1 = require("@angular/common");
var app_settings_1 = require("../../app-settings");
var AdFormComponent = (function (_super) {
    __extends(AdFormComponent, _super);
    function AdFormComponent(formControlService, app, route, router, location, _changeDetectionRef) {
        var _this = _super.call(this, formControlService, app, route) || this;
        _this.formControlService = formControlService;
        _this.app = app;
        _this.route = route;
        _this.router = router;
        _this.location = location;
        _this._changeDetectionRef = _changeDetectionRef;
        return _this;
    }
    AdFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.data.entity = new ad_type_1.Ad;
        this.data.entity_type = ad_type_1.Ad._entity_type;
        this.data.entity_abbreviation = ad_type_1.Ad._entity_abbreviation;
        this.data.entityName = this.app.capitalize(this.data.entity_type);
        this.data.collapse = {
            offer: true,
            adCategory: true,
            filter: false,
            creative: true,
            comment: true,
            audit: true,
        };
        this.data.calculatedWeightDisabled = false;
        // this.data.relatedForms = {
        //   offer: true,
        //   comment: true,
        //   audit: true,
        // }
        this.app.isDataLoaded.subscribe(function (val) { return _this.AppDataLoaded(val); });
    };
    AdFormComponent.prototype.ngAfterViewInit = function () {
        this._changeDetectionRef.detectChanges();
    };
    AdFormComponent.prototype.startDateChanged = function ($event) {
        var date = $event;
        date.month = date.month - 1;
        var formatted_date = moment(date).format(app_settings_1.AppSettings.DATE_FORMAT_DEFAULT);
        this.form.controls['DisplayEndDate'].setValue(formatted_date);
    };
    AdFormComponent.prototype.calculatedWeightChange = function ($event) {
        if ($event === '1') {
            this.data.calculatedWeightDisabled = false;
        }
        else {
            this.data.calculatedWeightDisabled = true;
        }
    };
    return AdFormComponent;
}(eoa_entity_form_component_1.EOAEntityFormComponent));
AdFormComponent = __decorate([
    core_1.Component({
        selector: 'ad-form',
        templateUrl: './ad-form.component.html',
        encapsulation: core_1.ViewEncapsulation.None,
        providers: [ad_form_service_1.AdFormService],
    }),
    core_1.Injectable(),
    __metadata("design:paramtypes", [ad_form_service_1.AdFormService,
        app_service_1.AppService,
        router_1.ActivatedRoute, router_1.Router,
        common_1.Location,
        core_1.ChangeDetectorRef])
], AdFormComponent);
exports.AdFormComponent = AdFormComponent;
//# sourceMappingURL=ad-form.component.js.map