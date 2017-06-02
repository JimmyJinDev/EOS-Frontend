import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { EntityListComponent } from './entity/entity-list.component';
import { AdvertiserFormComponent } from './entity/advertiser/advertiser-form.component';
import { OfferFormComponent } from './entity/offer/offer-form.component';
import { BudgetFormComponent } from './entity/budget/budget-form.component';
import { AdminPageComponent } from './common/admin-page.component';
import { AdFormComponent } from './entity/ad/ad-form.component';
import { FilterAssociationFormComponent } from './entity/filterAssociation/filterAssociation-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // Home
  { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },

  // Ad
  { path: 'ad', component: EntityListComponent, data: { title: 'Ad - List' } },
  { path: 'ad/new', component: AdFormComponent, data: { title: 'Ad - New' } },
  { path: 'ad/:id', component: AdFormComponent, data: { title: 'Ad - Details' } },

  // Filter
  { path: 'filterassociation', component: EntityListComponent, data: { title: 'Filter - List' } },
  { path: 'filterassociation/new', component: FilterAssociationFormComponent, data: { title: 'Filter - New' } },
  { path: 'filterassociation/:id', component: FilterAssociationFormComponent, data: { title: 'Filter - Details' } },

  // Advertiser
  { path: 'advertiser', component: EntityListComponent, data: { title: 'Advertiser - List' } },
  { path: 'advertiser/new', component: AdvertiserFormComponent, data: { title: 'Advertiser - New' } },
  { path: 'advertiser/:id', component: AdvertiserFormComponent, data: { title: 'Advertiser - Details' } },

  // Offer
  { path: 'offer', component: EntityListComponent, data: { title: 'Offer - List' } },
  { path: 'offer/new', component: OfferFormComponent, data: { title: 'Offer - New' } },
  { path: 'offer/:id', component: OfferFormComponent, data: { title: 'Offer - Details' } },

  // Budget
  { path: 'budget', component: EntityListComponent, data: { title: 'Budget - List' } },
  { path: 'budget/new', component: BudgetFormComponent, data: { title: 'Budget - New' } },
  { path: 'budget/:id', component: BudgetFormComponent, data: { title: 'Budget - Details' } },

  // Admin
  { path: 'admin', component: AdminPageComponent, data: { title: 'Administration' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
