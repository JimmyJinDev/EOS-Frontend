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
var form_control_service_1 = require("../../form/form-control.service");
var component_entityLink_1 = require("../../form/components/component-entityLink");
var component_datetimepicker_1 = require("../../form/components/component-datetimepicker");
var AdFormService = (function (_super) {
    __extends(AdFormService, _super);
    function AdFormService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdFormService.prototype.getFormFields = function () {
        var formFields = {
            // Associated Offer
            OfferId: new component_entityLink_1.EntityLinkFormComponent({
                key: 'OfferId',
                label: 'Offer',
                required: true,
                data: {
                    entityLinkAbbr: 'OFF',
                    entityLinkSuffixField: 'OfferName',
                },
            }),
            // Main
            EffectiveDate: new component_datetimepicker_1.DateTimePickerComponent({
                key: 'EffectiveDate',
                label: 'Effective Date',
                value: '',
                required: true,
            }),
            // Details
            Name: new component_textbox_1.TextboxComponent({
                key: 'Name',
                label: 'Name',
                type: 'text',
                required: true,
            }),
            AdType: new component_dropdown_1.DropdownComponent({
                key: 'AdType',
                label: 'Type',
                options: this.data.adType,
                type: 'text',
                required: true,
                order: 120
            }),
            PlacementType: new component_dropdown_1.DropdownComponent({
                key: 'PlacementType',
                label: 'Placement',
                options: this.data.placementType,
                required: true,
            }),
            CalculatedWeight: new component_textbox_1.TextboxComponent({
                key: 'CalculatedWeight',
                label: 'Calculated Weight',
                type: 'number',
                required: true,
            }),
            CalculatedWeightOverride: new component_dropdown_1.DropdownComponent({
                key: 'CalculatedWeightOverride',
                label: 'Override Calculated Weight?',
                options: this.data.yesNo,
                required: true,
            }),
            OverrideWeight: new component_textbox_1.TextboxComponent({
                key: 'OverrideWeight',
                label: 'Override Weight',
                type: 'number',
                required: true,
            }),
            DisplayPercentage: new component_textbox_1.TextboxComponent({
                key: 'DisplayPercentage',
                label: 'Display %',
                type: 'number',
                min: 0,
                max: 100,
                required: true,
            }),
            DisplayStartDate: new component_datetimepicker_1.DateTimePickerComponent({
                key: 'DisplayStartDate',
                label: 'Start Date',
                value: '',
                required: true,
            }),
            DisplayEndDate: new component_datetimepicker_1.DateTimePickerComponent({
                key: 'DisplayEndDate',
                label: 'End Date',
                value: '',
                required: true,
            }),
            AdCategoryId: new component_dropdown_1.DropdownComponent({
                key: 'AdCategoryId',
                label: 'Category',
                options: this.data.adCategory,
                required: true,
                data: {
                    multiple: true,
                },
            }),
            //
            TrackingCampaignName: new component_textbox_1.TextboxComponent({
                key: 'TrackingCampaignName',
                label: 'Campaign Name',
                type: 'text',
                required: true,
            }),
            TrackingAutocompletionOnClick: new component_dropdown_1.DropdownComponent({
                key: 'TrackingAutocompletionOnClick',
                label: 'Autocompletion on Click',
                options: this.data.yesNo,
                required: true,
                data: {
                    multiple: true,
                },
            }),
            TrackingCompletionRepeatRate: new component_textbox_1.TextboxComponent({
                key: 'TrackingCompletionRepeatRate',
                label: 'Completion Repeat Rate',
                type: 'number',
                required: true,
            }),
            TrackingCompletionRepeatInterval: new component_dropdown_1.DropdownComponent({
                key: 'TrackingCompletionRepeatInterval',
                label: 'Completion Repeat Interval',
                options: this.data.trackingCompletionRepeatInterval,
                required: true,
            }),
            //
            PointsPointsEarning: new component_dropdown_1.DropdownComponent({
                key: 'PointsPointsEarning',
                label: 'Points Earning?',
                options: this.data.yesNo,
                required: true,
            }),
            PointsPoints: new component_textbox_1.TextboxComponent({
                key: 'PointsPoints',
                label: 'Points',
                type: 'number',
                required: true,
            }),
        };
        return formFields;
    };
    return AdFormService;
}(form_control_service_1.FormControlService));
AdFormService = __decorate([
    core_1.Injectable()
], AdFormService);
exports.AdFormService = AdFormService;
//# sourceMappingURL=ad-form.service.js.map