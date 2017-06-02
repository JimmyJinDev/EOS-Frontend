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
var common_1 = require("@angular/common");
var filterCondition_form_service_1 = require("./filterCondition-form.service");
var filterCondition_type_1 = require("./filterCondition.type");
var FilterConditionFormComponent = (function (_super) {
    __extends(FilterConditionFormComponent, _super);
    function FilterConditionFormComponent(fs, app, route, router, location, _changeDetectionRef) {
        var _this = _super.call(this, fs, app, route) || this;
        _this.fs = fs;
        _this.app = app;
        _this.route = route;
        _this.router = router;
        _this.location = location;
        _this._changeDetectionRef = _changeDetectionRef;
        _this.filterConditionValue = []; // @TODO: rename to 'filterConditionValues'
        return _this;
    }
    FilterConditionFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.data.entity = new filterCondition_type_1.FilterCondition;
        this.data.entity_type = filterCondition_type_1.FilterCondition._entity_type;
        this.data.entity_abbreviation = filterCondition_type_1.FilterCondition._entity_abbreviation;
        this.data.entityName = this.app.capitalize(this.data.entity_type);
        this.app.isDataLoaded.subscribe(function (val) { return _this.AppDataLoaded(val); });
        this.fs.initFormData();
        this.entityItm = this.app.getAppData('sidebarFormEntity');
        this._initForm();
    };
    FilterConditionFormComponent.prototype._initForm = function () {
        this.Operator = this._getEntityOperator();
        this.Value = this._getEntityValue();
        this.text_1 = this._getLabels()[0];
        this.text_2 = this._getLabels()[1];
    };
    FilterConditionFormComponent.prototype._getEntityOperator = function () {
        if (this.app.getAppData('FIC_addingNew')) {
            return this.fs.OperatorGetDefault();
        }
        else {
            return parseInt(this.entityItm.FilterConditionOperator, 10);
        }
    };
    FilterConditionFormComponent.prototype._getEntityValue = function () {
        var entityFilterConditionValues = this.fs.parseEntityItmFilterConditionValue();
        if (undefined === entityFilterConditionValues) {
            return '';
        }
        if (this.hasFilterConditionLUValues()) {
            return parseInt(entityFilterConditionValues[0], 10);
        }
        else {
            var values = [];
            for (var i = 0; i < entityFilterConditionValues.length; i++) {
                values[i] = entityFilterConditionValues[i];
            }
            return values;
        }
    };
    FilterConditionFormComponent.prototype._getLabels = function () {
        return this.fs.Type.Labels;
    };
    FilterConditionFormComponent.prototype.ngAfterViewInit = function () {
        this._changeDetectionRef.detectChanges();
    };
    FilterConditionFormComponent.prototype.getFilterConditionColumnData = function (col) {
        return this.app.getEntityData(this.app.getAppData('FIC_DATA').entity, col);
    };
    FilterConditionFormComponent.prototype.getFilterConditionOperatorData = function (filterConditionValuesKey) {
        var filterConditions = this.app.getAppData('initialDataTypes')['filterConditionOperator'];
        for (var _i = 0, filterConditions_1 = filterConditions; _i < filterConditions_1.length; _i++) {
            var filterCondition = filterConditions_1[_i];
            if (filterCondition.key === filterConditionValuesKey) {
                return filterCondition;
            }
        }
        return false;
    };
    FilterConditionFormComponent.prototype.updateFICValue = function () {
        var filterConditionOperatorValue = this.getFilterConditionOperatorData(parseInt(this.Operator, 10));
        var FICValue = [];
        // if ( false !== filterConditionOperatorValue ) {
        //   FICValue.push( filterConditionOperatorValue.value );
        // }
        if (this.hasFilterConditionLUValues()) {
            FICValue.push(this.Value);
        }
        else {
            var fcv_list = [];
            for (var _i = 0, _a = this.Value; _i < _a.length; _i++) {
                var fcv = _a[_i];
                fcv_list.push(fcv);
            }
            FICValue.push(fcv_list.join(this.fs.getStrGlue()));
        }
        var entityItm = this.app.getAppData('FIC_DATA').entity;
        console.log('FICValue.join ' + FICValue.join(this.fs.getStrGlue()));
        this.form.controls['FilterId'].setValue(this.app.getAppData('formEntity').FilterId);
        this.form.controls['FilterConditionGroup'].setValue(entityItm.FilterConditionGroup);
        this.form.controls['FilterConditionType'].setValue(entityItm.FilterConditionType);
        this.form.controls['FilterConditionOperator'].setValue(this.Operator);
        this.form.controls['FilterConditionValue'].setValue(FICValue.join(this.fs.getStrGlue()));
        this.app.setFormDummyData(this.form);
    };
    FilterConditionFormComponent.prototype.hasFilterConditionLUValues = function () {
        return this.fs.choices.Values.length > 0;
    };
    FilterConditionFormComponent.prototype.isShowable = function (filterConditionOperatorControlTypeGroupKey) {
        if (parseInt(this.Operator, 10) === parseInt(filterConditionOperatorControlTypeGroupKey, 10)) {
            return true;
        }
        return false;
    };
    FilterConditionFormComponent.prototype.getPanelTitle = function () {
        return this.getFilterConditionColumnData([{
                fieldName: 'FilterConditionGroup',
                lookupName: 'filterConditionGroup'
            }])
            + ' - ' +
            this.getFilterConditionColumnData([{
                    fieldName: 'FilterConditionType',
                    lookupName: 'filterConditionType'
                }]);
    };
    return FilterConditionFormComponent;
}(eoa_entity_form_component_1.EOAEntityFormComponent));
FilterConditionFormComponent = __decorate([
    core_1.Component({
        selector: 'filterCondition-form',
        templateUrl: './filterCondition-form.component.html',
        encapsulation: core_1.ViewEncapsulation.None,
        providers: [filterCondition_form_service_1.FilterConditionFormService],
    }),
    core_1.Injectable(),
    __metadata("design:paramtypes", [filterCondition_form_service_1.FilterConditionFormService,
        app_service_1.AppService,
        router_1.ActivatedRoute, router_1.Router,
        common_1.Location,
        core_1.ChangeDetectorRef])
], FilterConditionFormComponent);
exports.FilterConditionFormComponent = FilterConditionFormComponent;
//# sourceMappingURL=filterCondition-form.component.js.map