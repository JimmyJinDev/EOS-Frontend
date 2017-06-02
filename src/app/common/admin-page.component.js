"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var fake_data_service_1 = require("../service/fake-data.service");
var advertiser_service_1 = require("../entity/advertiser/advertiser.service");
var offer_service_1 = require("../entity/offer/offer.service");
var budget_service_1 = require("../entity/budget/budget.service");
var app_service_1 = require("../service/app.service");
var AdminPageComponent = (function () {
    function AdminPageComponent(fakeData, advertiserService, offerService, budgetService, app) {
        this.fakeData = fakeData;
        this.advertiserService = advertiserService;
        this.offerService = offerService;
        this.budgetService = budgetService;
        this.app = app;
        this.data = {};
        this.submittedAndSaved = false;
    }
    AdminPageComponent.prototype.ngOnInit = function () {
        this.data = {};
    };
    AdminPageComponent.prototype.exportFakeADV = function () {
        var _this = this;
        this.submittedAndSaved = false;
        for (var i = 1; i < 30; i++) {
            var entityItm = this.fakeData.getFakeAdvertiser();
            delete entityItm.AdvertiserId;
            this.advertiserService.saveOne(entityItm).then(function (result) { return _this._afterSave(result); });
        }
    };
    AdminPageComponent.prototype.exportFakeOFF = function () {
        var _this = this;
        this.submittedAndSaved = false;
        for (var i = 1; i < 30; i++) {
            var entityItm = this.fakeData.getFakeOffer();
            delete entityItm.OfferId;
            this.offerService.saveOne(entityItm).then(function (result) { return _this._afterSave(result); });
        }
    };
    AdminPageComponent.prototype.exportFakeBUD = function () {
        var _this = this;
        this.submittedAndSaved = false;
        for (var i = 1; i < 30; i++) {
            var entityItm = this.fakeData.getFakeBudget();
            delete entityItm.BudgetId;
            this.budgetService.saveOne(entityItm).then(function (result) { return _this._afterSave(result); });
        }
    };
    AdminPageComponent.prototype.exportFakeADS = function () {
        var _this = this;
        this.submittedAndSaved = false;
        for (var i = 1; i < 30; i++) {
            var entityItm = this._pruneEntity(this.fakeData.getFakeAd(), 'ADS');
            this.app.saveOne(entityItm, 'ADS').then(function (result) { return _this._afterSave(result); });
        }
    };
    AdminPageComponent.prototype._pruneEntity = function (entityItm, entityAbbr) {
        var prunnedEntity = entityItm;
        switch (entityAbbr) {
            case 'ADS':
                delete prunnedEntity.AdId;
                break;
            case 'BUD':
                delete entityItm.BudgetId;
                break;
        }
        if (this.app.dev_mode !== 'jit') {
            // Get proper StatusReasonID
            var statusReasonId = this.app._getRandomArbitrary(1, this.app.getAppData('appDataTypes').statusReason.length);
            prunnedEntity.StatusReasonId = statusReasonId;
        }
        return prunnedEntity;
    };
    AdminPageComponent.prototype._afterSave = function (result) {
        if (undefined === result) {
            return;
        }
        if ('Success' !== result) {
            return;
        }
        this.data.entitySingle = result;
        this.submittedAndSaved = true;
    };
    return AdminPageComponent;
}());
AdminPageComponent = __decorate([
    core_1.Component({
        selector: 'admin-page',
        templateUrl: './admin-page.component.html',
    }),
    __metadata("design:paramtypes", [fake_data_service_1.FakeDataService,
        advertiser_service_1.AdvertiserService,
        offer_service_1.OfferService,
        budget_service_1.BudgetService,
        app_service_1.AppService])
], AdminPageComponent);
exports.AdminPageComponent = AdminPageComponent;
//# sourceMappingURL=admin-page.component.js.map