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
var TextboxComponent = (function (_super) {
    __extends(TextboxComponent, _super);
    function TextboxComponent(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.controlType = 'textbox';
        _this.type = options['type'] || '';
        _this.datetimepicker = options['datetimepicker'] || false;
        _this.preffix = options['preffix'] || '';
        _this.suffix = options['suffix'] || '';
        _this.min = options['min'] || '';
        _this.max = options['max'] || '';
        return _this;
    }
    return TextboxComponent;
}(form_control_base_1.FormControlBase));
exports.TextboxComponent = TextboxComponent;
//# sourceMappingURL=component-textbox.js.map