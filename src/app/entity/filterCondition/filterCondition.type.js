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
var eoa_entity_type_1 = require("../eoa-entity.type");
var FilterCondition = (function (_super) {
    __extends(FilterCondition, _super);
    function FilterCondition() {
        return _super.call(this) || this;
    }
    return FilterCondition;
}(eoa_entity_type_1.EOAEntity));
FilterCondition._entity_type = 'filtercondition';
FilterCondition._entity_abbreviation = 'FIC';
exports.FilterCondition = FilterCondition;
//# sourceMappingURL=filterCondition.type.js.map