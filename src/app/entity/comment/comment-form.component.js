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
require("rxjs/add/operator/switchMap");
var app_service_1 = require("../../service/app.service");
var eoa_entity_form_component_1 = require("../eoa-entity-form.component");
var comment_form_service_1 = require("./comment-form.service");
var comment_service_1 = require("./comment.service");
var comment_type_1 = require("./comment.type");
var common_1 = require("@angular/common");
var CommentFormComponent = (function (_super) {
    __extends(CommentFormComponent, _super);
    function CommentFormComponent(formControlService, app, route, router, location, _changeDetectionRef) {
        var _this = _super.call(this, formControlService, app, route) || this;
        _this.formControlService = formControlService;
        _this.app = app;
        _this.route = route;
        _this.router = router;
        _this.location = location;
        _this._changeDetectionRef = _changeDetectionRef;
        return _this;
    }
    CommentFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.data.entity = new comment_type_1.Comment;
        this.data.entity_type = comment_type_1.Comment._entity_type;
        this.data.entity_abbreviation = comment_type_1.Comment._entity_abbreviation;
        this.data.entityName = this.app.capitalize(this.data.entity_type);
        this.data.entityService = new comment_service_1.CommentService(this.router);
        ;
        this.app.isDataLoaded.subscribe(function (val) { return _this.AppDataLoaded(val); });
    };
    CommentFormComponent.prototype._entitySingleLoaded = function () {
        this.app.entity_type = 'comment';
    };
    return CommentFormComponent;
}(eoa_entity_form_component_1.EOAEntityFormComponent));
CommentFormComponent = __decorate([
    core_1.Component({
        selector: 'comment-form',
        templateUrl: './comment-form.component.html',
        encapsulation: core_1.ViewEncapsulation.None,
        providers: [comment_form_service_1.CommentFormService],
    }),
    __metadata("design:paramtypes", [comment_form_service_1.CommentFormService,
        app_service_1.AppService,
        router_1.ActivatedRoute,
        router_1.Router,
        common_1.Location,
        core_1.ChangeDetectorRef])
], CommentFormComponent);
exports.CommentFormComponent = CommentFormComponent;
//# sourceMappingURL=comment-form.component.js.map