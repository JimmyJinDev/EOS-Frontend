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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var component_dropdown_1 = require("../../form/components/component-dropdown");
var component_textbox_1 = require("../../form/components/component-textbox");
var component_entityLink_1 = require("../../form/components/component-entityLink");
var form_control_service_1 = require("../../form/form-control.service");
var component_datetimepicker_1 = require("../../form/components/component-datetimepicker");
var ProductLineFormService = (function (_super) {
    __extends(ProductLineFormService, _super);
    function ProductLineFormService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProductLineFormService.prototype.getFormFields = function () {
        var formFields = {
            // Main
            EffectiveDate: new component_datetimepicker_1.DateTimePickerComponent({
                key: 'EffectiveDate',
                label: 'Effective Date',
                required: true,
            }),
            // Details
            ProductLineName: new component_textbox_1.TextboxComponent({
                key: 'ProductLineName',
                label: 'Name',
                type: 'text',
                colClass: 'col-sm-3',
                required: true,
            }),
            ProductLineId: new component_dropdown_1.DropdownComponent({
                key: 'ProductLineId',
                label: 'Product Line',
                options: this.data.productLine,
                required: true,
            }),
            AdvertiserId: new component_entityLink_1.EntityLinkFormComponent({
                key: 'AdvertiserId',
                label: 'Advertiser',
                required: true,
                data: {
                    entityLinkAbbr: 'ADV',
                    entityLinkSuffixField: 'CompanyName',
                },
            }),
            HasProductLineId: new component_textbox_1.TextboxComponent({
                key: 'HasProductLineId',
                label: 'HasProductLines ProductLine ID',
                required: true,
                order: 140,
                type: 'number'
            }),
            ProductLineType: new component_dropdown_1.DropdownComponent({
                key: 'ProductLineType',
                label: 'Type',
                options: this.data.productLineType,
                required: true,
            }),
            PrimaryGoal: new component_dropdown_1.DropdownComponent({
                key: 'PrimaryGoal',
                label: 'Primary Goal',
                options: this.data.primaryGoal,
                required: true,
            }),
            // Revenue Information
            RevenueType: new component_dropdown_1.DropdownComponent({
                key: 'RevenueType',
                label: 'Revenue Type',
                options: this.data.revenueType,
                value: '',
                required: true,
                order: 175
            }),
            DefaultPayoutRpc: new component_textbox_1.TextboxComponent({
                key: 'DefaultPayoutRpc',
                label: 'Default Payout',
                prefix: '$',
                value: '',
                required: true,
            }),
            // PayoutRpcStartDate: new DateTimePickerComponent({
            //   key:      'PayoutRpcStartDate',
            //   label:    'Payout / RPC Start Date',
            //   value:    '',
            //   required: true,
            // }),
            ScrubPercentage: new component_textbox_1.TextboxComponent({
                key: 'ScrubPercentage',
                label: 'Scrub %',
                value: '0',
                required: true,
            }),
        };
        return formFields;
    };
    return ProductLineFormService;
}(form_control_service_1.FormControlService));
ProductLineFormService = __decorate([
    core_1.Injectable()
], ProductLineFormService);
exports.ProductLineFormService = ProductLineFormService;
//# sourceMappingURL=productLine-form.service.js.map