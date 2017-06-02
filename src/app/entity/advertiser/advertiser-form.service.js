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
var AdvertiserFormService = (function (_super) {
    __extends(AdvertiserFormService, _super);
    function AdvertiserFormService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdvertiserFormService.prototype.getFormFields = function () {
        var formFields = {
            // Company
            CompanyName: new component_textbox_1.TextboxComponent({
                key: 'CompanyName',
                label: 'Name',
                value: '',
                required: true,
                order: 105
            }),
            // Primary Address
            PrimaryAddressLine1: new component_textbox_1.TextboxComponent({
                key: 'PrimaryAddressLine1',
                label: 'Address Line 1',
                type: 'text',
                maxlength: 75,
                order: 115
            }),
            PrimaryAddressLine2: new component_textbox_1.TextboxComponent({
                key: 'PrimaryAddressLine2',
                label: 'Address Line 2',
                type: 'text',
                maxlength: 75,
                order: 120
            }),
            PrimaryCity: new component_textbox_1.TextboxComponent({
                key: 'PrimaryCity',
                label: 'City',
                type: 'text',
                rowClass: 'col-sm-3',
                maxlength: 15,
                order: 130
            }),
            PrimaryState: new component_dropdown_1.DropdownComponent({
                key: 'PrimaryState',
                label: 'State',
                options: this.data.states,
                rowClass: 'col-sm-3',
                order: 140
            }),
            PrimaryPostal: new component_textbox_1.TextboxComponent({
                key: 'PrimaryPostal',
                label: 'Postal Code',
                type: 'text',
                maxlength: 15,
                rowClass: 'col-sm-3',
                order: 150
            }),
            PrimaryCountry: new component_dropdown_1.DropdownComponent({
                key: 'PrimaryCountry',
                label: 'Country',
                options: this.data.countries,
                rowClass: 'col-sm-3',
                order: 160
            }),
            // Primary Contact
            PrimaryFirstName: new component_textbox_1.TextboxComponent({
                key: 'PrimaryFirstName',
                label: 'First Name',
                value: '',
                rowClass: 'col-sm-3',
                order: 175
            }),
            PrimaryLastName: new component_textbox_1.TextboxComponent({
                key: 'PrimaryLastName',
                label: 'Last Name',
                value: '',
                rowClass: 'col-sm-3',
                order: 180
            }),
            PrimaryPhone: new component_textbox_1.TextboxComponent({
                key: 'PrimaryPhone',
                label: 'Phone',
                value: '',
                rowClass: 'col-sm-3',
                order: 190
            }),
            PrimaryEmailAddress: new component_textbox_1.TextboxComponent({
                key: 'PrimaryEmailAddress',
                label: 'Email',
                value: '',
                rowClass: 'col-sm-3',
                order: 200
            }),
        };
        return formFields;
    };
    return AdvertiserFormService;
}(form_control_service_1.FormControlService));
AdvertiserFormService = __decorate([
    core_1.Injectable()
], AdvertiserFormService);
exports.AdvertiserFormService = AdvertiserFormService;
//# sourceMappingURL=advertiser-form.service.js.map