"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var dashboard_component_1 = require("./dashboard.component");
var entity_list_component_1 = require("./entity/entity-list.component");
var advertiser_form_component_1 = require("./entity/advertiser/advertiser-form.component");
var offer_form_component_1 = require("./entity/offer/offer-form.component");
var budget_form_component_1 = require("./entity/budget/budget-form.component");
var admin_page_component_1 = require("./common/admin-page.component");
var ad_form_component_1 = require("./entity/ad/ad-form.component");
var filterAssociation_form_component_1 = require("./entity/filterAssociation/filterAssociation-form.component");
var routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    // Home
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent, data: { title: 'Dashboard' } },
    // Ad
    { path: 'ad', component: entity_list_component_1.EntityListComponent, data: { title: 'Ad - List' } },
    { path: 'ad/new', component: ad_form_component_1.AdFormComponent, data: { title: 'Ad - New' } },
    { path: 'ad/:id', component: ad_form_component_1.AdFormComponent, data: { title: 'Ad - Details' } },
    // Filter
    { path: 'filterassociation', component: entity_list_component_1.EntityListComponent, data: { title: 'Filter - List' } },
    { path: 'filterassociation/new', component: filterAssociation_form_component_1.FilterAssociationFormComponent, data: { title: 'Filter - New' } },
    { path: 'filterassociation/:id', component: filterAssociation_form_component_1.FilterAssociationFormComponent, data: { title: 'Filter - Details' } },
    // Advertiser
    { path: 'advertiser', component: entity_list_component_1.EntityListComponent, data: { title: 'Advertiser - List' } },
    { path: 'advertiser/new', component: advertiser_form_component_1.AdvertiserFormComponent, data: { title: 'Advertiser - New' } },
    { path: 'advertiser/:id', component: advertiser_form_component_1.AdvertiserFormComponent, data: { title: 'Advertiser - Details' } },
    // Offer
    { path: 'offer', component: entity_list_component_1.EntityListComponent, data: { title: 'Offer - List' } },
    { path: 'offer/new', component: offer_form_component_1.OfferFormComponent, data: { title: 'Offer - New' } },
    { path: 'offer/:id', component: offer_form_component_1.OfferFormComponent, data: { title: 'Offer - Details' } },
    // Budget
    { path: 'budget', component: entity_list_component_1.EntityListComponent, data: { title: 'Budget - List' } },
    { path: 'budget/new', component: budget_form_component_1.BudgetFormComponent, data: { title: 'Budget - New' } },
    { path: 'budget/:id', component: budget_form_component_1.BudgetFormComponent, data: { title: 'Budget - Details' } },
    // Admin
    { path: 'admin', component: admin_page_component_1.AdminPageComponent, data: { title: 'Administration' } },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map