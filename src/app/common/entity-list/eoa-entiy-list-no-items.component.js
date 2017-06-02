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
var EOAEntityListNoItemsComponent = (function () {
    function EOAEntityListNoItemsComponent(app) {
        this.app = app;
        this.addOneClicked = new core_1.EventEmitter();
    }
    EOAEntityListNoItemsComponent.prototype.ngOnInit = function () {
    };
    EOAEntityListNoItemsComponent.prototype.getEntityListIsEmpty = function () {
        if (undefined === this.entityList || this.entityList.length === 0) {
            return true;
        }
        return false;
    };
    EOAEntityListNoItemsComponent.prototype.addOne = function () {
        this.addOneClicked.emit(true);
    };
    return EOAEntityListNoItemsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EOAEntityListNoItemsComponent.prototype, "entityList", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], EOAEntityListNoItemsComponent.prototype, "dataLoaded", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], EOAEntityListNoItemsComponent.prototype, "addOneClicked", void 0);
EOAEntityListNoItemsComponent = __decorate([
    core_1.Component({
        selector: 'eoa-entity-list-no-items',
        templateUrl: './eoa-entiy-list-no-items.component.html',
        providers: [],
    }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], EOAEntityListNoItemsComponent);
exports.EOAEntityListNoItemsComponent = EOAEntityListNoItemsComponent;
//# sourceMappingURL=eoa-entiy-list-no-items.component.js.map