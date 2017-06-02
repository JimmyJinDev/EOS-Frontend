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
var EntityCommentPanelComponent = (function () {
    function EntityCommentPanelComponent() {
    }
    EntityCommentPanelComponent.prototype.ngOnInit = function () {
    };
    return EntityCommentPanelComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EntityCommentPanelComponent.prototype, "form", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EntityCommentPanelComponent.prototype, "formFields", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EntityCommentPanelComponent.prototype, "data", void 0);
EntityCommentPanelComponent = __decorate([
    core_1.Component({
        selector: 'entity-comment-panel',
        templateUrl: './entity-comment-panel.component.html',
    }),
    __metadata("design:paramtypes", [])
], EntityCommentPanelComponent);
exports.EntityCommentPanelComponent = EntityCommentPanelComponent;
//# sourceMappingURL=entity-comment-panel.component.js.map