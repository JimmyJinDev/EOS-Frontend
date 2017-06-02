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
var FilterAssociationFormService = (function (_super) {
    __extends(FilterAssociationFormService, _super);
    function FilterAssociationFormService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FilterAssociationFormService.prototype.getFormFields = function () {
        var formFields = {
            // Main
            EffectiveDate: new component_datetimepicker_1.DateTimePickerComponent({
                key: 'EffectiveDate',
                label: 'Effective Date',
                required: true,
            }),
            // Company
            AdvertiserId: new component_entityLink_1.EntityLinkFormComponent({
                key: 'AdId',
                label: 'Ad',
                required: true,
                data: {
                    entityLinkAbbr: 'ADS',
                    entityLinkSuffixField: 'Name',
                },
            }),
            Name: new component_textbox_1.TextboxComponent({
                key: 'Name',
                label: 'Name',
                value: '',
                min: 60,
                required: true,
            }),
            Description: new component_textbox_1.TextboxComponent({
                key: 'Description',
                label: 'Description',
                value: '',
                min: 100,
                required: true,
            }),
            ProductLineId: new component_dropdown_1.DropdownComponent({
                key: 'ProductLineId',
                label: 'Product Line',
                options: this.data.productLine,
            }),
        };
        return formFields;
    };
    return FilterAssociationFormService;
}(form_control_service_1.FormControlService));
FilterAssociationFormService = __decorate([
    core_1.Injectable()
], FilterAssociationFormService);
exports.FilterAssociationFormService = FilterAssociationFormService;
//# sourceMappingURL=filterAssociation-form.service.js.map