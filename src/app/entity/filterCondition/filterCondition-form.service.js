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
var component_dropdown_1 = require("../../form/components/component-dropdown");
var component_textbox_1 = require("../../form/components/component-textbox");
var form_control_service_1 = require("../../form/form-control.service");
var component_entityLink_1 = require("../../form/components/component-entityLink");
var app_service_1 = require("../../service/app.service");
var forms_1 = require("@angular/forms");
var app_settings_1 = require("../../app-settings");
var FilterConditionFormService = (function (_super) {
    __extends(FilterConditionFormService, _super);
    function FilterConditionFormService(app, fb) {
        var _this = _super.call(this, app, fb) || this;
        _this.app = app;
        _this.fb = fb;
        _this.Operator = {};
        _this.choices = {
            Operators: {},
            Values: {}
        };
        return _this;
    }
    FilterConditionFormService.prototype.getFormFields = function () {
        var formFields = {
            // Main
            FilterId: new component_entityLink_1.EntityLinkFormComponent({
                key: 'FilterId',
                label: 'Filter',
                required: true,
                data: {
                    entityLinkAbbr: 'FIL',
                    entityLinkSuffixField: 'FilterName',
                },
            }),
            // Details
            // FilterId: new TextboxComponent( {
            //   key:     'FilterId',
            // } ),
            FilterConditionGroup: new component_dropdown_1.DropdownComponent({
                key: 'FilterConditionGroup',
                label: 'Group',
                options: this.data.filterConditionGroup,
            }),
            FilterConditionType: new component_dropdown_1.DropdownComponent({
                key: 'FilterConditionType',
                label: 'Type',
                options: this.data.filterConditionType,
            }),
            FilterConditionOperator: new component_dropdown_1.DropdownComponent({
                key: 'FilterConditionOperator',
                label: 'Operator',
                options: this.data.filterConditionOperator,
            }),
            FilterConditionValue: new component_textbox_1.TextboxComponent({
                key: 'FilterConditionValue',
                label: 'Value',
                type: 'text',
            }),
        };
        return formFields;
    };
    FilterConditionFormService.prototype.initFormData = function () {
        var filterConditionTypes = this.app.getAppData('initialDataTypes')['filterConditionType'];
        var filterConditionOperators = [];
        var filterConditionValues = [];
        this.entityItm = this.app.getAppData('sidebarFormEntity');
        for (var _i = 0, filterConditionTypes_1 = filterConditionTypes; _i < filterConditionTypes_1.length; _i++) {
            var filterConditionType = filterConditionTypes_1[_i];
            if (filterConditionType.key === this.entityItm.FilterConditionType) {
                this.Type = filterConditionType;
                this.choices.Operators = this._getFilterConditionOperators();
                if (undefined !== filterConditionType.filterConditionValues) {
                    this.choices.Values = this._getFilterConditionValues();
                }
            }
        }
    };
    FilterConditionFormService.prototype.parseEntityItmFilterConditionValue = function () {
        return this.entityItm.FilterConditionValue.toString().split(this.getStrGlue());
    };
    FilterConditionFormService.prototype.getStrGlue = function () {
        return app_settings_1.AppSettings.VALUE_SPLIT_GLUE;
    };
    FilterConditionFormService.prototype.OperatorGetDefault = function () {
        if (undefined !== this.Type.filterConditionOperatorIdDefault) {
            return this.Type.filterConditionOperatorIdDefault;
        }
        return 0;
    };
    FilterConditionFormService.prototype._getFilterConditionOperators = function () {
        var filterConditionOperators = this.app.getAppData('initialDataTypes')['filterConditionOperator'];
        var filterConditionOperatorValues = [];
        for (var _i = 0, _a = this.Type.filterConditionOperatorIds; _i < _a.length; _i++) {
            var filterConditionOperatorKey = _a[_i];
            for (var _b = 0, filterConditionOperators_1 = filterConditionOperators; _b < filterConditionOperators_1.length; _b++) {
                var filterConditionOperator = filterConditionOperators_1[_b];
                if (filterConditionOperator.key === filterConditionOperatorKey) {
                    filterConditionOperatorValues.push({
                        'key': filterConditionOperator.key,
                        'value': filterConditionOperator.value,
                        'filterConditionOperatorControlType': filterConditionOperator.filterConditionOperatorControlType
                    });
                }
            }
        }
        return filterConditionOperatorValues;
    };
    FilterConditionFormService.prototype._getFilterConditionValues = function () {
        var filterConditionValues = [];
        for (var _i = 0, _a = this.Type.filterConditionValues; _i < _a.length; _i++) {
            var filterConditionValuesKey = _a[_i];
            var filterConditionValue = this._getFilterConditionValueData(filterConditionValuesKey);
            if (false !== filterConditionValue) {
                filterConditionValues.push({
                    'key': filterConditionValue.key,
                    'value': filterConditionValue.value
                });
            }
        }
        return filterConditionValues;
    };
    FilterConditionFormService.prototype._getFilterConditionOperatorControlTypes = function () {
        var appFilterConditionTypes = this.app.getAppData('filterConditionControlType');
        var filterConditionOperatorControlTypes = [];
        for (var _i = 0, _a = this.choices.Operators; _i < _a.length; _i++) {
            var filterConditionOperator = _a[_i];
            filterConditionOperatorControlTypes.push({
                operator_id: filterConditionOperator.key,
                operator_fields: filterConditionOperator.filterConditionOperatorControlType
            });
        }
        return filterConditionOperatorControlTypes;
    };
    FilterConditionFormService.prototype._getFilterConditionValueData = function (filterConditionValuesKey) {
        var filterConditions = this.app.getAppData('initialDataTypes')['filterConditionValue'];
        for (var _i = 0, filterConditions_1 = filterConditions; _i < filterConditions_1.length; _i++) {
            var filterCondition = filterConditions_1[_i];
            if (filterCondition.key === filterConditionValuesKey) {
                return filterCondition;
            }
        }
        return false;
    };
    return FilterConditionFormService;
}(form_control_service_1.FormControlService));
FilterConditionFormService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [app_service_1.AppService, forms_1.FormBuilder])
], FilterConditionFormService);
exports.FilterConditionFormService = FilterConditionFormService;
//# sourceMappingURL=filterCondition-form.service.js.map