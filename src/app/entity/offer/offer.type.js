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
var Offer = (function (_super) {
    __extends(Offer, _super);
    function Offer(EffectiveDate, 
        //
        ProductLineId, AdvertiserId, OfferName, HasOfferId, OfferType, PrimaryGoal, 
        //
        RevenueType, DefaultPayoutRpc, PayoutRpcStartDate, ScrubPercentage) {
        var _this = _super.call(this) || this;
        _this.EffectiveDate = EffectiveDate;
        _this.ProductLineId = ProductLineId;
        _this.AdvertiserId = AdvertiserId;
        _this.OfferName = OfferName;
        _this.HasOfferId = HasOfferId;
        _this.OfferType = OfferType;
        _this.PrimaryGoal = PrimaryGoal;
        _this.RevenueType = RevenueType;
        _this.DefaultPayoutRpc = DefaultPayoutRpc;
        _this.PayoutRpcStartDate = PayoutRpcStartDate;
        _this.ScrubPercentage = ScrubPercentage;
        return _this;
    }
    return Offer;
}(eoa_entity_type_1.EOAEntity));
Offer._entity_type = 'offer';
Offer._entity_abbreviation = 'OFF';
exports.Offer = Offer;
//# sourceMappingURL=offer.type.js.map