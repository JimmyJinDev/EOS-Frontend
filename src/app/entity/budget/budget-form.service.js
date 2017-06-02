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
var component_datetimepicker_1 = require("../../form/components/component-datetimepicker");
var component_yesNo_1 = require("../../form/components/component-yesNo");
var BudgetFormService = (function (_super) {
    __extends(BudgetFormService, _super);
    function BudgetFormService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BudgetFormService.prototype.getFormFields = function () {
        var formFields = {
            // Main
            EffectiveDate: new component_datetimepicker_1.DateTimePickerComponent({
                key: 'EffectiveDate',
                label: 'Effective Date',
                value: '',
                required: true,
            }),
            // Details
            BudgetName: new component_textbox_1.TextboxComponent({
                key: 'BudgetName',
                label: 'Name',
                type: 'text',
                colClass: 'col-sm-3',
                required: true,
            }),
            BudgetType: new component_dropdown_1.DropdownComponent({
                key: 'BudgetType',
                label: 'Type',
                options: this.data.budgetType,
                required: true,
                value: '1',
            }),
            BudgetInterval: new component_dropdown_1.DropdownComponent({
                key: 'BudgetInterval',
                label: 'Interval',
                options: this.data.budgetInterval,
            }),
            ProductId: new component_dropdown_1.DropdownComponent({
                key: 'ProductId',
                label: 'Product Line',
                options: this.data.productLine,
                required: true,
            }),
            IsShared: new component_yesNo_1.YesNoComponent({
                key: 'IsShared',
                options: this.data.yesNo,
                label: 'Shared',
                value: '2',
            }),
            BudgetLimit: new component_textbox_1.TextboxComponent({
                key: 'BudgetLimit',
                label: 'Limit',
                required: true,
            }),
            OverridePayoutRpc: new component_textbox_1.TextboxComponent({
                key: 'OverridePayoutRpc',
                label: 'Override Payout',
                prefix: '$',
                value: '',
                required: true,
            }),
            DefaultPayoutRpc: new component_yesNo_1.YesNoComponent({
                key: 'DefaultPayoutRpc',
                label: 'Default Payout',
                value: '1',
                options: this.data.yesNo,
                required: true,
            }),
        };
        return formFields;
    };
    return BudgetFormService;
}(form_control_service_1.FormControlService));
BudgetFormService = __decorate([
    core_1.Injectable()
], BudgetFormService);
exports.BudgetFormService = BudgetFormService;
//# sourceMappingURL=budget-form.service.js.map