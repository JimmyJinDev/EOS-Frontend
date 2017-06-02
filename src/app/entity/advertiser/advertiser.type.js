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
var Advertiser = (function (_super) {
    __extends(Advertiser, _super);
    function Advertiser() {
        var _this = _super.call(this) || this;
        _this.AddressCountry = _this.AddressCountry || 1;
        return _this;
    }
    Advertiser.prototype.getEntityAbbreviation = function () {
        return this._entity_abbreviation;
    };
    return Advertiser;
}(eoa_entity_type_1.EOAEntity));
Advertiser._entity_type = 'advertiser';
Advertiser._entity_abbreviation = 'ADV';
exports.Advertiser = Advertiser;
//# sourceMappingURL=advertiser.type.js.map