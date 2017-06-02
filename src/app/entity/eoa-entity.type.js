"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EOAEntity = (function () {
    function EOAEntity() {
        this.statusId = this.statusId || 2;
        this.StatusReasonId = this.StatusReasonId || 1;
        this.LastModifiedDate = this.LastModifiedDate || new Date().toLocaleDateString();
    }
    EOAEntity.prototype.isActive = function () {
        return !(this.statusId === 1);
    };
    EOAEntity.prototype.getEntityAbbreviation = function () {
        return this._entity_abbreviation;
    };
    return EOAEntity;
}());
exports.EOAEntity = EOAEntity;
//# sourceMappingURL=eoa-entity.type.js.map