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
var eoa_entity_form_component_1 = require("../../entity/eoa-entity-form.component");
var form_control_service_1 = require("../../form/form-control.service");
var app_service_1 = require("../../service/app.service");
var app_sidebar_form_service_1 = require("./app-sidebar-form.service");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var AppSidebarComponent = (function (_super) {
    __extends(AppSidebarComponent, _super);
    function AppSidebarComponent(formControlService, app, router, _componentFactoryResolver, viewContainerRef, componentFactoryResolver, compiler) {
        var _this = _super.call(this, formControlService, app) || this;
        _this.formControlService = formControlService;
        _this.app = app;
        _this.router = router;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this.viewContainerRef = viewContainerRef;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.compiler = compiler;
        _this.order_prop_values = [
            {
                key: 'name',
                value: 'Alphabetical',
            },
            {
                key: 'date',
                value: 'Date',
            },
        ];
        _this.orderDirection = 'asc';
        _this.sidebarFormShown = false;
        _this.routerEntityLoaded = false;
        _this.areEntityItemsLoaded = new BehaviorSubject_1.BehaviorSubject(_this._areEntityItemsLoaded());
        _this.searchFieldExpanded = true;
        _this.appSidebarFiltersCollapsed = true;
        _this.filterConditionsShown = false;
        _this.filterList = [];
        _this.displayGrouped = '0';
        return _this;
    }
    AppSidebarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.app.setAppData('sidebarEntityAbbr', this.app.getAppData('formEntityAbbr'));
        this.app.setAppData('sidebarEntityType', this.app.getAppData('formEntityType'));
        /**
         * Observe formDataLoadedObserve message
         */
        this.app.formDataLoadedObserve().subscribe(function (val) {
            if (val) {
                console.log('formDataLoadedObserve');
                if (!_this.app.getAppData('sidebarFormShown')) {
                    _this.AppDataLoaded(val, true);
                    _this._initSidebar();
                }
            }
        });
        /**
         * Observe sidebarShownQueued message
         * entityLink-aware
         */
        this.app.sidebarShownQueuedObserve().subscribe(function (val) {
            if (val) {
                console.log('sidebarShownQueuedObserve');
                _this.app.setAppData('sidebarShown', true);
                _this.app.setAppData('sidebarShownQueued', false);
                _this.app.setAppData('sidebarFormShown', false);
                // this._initSidebar();
                _this.showFilterConditions();
            }
        });
        /**
         * Observe sidebarEntityLinkQueued message
         * entityLink-aware
         */
        this.app.sidebarEntityLinkQueuedObserve().subscribe(function (val) {
            if (val) {
                console.log('sidebarEntityLinkQueuedObserve');
                _this.app.setAppData('sidebarEntityLinkQueued', false);
                _this.app.setAppData('sidebarShown', true);
                _this.app.setAppData('sidebarFormShown', false);
                _this.entityLinkRequested();
            }
        });
        /**
         * Observe sidebarEntityLinkQueued message
         * entityLink-aware
         */
        this.app.sidebarEntityLinkFormQueuedObserve().subscribe(function (val) {
            if (val) {
                console.log('sidebarEntityLinkFormQueuedObserve');
                _this.app.setAppData('sidebarEntityLinkFormQueued', false);
                _this.app.setAppData('sidebarFormShown', true);
                _this.app.setAppData('sidebarShown', false);
                _this._initSidebarForm();
                // this.entityLinkFormRequested();
            }
        });
        /**
         * Observe sidebarFormShownQueued message
         * entityLink-aware
         */
        this.app.sidebarFormShownQueuedObserve().subscribe(function (val) {
            if (val) {
                console.log('sidebarFormShownQueuedObserve');
                if (undefined === _this.sidebarFormInline) {
                    return;
                }
                _this.app.setAppData('sidebarFormShown', true);
                _this.app.setAppData('sidebarFormShownQueued', false);
                _this.app.setAppData('sidebarShown', false);
                _this._initSidebarForm();
            }
        });
        /**
         * Observe sidebarFormShownQueued message
         * entityLink-aware
         */
        this.app.sidebarHideQueuedObserve().subscribe(function (val) {
            if (val) {
                _this.hideSidebar();
            }
        });
        /**
         * Observe formDataSavedObserve message
         */
        this.app.formDataSavedObserve().subscribe(function (val) {
            if (val) {
                console.log('formDataSavedObserve');
                _this.app.setAppData('sidebarFormShown', false);
            }
        });
    };
    AppSidebarComponent.prototype.ngAfterViewInit = function () {
        //  if (this.app.getAppData('sidebarShown') === true) {
        //    this._initSidebarForm();
        //  }
    };
    AppSidebarComponent.prototype.hideSidebar = function () {
        this.app.setAppData('sidebarFormShown', false);
        this.app.setAppData('sidebarShown', false);
        this.app.setAppData('sidebarHideQueued', false);
    };
    AppSidebarComponent.prototype._initSidebarForm = function () {
        this.routerEntityLoaded = true;
        this.areEntityItemsLoaded.next(true);
        if (this.cmpRef) {
            // when the `type` input changes we destroy a previously
            // created component before creating the new one
            this.cmpRef.destroy();
        }
        // if ( typeof this.sidebarFormComponent !== 'function' ) {
        this.sidebarFormComponent = this.app.getAppData('entities')[this.app.getAppData('sidebarFormEntityAbbr')].form_component;
        // }
        var factory = this._componentFactoryResolver.resolveComponentFactory(this.sidebarFormComponent);
        this.cmpRef = this.sidebarFormInline.createComponent(factory);
        var formInstance = this.cmpRef.instance;
        var formEntitySingle = this.app.getAppData('formEntity');
        formInstance.data.entitySingle['AdvertiserId'] = formEntitySingle[this.app.getEntityPk(this.app.getAppData('formEntityAbbr'))];
        if (this.isFIC()) {
            this.app.setAppData('sidebarFormEntity', this.app.getAppData('FIC_DATA').entity);
            formInstance.data.FIC_ENTITY_DATA = this.app.getAppData('FIC_DATA');
        }
        // to access the created instance use
        // this.compRef.instance.someProperty = 'someValue';
        // this.compRef.instance.someOutput.subscribe(val => doSomething());
    };
    AppSidebarComponent.prototype._initSidebar = function () {
        this._initFilters();
        this.updateEntityItems();
        // this._initSidebarForm();
        this.areEntityItemsLoaded.subscribe(function (val) {
            if (!val) {
                //        console.log('updating entity items...');
            }
        });
        this.form.controls['AppEntities'].setValue(this.app.getAppData('sidebarEntityAbbr'));
    };
    AppSidebarComponent.prototype._initFilters = function () {
        this.entitySidebarSearchFields = this.app.getEntitySidebarFilterFields(this.app.getAppData('sidebarEntityAbbr'));
        console.log('entitySidebarSearchFields ' + JSON.stringify(this.entitySidebarSearchFields));
    };
    AppSidebarComponent.prototype.getFormField = function (sidebarSearchField) {
        console.log('sidebarSearchField ' + sidebarSearchField);
        return this.formFields[sidebarSearchField];
    };
    AppSidebarComponent.prototype.entityGoTo = function ($event, entityItm) {
        this.app.stopEventPropagation($event);
        if (this.filterConditionsShown) {
            this.app.openFilterCondition(entityItm);
            return;
        }
        var sidebarData = this.app.getAppData('sidebarData');
        if (undefined !== sidebarData && undefined !== sidebarData.entityLink && sidebarData.entityLink === true) {
            this.entityReturnLink(entityItm);
            return;
        }
        this.entityNavigateTo(entityItm);
    };
    AppSidebarComponent.prototype.entityNavigateTo = function (entityItm) {
        this.selectedEntity = entityItm;
        var entityId = this.selectedEntity[this.app.getEntityPk(this.app.getAppData('sidebarEntityAbbr'))];
        this.router.navigate(['/' + this.app.getAppData('sidebarEntityType') + '/', entityId]);
        this.app.setAppData('sidebarShown', false);
    };
    AppSidebarComponent.prototype.showFilterConditions = function () {
        this.routerEntityLoaded = true;
        this.areEntityItemsLoaded.next(true);
        // console.log('sidebarEntityType '  + this.app.getAppData( 'sidebarEntityType' ));
        this.updateEntityItems(this.app.getAppData('sidebarEntityType'), true);
        this._focusOnSearchTextBox();
    };
    AppSidebarComponent.prototype._focusOnSearchTextBox = function () {
        if (undefined !== this.search_text_box
            && undefined !== this.search_text_box.nativeElement) {
            this.search_text_box.nativeElement.focus();
        }
    };
    /**
     * entityLink-aware
     */
    AppSidebarComponent.prototype.entityLinkRequested = function () {
        this.updateEntityItems(this.app.getAppData('sidebarEntityType'), true);
        this.query = this.app.getAppData('sidebarData').query;
        this._focusOnSearchTextBox();
    };
    /**
     * entityLink-aware
     */
    AppSidebarComponent.prototype.entityLinkFormRequested = function () {
    };
    /**
     * entityLink-aware
     * @param entityItm
     */
    AppSidebarComponent.prototype.entityReturnLink = function (entityItm) {
        var sidebarData = this.app.getAppData('sidebarData');
        sidebarData.entityItm = entityItm;
        this.app.setAppData('sidebarReturnLinkQueued', true);
        this.app.setAppData('sidebarData', sidebarData);
        this.app.sidebarReturnLinkSubject.next(true);
        this.app.setAppData('sidebarShown', false);
    };
    AppSidebarComponent.prototype.getGroupedEntityItems = function () {
        return this.groupItems(this.getEntityItems());
    };
    AppSidebarComponent.prototype.getEntityItems = function () {
        return this.sortItems(this.filterItems(this._entityItems));
    };
    Object.defineProperty(AppSidebarComponent.prototype, "entityItems", {
        get: function () {
            return this.sortItems(this.filterItems(this._entityItems));
        },
        enumerable: true,
        configurable: true
    });
    // @TODO: Upgrade to an observable
    AppSidebarComponent.prototype.updateEntityItems = function (entityType, showSidebar) {
        var _this = this;
        this._entityItems = [];
        this.areEntityItemsLoaded.next(false);
        if (undefined === entityType) {
            entityType = this.app.getAppData('formEntityType');
        }
        this.app.setAppData('sidebarEntityType', entityType);
        this.filterConditionsShown = false;
        if (this.app.getEntityAbbrFromType(entityType) === 'FIO') {
            this.filterConditionsShown = true;
        }
        this.app.getAll(entityType)
            .then(function (entityItems) {
            _this.routerEntityLoaded = true;
            _this.areEntityItemsLoaded.next(true);
            _this._entityItems = entityItems;
            if (showSidebar) {
                _this.app.setAppData('sidebarShownQueued', false);
                _this.app.setAppData('sidebarShown', true);
            }
            _this.form.valueChanges.subscribe(function (data) { return _this._formChanges(data); });
        });
    };
    AppSidebarComponent.prototype._formChanges = function (data) {
        if (this.app.getAppData('sidebarEntityAbbr') !== data.AppEntities) {
            this.app.setAppData('sidebarEntityAbbr', data.AppEntities);
            this.app.setAppData('sidebarEntityType', this.app.getEntityTypeFromAbbr(data.AppEntities));
            this.updateEntityItems(this.app.getEntityTypeFromAbbr(data.AppEntities));
        }
        else {
            this.filterItems();
        }
    };
    AppSidebarComponent.prototype.showEntity = function (entityType, filterData) {
        if (entityType !== this.app.getAppData('sidebarEntityType')) {
            this.updateEntityItems(entityType);
        }
        this.query = filterData.query;
    };
    AppSidebarComponent.prototype.filterItems = function (items) {
        var _this = this;
        //debugger;
        if (undefined === items) {
            items = this._entityItems;
        }
        if (undefined === items) {
            // this.updateEntityItems();
            return;
        }
        return items.filter(function (entityItm) {
            var entity_pk = _this.app.getEntityPk(_this.app.getAppData('sidebarEntityAbbr'));
            var entity_field1 = _this.app.getAppData('entities')[_this.app.getAppData('sidebarEntityAbbr')].sidebarSearchFields.text_1;
            var group_field = _this.FICGroup;
            if (undefined === entity_pk || undefined === entityItm[entity_pk]) {
                return;
            }
            var found1 = true, found2 = true, found3 = true, found4 = true;
            if (_this.query) {
                var searchField1 = entityItm[entity_pk].toString();
                found1 = searchField1.indexOf(_this.query) >= 0;
                var searchField2 = entityItm[entity_field1].toString().toLowerCase();
                found2 = searchField2.indexOf(_this.query.toString().toLowerCase()) >= 0;
            }
            found3 = _this._filterByField(entityItm);
            if (_this.isFIC()) {
                var FICGroup = _this.getFICGroup();
                // console.log('ficgroup ' + this.getFICGroup())
                if (FICGroup !== 0) {
                    found4 = entityItm['FilterConditionGroup'] === FICGroup;
                }
            }
            return (found1 || found2) && found3 && found4;
        });
    };
    AppSidebarComponent.prototype._filterByField = function (entityItm) {
        // @TODO: Dynamic multiple field filter.
        var found3 = true;
        var field_to_search = 'PrimaryState';
        if (this.form.controls[field_to_search].value.length !== 0) {
            // debugger;
            if (undefined === entityItm[field_to_search] || null === entityItm[field_to_search]) {
                return false;
            }
            var searchField3 = entityItm[field_to_search].toString();
            found3 = searchField3 === this.form.controls[field_to_search].value;
        }
        return found3;
    };
    AppSidebarComponent.prototype.sortItems = function (items) {
        return items;
        // if ( items && this.orderProp ) {
        //   return _.orderBy( items, this.orderProp, this.orderDirection );
        // }
    };
    AppSidebarComponent.prototype.groupItems = function (items) {
        var _this = this;
        return _(this._entityItems)
            .groupBy(function (x) { return x.FilterConditionGroup; })
            .map(function (value, key) { return ({
            Group: _this.app.getFilterConditionGroupFromId(_.toInteger(key)),
            Items: value
        }); }).value();
    };
    AppSidebarComponent.prototype._groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };
    ;
    /**
     * @deprecated since v1.2.0
     */
    AppSidebarComponent.prototype.getSidebarState = function () {
        return this.getSidebarShown();
    };
    /**
     * @deprecated since v1.2.0
     */
    AppSidebarComponent.prototype.getSidebarFormState = function () {
        return this.getSidebarFormShown();
    };
    AppSidebarComponent.prototype.getSidebarShown = function () {
        return this.app.getAppData('sidebarShown');
    };
    AppSidebarComponent.prototype.getSidebarFormShown = function () {
        return this.app.getAppData('sidebarFormShown');
    };
    AppSidebarComponent.prototype._areEntityItemsLoaded = function () {
        if (undefined === this._entityItems) {
            return false;
        }
        return !!this._entityItems.length;
    };
    // @TODO: Move to component
    AppSidebarComponent.prototype.searchFieldExpandedClass = function () {
        return ((this.query === '' || undefined === this.query) ? 'fa-search' : 'fa-remove');
    };
    AppSidebarComponent.prototype.toggleSearchExpand = function () {
        if (this.query !== '') {
            this.query = '';
        }
        this.search_text_box.nativeElement.focus();
    };
    AppSidebarComponent.prototype.getEntitySidebarFields = function (entityItm) {
        if (undefined === this.app.getAppData('sidebarEntityAbbr')) {
            return;
        }
        var currSidebarFields = this.app.getAppData('entities')[this.app.getAppData('sidebarEntityAbbr')].sidebarSearchFields;
        return {
            text_1: currSidebarFields.text_1,
            text_2: currSidebarFields.text_2,
        };
    };
    AppSidebarComponent.prototype.getEntityID = function (entityItm) {
        var entityAbbr = this.app.getAppData('sidebarEntityAbbr');
        return this.app.getFormattedEntityId(entityAbbr, entityItm[this.app.getEntityPk(entityAbbr)]);
    };
    AppSidebarComponent.prototype.clearFilterValue = function (filterId) {
        this.form.controls[filterId].setValue('');
    };
    AppSidebarComponent.prototype.isFIC = function () {
        return this.app.getAppData('sidebarEntityAbbr') === 'FIO';
    };
    AppSidebarComponent.prototype.getFICGroup = function () {
        return _.toInteger(this.FICGroup);
    };
    AppSidebarComponent.prototype.getOrderPropValue = function () {
        return 'Name / Desc';
    };
    AppSidebarComponent.prototype.getEntityClass = function () {
        return 'entity-type-' + this.app.getAppData('sidebarEntityType');
    };
    return AppSidebarComponent;
}(eoa_entity_form_component_1.EOAEntityFormComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", BehaviorSubject_1.BehaviorSubject)
], AppSidebarComponent.prototype, "isAppLoaded", void 0);
__decorate([
    core_1.ViewChild('searchTextBox'),
    __metadata("design:type", core_1.ElementRef)
], AppSidebarComponent.prototype, "search_text_box", void 0);
__decorate([
    core_1.ViewChild('sidebarBody'),
    __metadata("design:type", core_1.ElementRef)
], AppSidebarComponent.prototype, "sidebarBodyRef", void 0);
__decorate([
    core_1.ViewChild('sidebarFormContainer', { read: core_1.ViewContainerRef }),
    __metadata("design:type", core_1.ViewContainerRef)
], AppSidebarComponent.prototype, "sidebarFormInline", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], AppSidebarComponent.prototype, "entityList", void 0);
AppSidebarComponent = __decorate([
    core_1.Component({
        selector: 'app-sidebar',
        templateUrl: './app-sidebar.component.html',
        encapsulation: core_1.ViewEncapsulation.None,
        providers: [form_control_service_1.FormControlService, app_sidebar_form_service_1.AppSidebarFormService],
        inputs: ['entityList'],
    }),
    core_1.Injectable(),
    __metadata("design:paramtypes", [app_sidebar_form_service_1.AppSidebarFormService,
        app_service_1.AppService, router_1.Router,
        core_1.ComponentFactoryResolver,
        core_1.ViewContainerRef,
        core_1.ComponentFactoryResolver, core_1.Compiler])
], AppSidebarComponent);
exports.AppSidebarComponent = AppSidebarComponent;
//# sourceMappingURL=app-sidebar.component.js.map