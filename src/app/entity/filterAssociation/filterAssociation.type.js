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
var FilterAssociationType = (function (_super) {
    __extends(FilterAssociationType, _super);
    function FilterAssociationType() {
        return _super.call(this) || this;
    }
    return FilterAssociationType;
}(eoa_entity_type_1.EOAEntity));
FilterAssociationType._entity_type = 'filterassociation'; // @TODO: deprecated since 1.2.2
FilterAssociationType._entity_abbreviation = 'FIA';
exports.FilterAssociationType = FilterAssociationType;
//# sourceMappingURL=filterAssociation.type.js.map