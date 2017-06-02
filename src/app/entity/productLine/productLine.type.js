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
var ProductLine = (function (_super) {
    __extends(ProductLine, _super);
    function ProductLine(EffectiveDate, 
        //
        ProductLineId, AdvertiserId, ProductLineName, HasProductLineId, ProductLineType, PrimaryGoal, 
        //
        RevenueType, DefaultPayoutRpc, PayoutRpcStartDate, ScrubPercentage) {
        var _this = _super.call(this) || this;
        _this.EffectiveDate = EffectiveDate;
        _this.ProductLineId = ProductLineId;
        _this.AdvertiserId = AdvertiserId;
        _this.ProductLineName = ProductLineName;
        _this.HasProductLineId = HasProductLineId;
        _this.ProductLineType = ProductLineType;
        _this.PrimaryGoal = PrimaryGoal;
        _this.RevenueType = RevenueType;
        _this.DefaultPayoutRpc = DefaultPayoutRpc;
        _this.PayoutRpcStartDate = PayoutRpcStartDate;
        _this.ScrubPercentage = ScrubPercentage;
        return _this;
    }
    return ProductLine;
}(eoa_entity_type_1.EOAEntity));
ProductLine._entity_type = 'productLine';
ProductLine._entity_abbreviation = 'OFF';
exports.ProductLine = ProductLine;
//# sourceMappingURL=productLine.type.js.map