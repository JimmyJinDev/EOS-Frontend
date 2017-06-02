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
var app_service_1 = require("../service/app.service");
var router_1 = require("@angular/router");
var FormHeaderComponent = (function () {
    function FormHeaderComponent(app, router) {
        this.app = app;
        this.router = router;
        this.data = {};
        this.statusIdChange = new core_1.EventEmitter();
        this.StatusReasonIdChange = new core_1.EventEmitter();
        this.StatusName = '';
        this.StatusNamePrev = '';
        this.StatusReason = '';
        this.StatusReasonPrev = '';
        this.statusList = [];
        this.statusReasonList = [];
        this.staticAlertClosed = false;
        this.entityID = '';
    }
    FormHeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        /**
         * Observe formDataLoadedObserve message
         */
        this.app.formDataLoadedObserve().subscribe(function (val) {
            if (val) {
                _this.initFormHeader();
            }
        });
    };
    FormHeaderComponent.prototype.toggleButton = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        // debugger;
        // this.statusIdChange.emit(this.statusId);
    };
    FormHeaderComponent.prototype.ngbOpenChange = function ($event) {
        // console.log( 'this.StatusReason_2' + this.StatusReason );
        // console.log( 'this.statusId_2 ' + this.statusId );
        console.log('this.StatusName ' + this.StatusName);
        var closed = !$event;
        var open = $event;
        if (open) {
            this.StatusNamePrev = this.StatusName;
        }
        var oddValue = this.statusList[0].key;
        if (this.statusId === oddValue) {
            this.statusId = this.statusList[1].key;
            this.StatusName = this.statusList[1].value;
        }
        else {
            this.statusId = this.statusList[0].key;
            this.StatusName = this.statusList[0].value;
        }
        if (open) {
            this.StatusReason = '...';
        }
        if (closed) {
            this.StatusReason = this.StatusReasonPrev;
            console.log('this.StatusName_3 ' + this.StatusName);
        }
        console.log('this.statusId' + this.statusId);
        // if ( closed ) {
        //   if ( ) {
        //
        //   }
        // }
    };
    FormHeaderComponent.prototype.selectStatusReason = function (index) {
        this.StatusReason = this.statusReasonList[index].StatusReason;
        this.StatusReasonPrev = this.StatusReason;
        this.StatusNamePrev = this.StatusName;
        this.statusId = index;
        this.StatusReasonIdChange.emit(this.StatusReasonId);
    };
    FormHeaderComponent.prototype.initFormHeader = function () {
        this.statusList = this.app.getAppData('appDataTypes')['status'];
        this.statusReasonList = this.app.getAppData('appDataTypes')['statusReason'];
        this.entityAbbreviation = this.app.getAppData('formEntityAbbr');
        this.StatusName = this.statusList[0].value;
        this.StatusReason = this.statusReasonList[0].StatusReason;
        this.StatusNamePrev = this.StatusName;
        this.StatusReasonPrev = this.StatusReason;
        this.setEntityID();
    };
    FormHeaderComponent.prototype.getStatusReasonList = function () {
        if (undefined === this.statusId) {
            return;
        }
        return this.statusReasonList = _.filter(this.app.getAppData('appDataTypes')['statusReason'], ['StatusId', this.statusId]);
    };
    FormHeaderComponent.prototype.setEntityID = function () {
        return this.entityID = (this.data.newRecord) ?
            ' [NEW] '
            : this.data.entitySingle[this.app.getEntityPk(this.data.entity_abbreviation)];
    };
    FormHeaderComponent.prototype.getSidebarFormState = function () {
        return this.app.getAppData('sidebarFormShown');
    };
    FormHeaderComponent.prototype.hideSidebar = function (state) {
        this.app.setAppData('sidebarFormShown', state);
        this.app.setAppData('sidebarShown', state);
    };
    FormHeaderComponent.prototype.isFIC = function () {
        return this.data.entity_type === 'filtercondition';
    };
    FormHeaderComponent.prototype.goBackToFIC = function () {
        this.app.showEntityInSidebar('FIC');
    };
    return FormHeaderComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], FormHeaderComponent.prototype, "data", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], FormHeaderComponent.prototype, "statusId", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], FormHeaderComponent.prototype, "statusIdChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], FormHeaderComponent.prototype, "StatusReasonId", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], FormHeaderComponent.prototype, "StatusReasonIdChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], FormHeaderComponent.prototype, "submittedAndSaved", void 0);
__decorate([
    core_1.ViewChild('messageHolder'),
    __metadata("design:type", core_1.ElementRef)
], FormHeaderComponent.prototype, "messageHolder", void 0);
FormHeaderComponent = __decorate([
    core_1.Component({
        selector: 'form-header',
        templateUrl: './form-header.component.html',
    }),
    __metadata("design:paramtypes", [app_service_1.AppService,
        router_1.Router])
], FormHeaderComponent);
exports.FormHeaderComponent = FormHeaderComponent;
//# sourceMappingURL=form-header.component.js.map