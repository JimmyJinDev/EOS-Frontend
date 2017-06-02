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
var router_1 = require("@angular/router");
var app_service_1 = require("../service/app.service");
var common_1 = require("@angular/common");
var EntityListComponent = (function () {
    function EntityListComponent(app, router, route, location) {
        this.app = app;
        this.router = router;
        this.route = route;
        this.location = location;
    }
    EntityListComponent.prototype.ngOnInit = function () {
        this.entityType = this.route.routeConfig.path;
        this.entityAbbr = this.app.getEntityAbbrFromType(this.entityType);
        this.app.setAppData('sidebarEntityAbbr', this.entityAbbr);
        this.app.setAppData('listEntityAbbr', this.entityAbbr);
        this.getEntityItems();
        this.app.setFormDataLoaded(true);
    };
    EntityListComponent.prototype.getEntityItems = function () {
        var _this = this;
        this.app.getAll(this.entityType)
            .then(function (entityItems) {
            return _this.entityItems = entityItems;
        });
    };
    EntityListComponent.prototype.entityGoTo = function (entityItm) {
        this.selectedEntityItm = entityItm;
        this.router.navigate(['/' + this.entityType + '/', entityItm[this.app.getEntityPk(this.entityAbbr)]]);
    };
    EntityListComponent.prototype.getEntityID = function (entityItm) {
        return this.app.getFormattedEntityId(this.entityAbbr, entityItm[this.app.getEntityPk(this.entityAbbr)]);
    };
    EntityListComponent.prototype.getEntityItemDesc = function (entityItm) {
        return entityItm[this.app.getEntitySidebarSearchFields(this.entityAbbr).text_1];
    };
    return EntityListComponent;
}());
EntityListComponent = __decorate([
    core_1.Component({
        selector: 'eoa-entity-list',
        templateUrl: './entity-list.component.html',
    }),
    __metadata("design:paramtypes", [app_service_1.AppService,
        router_1.Router,
        router_1.ActivatedRoute,
        common_1.Location])
], EntityListComponent);
exports.EntityListComponent = EntityListComponent;
//# sourceMappingURL=entity-list.component.js.map