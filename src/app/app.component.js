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
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var offer_form_component_1 = require("./entity/offer/offer-form.component");
var app_service_1 = require("./service/app.service");
var auth_service_1 = require("./service/auth.service");
var base_service_1 = require("./service/base.service");
var budget_form_component_1 = require("./entity/budget/budget-form.component");
var filterCondition_form_component_1 = require("./entity/filterCondition/filterCondition-form.component");
var AppComponent = (function () {
    function AppComponent(titleService, router, authService, app, _changeDetectionRef) {
        this.titleService = titleService;
        this.router = router;
        this.authService = authService;
        this.app = app;
        this._changeDetectionRef = _changeDetectionRef;
        this.data = {};
        this.formSubmittedAndSaved = false;
        this.routeEntityLoaded = false;
        this.isLoggedIn = authService.isLoggedIn();
        app.loadData();
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._setEOAAssociatedEntityFormComponentValues();
        this.router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationEnd) {
                _this.title = _this._getDeepestTitle(_this.router.routerState.snapshot.root);
                _this.setTitle(_this.title);
                _this.app.setAppData('sidebarShown', false);
                _this.app.setAppData('sidebarFormShown', false);
            }
        });
        // Observable.fromEvent(this.search.nativeElement, 'keyup')
        //   .subscribe((data: KeyboardEvent) => console.log(data.key));
        /**
         * Observe sidebarShownQueued message
         * entityLink-aware
         */
        this.app.allPanelsToViewModeObserve().subscribe(function (val) {
            if (val) {
                _this.allPanelsToViewMode();
            }
        });
        /**
         * Observe formDataSavedSubject message
         */
        this.app.formDataSavedObserve().subscribe(function (val) {
            if (val) {
                _this.formDataSaved();
            }
        });
        var event = new CustomEvent('angular-ready');
        document.dispatchEvent(event);
    };
    AppComponent.prototype._setEOAAssociatedEntityFormComponentValues = function () {
        var entity_details = this.app.getAppData('entities');
        entity_details['OFF'].form_component = offer_form_component_1.OfferFormComponent;
        entity_details['BUD'].form_component = budget_form_component_1.BudgetFormComponent;
        entity_details['FIC'].form_component = filterCondition_form_component_1.FilterConditionFormComponent;
        this.app.setAppData('entities', entity_details);
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        // this._changeDetectionRef.detectChanges();
    };
    AppComponent.prototype.EOA_entityLoaded = function (state) {
        console.log('state ' + state);
        this.routeEntityLoaded = true;
    };
    AppComponent.prototype.overlayShown = function (val) {
        return (undefined === val) ?
            (!!this.app.getAppData('sidebarShown') || !!this.app.getAppData('sidebarFormShown'))
            : val;
    };
    AppComponent.prototype.formDataSaved = function () {
        this.formSubmittedAndSaved = true;
        this.app.EOA_NavigateTo('current_entity_list');
    };
    AppComponent.prototype.hideOverlays = function () {
        this.app.setAppData('sidebarShown', false);
        this.app.setAppData('sidebarFormShown', false);
    };
    AppComponent.prototype.setTitle = function (newTitle) {
        this.titleService.setTitle(newTitle);
    };
    AppComponent.prototype._getDeepestTitle = function (routeSnapshot) {
        var title = routeSnapshot.data ? routeSnapshot.data['title'] : '';
        if (routeSnapshot.firstChild) {
            title = this._getDeepestTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    };
    AppComponent.prototype.togglePanels = function ($event) {
        // console.log('$event.toElement ' + $event.toElement.className);
        switch ($event.toElement.className) {
            case 'layout-table':
            case 'panel-title':
                return;
        }
        if ($($event.toElement).closest('.panel-default').length !== 0) {
            return;
        }
        this.app.setAppData('allPanelsToViewMode', true);
        this.app.allPanelsToViewModeSubject.next(true);
    };
    AppComponent.prototype.allPanelsToViewMode = function () {
        return;
        // console.log('gaga');
        // $('.panel-card.display-mode-edit').removeClass('display-mode-edit').addClass('display-mode-view');
        // this.app.setAppData('allPanelsToViewMode', true);
    };
    return AppComponent;
}());
__decorate([
    core_1.ViewChild('search'),
    __metadata("design:type", core_1.ElementRef)
], AppComponent.prototype, "search", void 0);
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app.component.html',
        providers: [base_service_1.BaseService]
    }),
    __metadata("design:paramtypes", [platform_browser_1.Title,
        router_1.Router,
        auth_service_1.AuthService,
        app_service_1.AppService,
        core_1.ChangeDetectorRef])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map