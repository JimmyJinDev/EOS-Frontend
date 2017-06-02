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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var component_dropdown_1 = require("../../form/components/component-dropdown");
var component_textbox_1 = require("../../form/components/component-textbox");
var form_control_service_1 = require("../../form/form-control.service");
var AppSidebarFormService = (function (_super) {
    __extends(AppSidebarFormService, _super);
    function AppSidebarFormService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Sidebar Fields that mimic their counterparts in the Entity Forms.
     * The sidebar will throw an error if there's no such related fields created.
     *
     * @ TODO: Get these dynamically from the -form.service.ts files
     *
     */
    AppSidebarFormService.prototype.getFormFields = function () {
        var formFields = {
            // Sidebar
            freeTextSearch: new component_textbox_1.TextboxComponent({
                key: 'freeTextSearch',
                label: 'Free Text Search',
                type: 'text',
                order: 10
            }),
            AppEntities: new component_dropdown_1.DropdownComponent({
                key: 'AppEntities',
                label: 'Type',
                options: this._getSearchableAppEntities(),
                order: 160
            }),
            // Ad
            Name: new component_textbox_1.TextboxComponent({
                key: 'Name',
                label: 'Name',
                type: 'text',
            }),
            AdType: new component_dropdown_1.DropdownComponent({
                key: 'AdType',
                label: 'Type',
                options: this.data.adType,
                type: 'text',
            }),
            // FilterAssociation
            // Name:        new TextboxComponent( {
            //   key:   'Name',
            //   label: 'Name',
            //   type:  'text',
            // } ),
            Description: new component_textbox_1.TextboxComponent({
                key: 'Description',
                label: 'Name',
                type: 'text',
            }),
            // FilterCondition
            FilterConditionGroup: new component_dropdown_1.DropdownComponent({
                key: 'FilterConditionGroup',
                label: 'Type',
                options: this.data.filterConditionGroup,
                required: true,
            }),
            FilterConditionType: new component_dropdown_1.DropdownComponent({
                key: 'FilterConditionType',
                label: 'Type',
                options: this.data.filterConditionType,
            }),
            FilterConditionValue: new component_textbox_1.TextboxComponent({
                key: 'FilterConditionValue',
                label: 'Name',
                type: 'text',
            }),
            // Advertiser
            PrimaryCity: new component_textbox_1.TextboxComponent({
                key: 'PrimaryCity',
                label: 'City',
                type: 'text',
            }),
            PrimaryState: new component_dropdown_1.DropdownComponent({
                key: 'PrimaryState',
                label: 'State',
                options: this.data.states,
                order: 140
            }),
            PrimaryCountry: new component_dropdown_1.DropdownComponent({
                key: 'PrimaryCountry',
                label: 'Country',
                options: this.data.countries,
                order: 140
            }),
            // Offer
            OfferType: new component_dropdown_1.DropdownComponent({
                key: 'OfferType',
                label: 'Type',
                options: this.data.offerType,
            }),
        };
        return formFields;
    };
    AppSidebarFormService.prototype._getSearchableAppEntities = function () {
        var searchableEntities = [];
        for (var entityId in this.data.appEntities) {
            if (this.data.appEntities.hasOwnProperty(entityId)) {
                var entityItm = this.data.appEntities[entityId];
                if (this.app.getAppData('entities')[entityItm.key].appSidebarSearchable !== false) {
                    searchableEntities.push(entityItm);
                }
            }
        }
        return searchableEntities;
    };
    return AppSidebarFormService;
}(form_control_service_1.FormControlService));
AppSidebarFormService = __decorate([
    core_1.Injectable()
], AppSidebarFormService);
exports.AppSidebarFormService = AppSidebarFormService;
//# sourceMappingURL=app-sidebar-form.service.js.map