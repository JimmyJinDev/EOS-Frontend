import { ErrorHandler, Injector, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule, Title } from '@angular/platform-browser';
// import { DynamicFormQuestionComponent } from './forms/dynamic-form-question.component';
// Imports for loading & configuring the in-memory web api
// ** Directives
// import { HighlightDirective } from './highlight.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// ** App Components
import { AppData } from './appData.type';
import { FormFieldFocusDirective } from './common/directives/form-field-focus.directive';
import { FormInlineDirective } from './common/directives/form-inline.directive';
import { EOAAssociatedCommentEntityComponent } from './common/eoa-associated-comment-entity/eoa-associated-comment-entity.component';
import { EOAAssociatedEntityComponent } from './common/eoa-associated-entity/eoa-associated-entity.component';
import { AppSidebarComponent } from './common/sidebar/app-sidebar.component';
import { AdvertiserFormComponent } from './entity/advertiser/advertiser-form.component';
import { EntityListComponent } from './entity/entity-list.component';
import { AdvertiserService } from './entity/advertiser/advertiser.service';
import { BudgetFormComponent } from './entity/budget/budget-form.component';
import { BudgetService } from './entity/budget/budget.service';
import { CommentFormComponent } from './entity/comment/comment-form.component';
import { CommentService } from './entity/comment/comment.service';
import { OfferFormComponent } from './entity/offer/offer-form.component';
import { OfferService } from './entity/offer/offer.service';
import { DynamicFormComponent } from './form/dynamic-form.component';
import { FormHeaderComponent } from './form/form-header.component';
// ** Services
import { AppService } from './service/app.service';
import { AuthService } from './service/auth.service';
import { BaseService } from './service/base.service';
import { LoggerService } from './service/logger.service';
import { FakeDataService } from './service/fake-data.service';
import { AdminPageComponent } from './common/admin-page.component';
import { EntityAuditPanelComponent } from './entity/entity-audit-panel.component';
import { DashboardComponent } from './dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdAlertCloseable } from './common/directives/alert-closeable';
import { BudgetAssociationService } from './entity/budgetAssociation/budgetAssociation.service';
import { NgbEOADateParserFormatterDirective } from './common/directives/ngbEOADateParserFormatter';
import { EOAEntityListNoItemsComponent } from './common/entity-list/eoa-entiy-list-no-items.component';
import { FormFooterComponent } from './form/form-footer.component';
import { AdFormComponent } from './entity/ad/ad-form.component';
import { EntityCommentPanelComponent } from './entity/entity-comment-panel.component';
import { FilterAssociationFormComponent } from './entity/filterAssociation/filterAssociation-form.component';
import { FilterConditionFormComponent } from './entity/filterCondition/filterCondition-form.component';
import { ErrorHandlerService } from './service/error-handler.service';
import { AppNavbarComponent } from './common/app-navbar/app-navbar.component';
import { ScrollTrackerDirective } from './common/directives/scroll-tracker.directive';
import { ProductLineFormComponent } from './entity/productLine/productLine-form.component';


@NgModule( {
  imports:         [
    BrowserModule,
    FormsModule,
    HttpModule,
    // InMemoryWebApiModule.forRoot( InMemoryDataService ),
    AppRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule.forRoot(),
    // BrowserAnimationsModule,
  ],
  declarations:    [
    AppComponent,
    AppNavbarComponent,
    AppSidebarComponent,
    DashboardComponent,
    EOAAssociatedEntityComponent,
    EOAAssociatedCommentEntityComponent,
    DynamicFormComponent,
    FormHeaderComponent,
    FormFooterComponent,
    EntityListComponent,
    AdFormComponent,
    FilterAssociationFormComponent,
    FilterConditionFormComponent,
    AdvertiserFormComponent,
    ProductLineFormComponent,
    OfferFormComponent,
    BudgetFormComponent,
    CommentFormComponent,
    FormFieldFocusDirective,
    FormInlineDirective,
    AdminPageComponent,
    EntityAuditPanelComponent,
    EntityCommentPanelComponent,
    NgbdAlertCloseable,
    NgbEOADateParserFormatterDirective,
    EOAEntityListNoItemsComponent,
    //
    ScrollTrackerDirective
    // AdvertiserDetailComponent,
    // AdvertiserDetailComponent,
    // HeroSearchComponent,
    // HighlightDirective,
  ],
  providers:       [
    // ** Global Services
    AppData,
    FakeDataService,
    AppService,
    AuthService,
    LoggerService,
    Title,
    // ** Global Services - Entity
    AdvertiserService,
    OfferService,
    BudgetService,
    BudgetAssociationService,
    CommentService,
    {provide: ErrorHandler, useClass: ErrorHandlerService}
  ],
  entryComponents: [
    OfferFormComponent,
    FilterConditionFormComponent
  ],
  bootstrap:       [ AppComponent ],
} )
export class AppModule {
  constructor( private injector: Injector ) {
    BaseService.injector = this.injector;
  }
}