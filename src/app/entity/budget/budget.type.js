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
var Budget = (function (_super) {
    __extends(Budget, _super);
    function Budget(EffectiveDate, 
        //
        BudgetName, BudgetType, ProductId, Shared, 
        //
        RevenueLimit, OverridePayoutRpc, DefaultPayoutRpc) {
        var _this = _super.call(this) || this;
        _this.EffectiveDate = EffectiveDate;
        _this.BudgetName = BudgetName;
        _this.BudgetType = BudgetType;
        _this.ProductId = ProductId;
        _this.Shared = Shared;
        _this.RevenueLimit = RevenueLimit;
        _this.OverridePayoutRpc = OverridePayoutRpc;
        _this.DefaultPayoutRpc = DefaultPayoutRpc;
        return _this;
    }
    return Budget;
}(eoa_entity_type_1.EOAEntity));
Budget._entity_type = 'budget';
Budget._entity_abbreviation = 'BUD';
exports.Budget = Budget;
//# sourceMappingURL=budget.type.js.map