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
var component_textbox_1 = require("../../form/components/component-textbox");
var form_control_service_1 = require("../../form/form-control.service");
var CommentFormService = (function (_super) {
    __extends(CommentFormService, _super);
    function CommentFormService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommentFormService.prototype.getFormFields = function () {
        var formFields = {
            // Main
            EffectiveDate: new component_textbox_1.TextboxComponent({
                key: 'EffectiveDate',
                label: 'Effective Date',
                value: '',
                required: true,
            }),
            // Details
            CommentName: new component_textbox_1.TextboxComponent({
                key: 'CommentName',
                label: 'Name',
                type: 'text',
                colClass: 'col-sm-3',
            }),
        };
        return formFields;
    };
    return CommentFormService;
}(form_control_service_1.FormControlService));
CommentFormService = __decorate([
    core_1.Injectable()
], CommentFormService);
exports.CommentFormService = CommentFormService;
//# sourceMappingURL=comment-form.service.js.map