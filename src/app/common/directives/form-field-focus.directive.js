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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FormFieldFocusDirective = (function () {
    function FormFieldFocusDirective(element, renderer) {
        this.element = element;
        this.renderer = renderer;
    }
    FormFieldFocusDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.focusEvent.subscribe(function (event) {
            _this.renderer.invokeElementMethod(_this.element.nativeElement, 'focus', []);
        });
    };
    return FormFieldFocusDirective;
}());
__decorate([
    core_1.Input('formFieldfocus'),
    __metadata("design:type", core_1.EventEmitter)
], FormFieldFocusDirective.prototype, "focusEvent", void 0);
FormFieldFocusDirective = __decorate([
    core_1.Directive({
        selector: '[formFieldfocus]'
    }),
    __param(0, core_1.Inject(core_1.ElementRef)),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer])
], FormFieldFocusDirective);
exports.FormFieldFocusDirective = FormFieldFocusDirective;
//# sourceMappingURL=form-field-focus.directive.js.map