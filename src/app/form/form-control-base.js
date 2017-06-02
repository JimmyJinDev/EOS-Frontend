"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FormControlBase = (function () {
    function FormControlBase(options) {
        if (options === void 0) { options = {}; }
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.maxlength = options.maxlength || options.maxlength;
        this.controlType = options.controlType || '';
        this.colClass = options.colClass || 'col-sm-12';
        this.data = options.data || {};
        this.showClearButton = options.showClearButton || false;
        this.prefix = options.prefix || '';
        this.suffix = options.suffix || '';
    }
    return FormControlBase;
}());
exports.FormControlBase = FormControlBase;
//# sourceMappingURL=form-control-base.js.map