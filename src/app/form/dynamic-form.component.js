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
var eoa_form_group_1 = require("./eoa-form-group");
var form_control_base_1 = require("./form-control-base");
var app_service_1 = require("../service/app.service");
var app_sidebar_component_1 = require("../common/sidebar/app-sidebar.component");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ngbEOADateParserFormatter_1 = require("../common/directives/ngbEOADateParserFormatter");
var app_settings_1 = require("../app-settings");
var DynamicFormComponent = (function () {
    function DynamicFormComponent(app, _changeDetectionRef, datePickerConfig, ngbDateParserFormatter) {
        this.app = app;
        this._changeDetectionRef = _changeDetectionRef;
        this.datePickerConfig = datePickerConfig;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.isDisabled = false;
        this.dateValueChange = new core_1.EventEmitter();
        // this.isDisabled = false;
    }
    DynamicFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.app.sidebarReturnLinkObserve().subscribe(function (val) {
            if (val) {
                _this.returnLinkUpdate();
            }
        });
        // customize default values of datepickers used by this component tree
        var d = new Date();
        this.datePickerConfig.minDate = { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
        this.datePickerConfig.maxDate = { year: 2099, month: 12, day: 31 };
        this.datePickerConfig.outsideDays = 'hidden';
        if (this.formField === undefined) {
            console.log('FormField is undefined. Called from sidebar? - Check app-sidebar-form.service.ts field definitions');
            debugger;
        }
        if (this.formField.controlType === 'entityLink') {
            this._initEntityLinkField();
        }
    };
    DynamicFormComponent.prototype._initEntityLinkField = function () {
        var _this = this;
        var entityAbbr = this.formField['data'].entityLinkAbbr;
        var entityLinkType = this.app.getEntityTypeFromAbbr(entityAbbr);
        var entityLinkID = this.form.controls[this.formField.key].value;
        this.formField.data.dataPreffix = this._getLinkFieldPreffix(entityAbbr);
        if (this.app.getAppData('formNewRecord') === true) {
            return;
        }
        this.app.getOne(entityLinkID, entityLinkType).then(function (result) {
            _this.formField.data.dataSuffix = _this._setEntityLinkSuffix(result);
        });
    };
    DynamicFormComponent.prototype._setEntityLinkSuffix = function (result) {
        return result[this.formField['data'].entityLinkSuffixField];
    };
    DynamicFormComponent.prototype.ngAfterViewInit = function () {
        if (this.formField.controlType === 'entityLink') {
            this.formField.data.dataValue = this.form.controls[this.formField.key].value;
        }
        // this._unknownFunction();
        this._changeDetectionRef.detectChanges();
    };
    /**
     * // @TODO: What's this?
     * @private
     */
    DynamicFormComponent.prototype._unknownFunction = function () {
        if (this.app.getAppData('sidebarFormShown')) {
            this.formField.data.dataPreffix = this._getLinkFieldPreffix(this.app.getAppData('formEntityAbbr'));
            var formEntitySingle = this.app.getAppData('formEntity');
            if (undefined !== formEntitySingle) {
                this.formField.data.dataSuffix = formEntitySingle[this.app.getAppData('entities')[this.app.getAppData('formEntityAbbr')].sidebarFields.text_1];
            }
        }
    };
    Object.defineProperty(DynamicFormComponent.prototype, "isValid", {
        get: function () {
            return this.form.controls[this.formField.key].valid;
        },
        enumerable: true,
        configurable: true
    });
    DynamicFormComponent.prototype.chooseEntityInSidebar = function (formFieldKey) {
        var sidebarData = {
            entityLink: true,
            source: app_settings_1.AppSettings.ENTITY_LINK_FOR_DYNAMIC_FORMFIELD,
            formFieldKey: formFieldKey,
            query: this.form.controls[formFieldKey].value
        };
        this.app.setAppData('sidebarData', sidebarData);
        this.app.showEntityLink(this.formField.data.entityLinkAbbr);
    };
    DynamicFormComponent.prototype._getLinkFieldPreffix = function (val) {
        return val + ' -';
    };
    // @TODO: remove entityLink
    DynamicFormComponent.prototype.returnLinkUpdate = function () {
        if (this.formField.controlType !== 'entityLink') {
            return;
        }
        var sidebarData = this.app.getAppData('sidebarData');
        if (sidebarData.formFieldKey !== this.formField.key) {
            return;
        }
        if (sidebarData.entityLink === false) {
            return;
        }
        if (this.form.controls[sidebarData.formFieldKey] === undefined) {
            return;
        }
        this.formField.data.dataValue = sidebarData.entityItm[this.app.getEntityPk(this.app.getAppData('sidebarEntityAbbr'))];
        this.form.controls[sidebarData.formFieldKey].setValue(this.formField.data.dataValue);
        this.formField.data.dataPreffix = this._getLinkFieldPreffix(this.app.getAppData('sidebarEntityAbbr'));
        this.formField.data.dataSuffix = sidebarData.entityItm[this.formField.data.entityLinkSuffixField];
        this.app.setAppData('sidebarReturnLinkQueued', false);
        //    this.app.setAppData('sidebarData', { entityLink: false });
    };
    DynamicFormComponent.prototype.entityLinkComponentIsDisabled = function () {
        return this.app.getAppData('sidebarShown');
    };
    Object.defineProperty(DynamicFormComponent.prototype, "dateValueModel", {
        /**
         * Date functions
         */
        get: function () {
            return this.dateValue;
        },
        set: function (date) {
            // this.form.controls[this.formField.key].setValue(date.year + '/' + date.month + '/' + date.day);
            this.form.controls[this.formField.key].setValue(this.ngbDateParserFormatter.format(date));
            // this.dateValueChange.next(date);
        },
        enumerable: true,
        configurable: true
    });
    DynamicFormComponent.prototype.hasPrefix = function () {
        if (undefined !== this.formField.prefix && this.formField.prefix !== '') {
            return true;
        }
        return false;
    };
    DynamicFormComponent.prototype.hasSuffix = function () {
        if (undefined !== this.formField.suffix && this.formField.suffix !== '') {
            return true;
        }
        return false;
    };
    DynamicFormComponent.prototype.inputValueChanged = function ($event) {
        this.dateValueChange.emit($event);
    };
    return DynamicFormComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", eoa_form_group_1.EOAFormGroup)
], DynamicFormComponent.prototype, "form", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", form_control_base_1.FormControlBase)
], DynamicFormComponent.prototype, "formField", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DynamicFormComponent.prototype, "clearFieldButtonOnClick", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DynamicFormComponent.prototype, "data", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DynamicFormComponent.prototype, "isDisabled", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], DynamicFormComponent.prototype, "dateValueChange", void 0);
DynamicFormComponent = __decorate([
    core_1.Component({
        selector: 'df-formfield',
        templateUrl: './dynamic-form.component.html',
        encapsulation: core_1.ViewEncapsulation.None,
        providers: [app_sidebar_component_1.AppSidebarComponent, ng_bootstrap_1.NgbDatepickerConfig, ngbEOADateParserFormatter_1.NgbEOADateParserFormatterDirective],
    }),
    __metadata("design:paramtypes", [app_service_1.AppService,
        core_1.ChangeDetectorRef,
        ng_bootstrap_1.NgbDatepickerConfig,
        ngbEOADateParserFormatter_1.NgbEOADateParserFormatterDirective])
], DynamicFormComponent);
exports.DynamicFormComponent = DynamicFormComponent;
//# sourceMappingURL=dynamic-form.component.js.map