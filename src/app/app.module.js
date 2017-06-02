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
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var platform_browser_1 = require("@angular/platform-browser");
// import { DynamicFormQuestionComponent } from './forms/dynamic-form-question.component';
// Imports for loading & configuring the in-memory web api
// ** Directives
// import { HighlightDirective } from './highlight.directive';
var ngx_pagination_1 = require("ngx-pagination");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
// ** App Components
var appData_type_1 = require("./appData.type");
var form_field_focus_directive_1 = require("./common/directives/form-field-focus.directive");
var form_inline_directive_1 = require("./common/directives/form-inline.directive");
var eoa_associated_comment_entity_component_1 = require("./common/eoa-associated-comment-entity/eoa-associated-comment-entity.component");
var eoa_associated_entity_component_1 = require("./common/eoa-associated-entity/eoa-associated-entity.component");
var app_sidebar_component_1 = require("./common/sidebar/app-sidebar.component");
var advertiser_form_component_1 = require("./entity/advertiser/advertiser-form.component");
var entity_list_component_1 = require("./entity/entity-list.component");
var advertiser_service_1 = require("./entity/advertiser/advertiser.service");
var budget_form_component_1 = require("./entity/budget/budget-form.component");
var budget_service_1 = require("./entity/budget/budget.service");
var comment_form_component_1 = require("./entity/comment/comment-form.component");
var comment_service_1 = require("./entity/comment/comment.service");
var offer_form_component_1 = require("./entity/offer/offer-form.component");
var offer_service_1 = require("./entity/offer/offer.service");
var dynamic_form_component_1 = require("./form/dynamic-form.component");
var form_header_component_1 = require("./form/form-header.component");
// ** Services
var app_service_1 = require("./service/app.service");
var auth_service_1 = require("./service/auth.service");
var base_service_1 = require("./service/base.service");
var logger_service_1 = require("./service/logger.service");
var fake_data_service_1 = require("./service/fake-data.service");
var admin_page_component_1 = require("./common/admin-page.component");
var entity_audit_panel_component_1 = require("./entity/entity-audit-panel.component");
var dashboard_component_1 = require("./dashboard.component");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var alert_closeable_1 = require("./common/directives/alert-closeable");
var budgetAssociation_service_1 = require("./entity/budgetAssociation/budgetAssociation.service");
var ngbEOADateParserFormatter_1 = require("./common/directives/ngbEOADateParserFormatter");
var eoa_entiy_list_no_items_component_1 = require("./common/entity-list/eoa-entiy-list-no-items.component");
var form_footer_component_1 = require("./form/form-footer.component");
var ad_form_component_1 = require("./entity/ad/ad-form.component");
var entity_comment_panel_component_1 = require("./entity/entity-comment-panel.component");
var filterAssociation_form_component_1 = require("./entity/filterAssociation/filterAssociation-form.component");
var filterCondition_form_component_1 = require("./entity/filterCondition/filterCondition-form.component");
var error_handler_service_1 = require("./service/error-handler.service");
var app_navbar_component_1 = require("./common/app-navbar/app-navbar.component");
var scroll_tracker_directive_1 = require("./common/directives/scroll-tracker.directive");
var productLine_form_component_1 = require("./entity/productLine/productLine-form.component");
var AppModule = (function () {
    function AppModule(injector) {
        this.injector = injector;
        base_service_1.BaseService.injector = this.injector;
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            // InMemoryWebApiModule.forRoot( InMemoryDataService ),
            app_routing_module_1.AppRoutingModule,
            forms_1.ReactiveFormsModule,
            ngx_pagination_1.NgxPaginationModule,
            ng_bootstrap_1.NgbModule.forRoot(),
        ],
        declarations: [
            app_component_1.AppComponent,
            app_navbar_component_1.AppNavbarComponent,
            app_sidebar_component_1.AppSidebarComponent,
            dashboard_component_1.DashboardComponent,
            eoa_associated_entity_component_1.EOAAssociatedEntityComponent,
            eoa_associated_comment_entity_component_1.EOAAssociatedCommentEntityComponent,
            dynamic_form_component_1.DynamicFormComponent,
            form_header_component_1.FormHeaderComponent,
            form_footer_component_1.FormFooterComponent,
            entity_list_component_1.EntityListComponent,
            ad_form_component_1.AdFormComponent,
            filterAssociation_form_component_1.FilterAssociationFormComponent,
            filterCondition_form_component_1.FilterConditionFormComponent,
            advertiser_form_component_1.AdvertiserFormComponent,
            productLine_form_component_1.ProductLineFormComponent,
            offer_form_component_1.OfferFormComponent,
            budget_form_component_1.BudgetFormComponent,
            comment_form_component_1.CommentFormComponent,
            form_field_focus_directive_1.FormFieldFocusDirective,
            form_inline_directive_1.FormInlineDirective,
            admin_page_component_1.AdminPageComponent,
            entity_audit_panel_component_1.EntityAuditPanelComponent,
            entity_comment_panel_component_1.EntityCommentPanelComponent,
            alert_closeable_1.NgbdAlertCloseable,
            ngbEOADateParserFormatter_1.NgbEOADateParserFormatterDirective,
            eoa_entiy_list_no_items_component_1.EOAEntityListNoItemsComponent,
            //
            scroll_tracker_directive_1.ScrollTrackerDirective
            // AdvertiserDetailComponent,
            // AdvertiserDetailComponent,
            // HeroSearchComponent,
            // HighlightDirective,
        ],
        providers: [
            // ** Global Services
            appData_type_1.AppData,
            fake_data_service_1.FakeDataService,
            app_service_1.AppService,
            auth_service_1.AuthService,
            logger_service_1.LoggerService,
            platform_browser_1.Title,
            // ** Global Services - Entity
            advertiser_service_1.AdvertiserService,
            offer_service_1.OfferService,
            budget_service_1.BudgetService,
            budgetAssociation_service_1.BudgetAssociationService,
            comment_service_1.CommentService,
            { provide: core_1.ErrorHandler, useClass: error_handler_service_1.ErrorHandlerService }
        ],
        entryComponents: [
            offer_form_component_1.OfferFormComponent,
            filterCondition_form_component_1.FilterConditionFormComponent
        ],
        bootstrap: [app_component_1.AppComponent],
    }),
    __metadata("design:paramtypes", [core_1.Injector])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map