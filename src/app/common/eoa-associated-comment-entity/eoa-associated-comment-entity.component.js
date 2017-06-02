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
var app_service_1 = require("../../service/app.service");
var fake_data_service_1 = require("../../service/fake-data.service");
var EOAAssociatedCommentEntityComponent = (function () {
    //  private router: Router;
    //  private advertiserService: AdvertiserService;
    function EOAAssociatedCommentEntityComponent(app, fakeData) {
        this.app = app;
        this.fakeData = fakeData;
        this._entity_type = 'advertiser';
        this.routerEntityLoaded = false;
        this.currentBool = false;
        this.searchExpanded = false;
        this.searchFieldExpandedFocusEventEmitter = new core_1.EventEmitter();
    }
    EOAAssociatedCommentEntityComponent.prototype.ngOnInit = function () {
        this.associatedEntityGetAll();
    };
    EOAAssociatedCommentEntityComponent.prototype.toggleParentLink = function (index) {
        this.entityItems[index]._data.toDelete = !this.entityItems[index]._data.toDelete;
    };
    EOAAssociatedCommentEntityComponent.prototype.toggleSearchExpand = function () {
        this.searchExpanded = !this.searchExpanded;
        if (this.searchExpanded) {
            this.searchFieldExpandedFocusEventEmitter.emit(true);
        }
        else {
            this.query = "";
        }
    };
    EOAAssociatedCommentEntityComponent.prototype.filterItems = function (items) {
        var _this = this;
        if (items && this.query) {
            return items.filter(function (item) {
                var Entities = item.Comments.toLowerCase();
                return Entities.indexOf(_this.query) >= 0;
            });
        }
        return items;
    };
    EOAAssociatedCommentEntityComponent.prototype.sortItems = function (items) {
        var _this = this;
        if (items && this.orderProp) {
            return items
                .slice(0) // Make a copy
                .sort(function (a, b) {
                if (a[_this.orderProp] < b[_this.orderProp]) {
                    return -1;
                }
                else if ([b[_this.orderProp] < a[_this.orderProp]]) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
        }
        return items;
    };
    EOAAssociatedCommentEntityComponent.prototype.getEntityItems = function () {
        return this.filterItems(this.entityItems);
    };
    EOAAssociatedCommentEntityComponent.prototype.associatedEntityGetAll = function () {
        this.entityItems = [];
        for (var i = 1; i < 30; i++) {
            this.entityItems.push(this.fakeData.getFakeComment());
            // delete entityItm.OfferId;
        }
        // this.app.getAll('comment')
        //   .then((entityItems) => {
        //     this.routerEntityLoaded = true;
        //     let processedEntityItems: any = [];
        //     entityItems.forEach((entityItm: any, key: any) => {
        //       entityItm._data = {
        //         toDelete: false,
        //       };
        //       processedEntityItems.push(entityItm);
        //     })
        //     return this.entityItems = processedEntityItems;
        //   });
    };
    EOAAssociatedCommentEntityComponent.prototype.readMore = function ($event) {
        this.app.stopEventPropagation($event);
    };
    return EOAAssociatedCommentEntityComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], EOAAssociatedCommentEntityComponent.prototype, "entityType", void 0);
EOAAssociatedCommentEntityComponent = __decorate([
    core_1.Component({
        selector: 'eoa-associated-comment-entity',
        templateUrl: './eoa-associated-comment-entity.component.html',
        encapsulation: core_1.ViewEncapsulation.None,
        providers: [],
    }),
    __metadata("design:paramtypes", [app_service_1.AppService, fake_data_service_1.FakeDataService])
], EOAAssociatedCommentEntityComponent);
exports.EOAAssociatedCommentEntityComponent = EOAAssociatedCommentEntityComponent;
//# sourceMappingURL=eoa-associated-comment-entity.component.js.map