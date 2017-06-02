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
Object.defineProperty(exports, "__esModule", { value: true });
var form_control_base_1 = require("../form-control-base");
var DateTimePickerComponent = (function (_super) {
    __extends(DateTimePickerComponent, _super);
    function DateTimePickerComponent(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.controlType = 'datetimepicker';
        _this.options = [];
        _this.options = options['options'] || [];
        return _this;
    }
    return DateTimePickerComponent;
}(form_control_base_1.FormControlBase));
exports.DateTimePickerComponent = DateTimePickerComponent;
//# sourceMappingURL=component-datetimepicker.js.map