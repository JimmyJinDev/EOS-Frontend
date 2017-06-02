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
var forms_1 = require("@angular/forms");
var app_service_1 = require("../service/app.service");
var eoa_form_group_1 = require("./eoa-form-group");
var component_textbox_1 = require("./components/component-textbox");
var component_dropdown_1 = require("./components/component-dropdown");
var FormControlService = (function () {
    function FormControlService(app, fb) {
        var _this = this;
        this.app = app;
        this.fb = fb;
        this.data = {};
        this.app.isDataLoaded.subscribe(function (val) {
            if (val === true) {
                var data = _this.app.getAppData('appDataTypes');
                // let data: any = this.app.getAppData(this.app.getAppData('remoteDataTypes'));
                if (undefined === data) {
                    return;
                }
                for (var key in data) {
                    if (!data.hasOwnProperty(key)) {
                        return;
                    }
                    var value = data[key];
                    if (undefined === value || !value.length || key === 'entities') {
                        return;
                    }
                    _this.data[key] = _this._idNameToKeyValue(value);
                }
            }
        });
    }
    /**
     * Stub. Gets overriden by others extending this class.
     */
    FormControlService.prototype.getFormFields = function () {
    };
    FormControlService.prototype.getForm = function () {
        var formFields = this._populateFormFields();
        var form = this._toFormGroup(formFields);
        form.formFields = formFields;
        return form;
    };
    FormControlService.prototype._toFormGroup = function (controls) {
        var group = {};
        for (var key in controls) {
            if (!controls.hasOwnProperty(key)) {
                return;
            }
            var control = controls[key];
            group[key] = control.required ? new forms_1.FormControl(control.value || '', forms_1.Validators.required)
                : new forms_1.FormControl(control.value || '');
        }
        return new eoa_form_group_1.EOAFormGroup(group);
    };
    FormControlService.prototype._idNameToKeyValue = function (data) {
        var keyValue = [];
        data.forEach(function (itm) {
            if (itm.key !== undefined) {
                keyValue.push(itm);
            }
            else {
                keyValue.push({ key: itm.id, value: itm.name });
            }
        });
        return keyValue;
    };
    FormControlService.prototype._populateFormFields = function () {
        var formFields;
        if (this.app.getAppData('formEntityAbbr') === 'FIC') {
            formFields = this.getFormFields();
        }
        else {
            formFields = Object.assign(this._getStatusFields(), this.getFormFields(), this._getAuditFields());
        }
        return formFields;
    };
    FormControlService.prototype._getStatusFields = function () {
        var status_fields = {
            // Status
            StatusId: new component_dropdown_1.DropdownComponent({
                key: 'StatusId',
                label: 'Status',
                options: this.data.status,
            }),
            StatusReasonId: new component_dropdown_1.DropdownComponent({
                key: 'StatusReasonId',
                label: 'Status Reason',
                options: this.data.statusReason,
            }),
        };
        return status_fields;
    };
    FormControlService.prototype._getAuditFields = function () {
        var audit_fields = {
            // Audit
            CreatedDate: new component_textbox_1.TextboxComponent({
                key: 'CreatedDate',
                label: 'Created Date',
                value: '',
                required: true,
            }),
            CreatedBy: new component_textbox_1.TextboxComponent({
                key: 'CreatedBy',
                label: 'Created By',
                value: '',
                required: true,
            }),
            LastModifiedBy: new component_textbox_1.TextboxComponent({
                key: 'LastModifiedBy',
                label: 'Last Modified By',
                value: '',
                required: true,
            }),
            LastModifiedDate: new component_textbox_1.TextboxComponent({
                key: 'LastModifiedDate',
                label: 'Last Modified Date',
                value: '',
                required: true,
            }),
        };
        return audit_fields;
    };
    return FormControlService;
}());
FormControlService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [app_service_1.AppService, forms_1.FormBuilder])
], FormControlService);
exports.FormControlService = FormControlService;
//# sourceMappingURL=form-control.service.js.map