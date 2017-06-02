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
var form_control_service_1 = require("../../form/form-control.service");
var app_service_1 = require("../../service/app.service");
var app_settings_1 = require("../../app-settings");
var EOAAssociatedEntityComponent = (function () {
    //  private router: Router;
    //  private advertiserService: AdvertiserService;
    function EOAAssociatedEntityComponent(app, fcs) {
        this.app = app;
        this.fcs = fcs;
        this._entity_type = 'advertiser';
        this.routerEntityLoaded = false;
        this.currentBool = false;
        this.searchExpanded = false;
        this.searchFieldExpandedFocusEventEmitter = new core_1.EventEmitter();
        this.tableRowHoverEventEmitter = new core_1.EventEmitter();
    }
    EOAAssociatedEntityComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.entityType = this.app.getEntityTypeFromAbbr(this.entityAbbr);
        /**
         * Observe formDataLoadedObserve message
         */
        this.app.formDataLoadedObserve().subscribe(function (val) {
            if (_this.app.getAppData('sidebarFormShown')) {
                return;
            }
            if (val) {
                _this.associatedEntityGetAll();
            }
        });
        this.app.formDataSavedObserve().subscribe(function (val) {
            if (val) {
                _this.saveEntityItemsChanges();
            }
        });
        this.app.sidebarReturnLinkObserve().subscribe(function (val) {
            if (val) {
                _this.entityLinkUpdate();
            }
        });
        this.getAssociatedEntityColumnNames();
    };
    EOAAssociatedEntityComponent.prototype.toggleParentLink = function (entityItm, $event) {
        $event.preventDefault();
        $event.stopPropagation();
        entityItm._data.toDelete = !entityItm._data.toDelete;
        entityItm._data.modified = !entityItm._data.modified;
    };
    EOAAssociatedEntityComponent.prototype.toggleSearchExpand = function () {
        this.searchExpanded = !this.searchExpanded;
        if (this.searchExpanded) {
            this.searchFieldExpandedFocusEventEmitter.emit(true);
        }
        else {
            this.query = '';
        }
    };
    EOAAssociatedEntityComponent.prototype.tableRowHover = function ($event, e_type) {
        $event.preventDefault();
        $event.stopPropagation();
        var panel_card_tools = $('.panel-heading .card-tools', $($event.target).parents().find('.panel-card'));
        if (e_type === 'out') {
            panel_card_tools.show();
            return;
        }
        panel_card_tools.hide();
    };
    EOAAssociatedEntityComponent.prototype.filterItems = function (items) {
        var _this = this;
        if (items) {
            return items.filter(function (item) {
                // debugger;
                var parent_entity_values = _this._getParentEntityValues();
                var parent_entity_result = item[parent_entity_values['field_name']] === parent_entity_values['field_value'];
                // console.log('parent_entity_values ' + JSON.stringify(parent_entity_values));
                if (_this.query) {
                    var OfferName = item.OfferName.toLowerCase();
                    var query_result = OfferName.indexOf(_this.query) >= 0;
                    return parent_entity_result && query_result;
                }
                return parent_entity_result;
            });
        }
        return items;
    };
    EOAAssociatedEntityComponent.prototype._getParentEntityValues = function () {
        return {
            field_name: this.app.getAssociatedEntityBindColumn(this.entityAbbr),
            field_value: this.app.getAppData('formEntitySingleId'),
        };
    };
    EOAAssociatedEntityComponent.prototype.sortItems = function (items) {
        var _this = this;
        if (items && this.orderProp) {
            return items
                .slice(0) // Make a copy
                .sort(function (a, b) {
                if (a[_this.orderProp] < b[_this.orderProp]) {
                    return -1;
                }
                else if ([b[_this.orderProp] < a[_this.orderProp]]) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
        }
        return items;
    };
    EOAAssociatedEntityComponent.prototype.saveEntityItemsChanges = function () {
        // this.app.setAppData('sidebarFormShown', false);
        // this.app.setAppData('sidebarShown', false);
        if (this.app.getAppData('formDataSavedObserved')) {
            // return;
        }
        this.app.setAppData('formDataSavedObserved', true);
        this.associatedEntityGetAll();
        //   .then( ( entityItems ) => {
        //     debugger;
        //     for ( let itmId in entityItems ) {
        //       if ( entityItems.hasOwnProperty( itmId ) ) {
        //         let entityItm = entityItems[ itmId ]
        //         if ( !entityItm._data.modified ) {
        //           return;
        //         }
        //         if ( entityItm._data.toDelete ) {
        //           entityItm[ this.associatedField ] = null;
        //         }
        //         //debugger;
        //         this.app.saveOne( entityItm ).then( ( result: any ) => {
        //           // entityItm._data.modified = false;
        //         } );
        //       }
        //     }
        //   }
        // );
    };
    EOAAssociatedEntityComponent.prototype.hasEntityItems = function () {
        return (undefined !== this.entityItems && this.entityItems.length !== 0);
    };
    EOAAssociatedEntityComponent.prototype.getEntityItems = function () {
        return this.filterItems(this.entityItems);
    };
    EOAAssociatedEntityComponent.prototype.associatedEntityGetAll = function () {
        var _this = this;
        if (!this._hasAssociatedEntities()) {
            return Promise.resolve(false);
        }
        if (this.app.associatedEntityIsManyToMany(this.entityAbbr)) {
            this.app.getAllJoinLinked(this.entityType)
                .then(function (entityItems) {
                if (undefined === entityItems) {
                    debugger;
                }
                _this.routerEntityLoaded = true;
                _this.entityItems = _this._processAssociatedEntities(entityItems);
                return Promise.resolve(entityItems);
            });
        }
        else {
            this.app.getAll(this.entityType)
                .then(function (entityItems) {
                if (undefined === entityItems) {
                    debugger;
                }
                _this.routerEntityLoaded = true;
                _this.entityItems = _this._processAssociatedEntities(entityItems);
                return Promise.resolve(entityItems);
            });
        }
    };
    EOAAssociatedEntityComponent.prototype._hasAssociatedEntities = function () {
        if (this.app.getAppData('sidebarFormShown')) {
            return false;
        }
        return true;
    };
    EOAAssociatedEntityComponent.prototype._processAssociatedEntities = function (entityItems) {
        var _this = this;
        if (undefined === entityItems) {
            debugger;
        }
        var processedEntityItems = [];
        entityItems.forEach(function (entityItm, key) {
            if (undefined === entityItm._data) {
                _this._processAssociatedEntitySingle(entityItm);
            }
            processedEntityItems.push(entityItm);
        });
        // if (this.entityAbbr == 'FIC') {
        //   for ( let i = 0; i < processedEntityItems.length; i++ ) {
        //     if (processedEntityItems[i].FilterConditionValue == 1) {
        //       processedEntityItems[i].FilterConditionValue = 'is Male';
        //     } else {
        //       processedEntityItems[i].FilterConditionValue = 'is Female';
        //     }
        //   }
        // }
        // if (this.entityAbbr == 'BUD') {
        //   for ( let i = 0; i < processedEntityItems.length; i++ ) {
        //     if (processedEntityItems[i].BudgetInterval == 1) {
        //       processedEntityItems[i].BudgetInterval = 'Daily';
        //     } else if ( processedEntityItems[i].BudgetInterval == 2 ) {
        //       processedEntityItems[i].BudgetInterval = 'Weekly';
        //     } else { processedEntityItems[i].BudgetInterval = 'Monthly'}
        //   }
        // }
        return processedEntityItems;
    };
    EOAAssociatedEntityComponent.prototype._processAssociatedEntitySingle = function (entityItm) {
        entityItm = this._hackEntitySingle(entityItm);
        entityItm._data = {
            toDelete: false,
            modified: false,
            entityType: this.entityType,
            entityAbbr: this.entityAbbr,
        };
        return entityItm;
    };
    EOAAssociatedEntityComponent.prototype._hackEntitySingle = function (entityItm) {
        if (undefined === this.app.getAppData('sidebarData')) {
            return entityItm;
        }
        var clickedItm = this.app.getAppData('sidebarData').entityItm;
        if (undefined === clickedItm) {
            return entityItm;
        }
        switch (this.app.getAppData('formEntityAbbr')) {
            case 'OFF':
                entityItm.BudgetName = clickedItm.BudgetName;
                break;
            case 'ADV':
                entityItm.AdvertiserId = this.app.getAppData('formEntity').AdvertiserId;
                // entityItm.OfferName = clickedItm.OfferName;
                break;
        }
        return entityItm;
    };
    EOAAssociatedEntityComponent.prototype.entityNewInSidebar = function () {
        console.log('entityNewInSidebar: this.entityAbbr ' + this.entityAbbr);
        if (this.entityAbbr === 'FIC') {
            this.app.setAppData('formDataSavedObserved', false);
            this.app.showEntityInSidebar('FIO');
            this.app.setAppData('FIC_addingNew', true);
        }
        else {
            this.app.setAppData('formDataSavedObserved', false);
            this.app.showEntityInSidebarForm(this.entityAbbr);
        }
    };
    EOAAssociatedEntityComponent.prototype.entityLinkAdd = function () {
        console.log('addEntityLink: this.entityAbbr ' + this.entityAbbr);
        if (this.entityAbbr === 'FIC') {
            this.app.setAppData('formDataSavedObserved', false);
            this.app.showEntityInSidebar('FIO');
            this.app.setAppData('FIC_addingNew', true);
            return;
        }
        var sidebarData = {
            entityLink: true,
            source: app_settings_1.AppSettings.ENTITY_LINK_FOR_EOA_ASSOCIATED_ENTITY,
        };
        this.app.setAppData('sidebarData', sidebarData);
        this.app.showEntityLink(this.entityAbbr);
    };
    EOAAssociatedEntityComponent.prototype.entityLinkUpdate = function () {
        var _this = this;
        var sidebarData = this.app.getAppData('sidebarData');
        if (sidebarData.entityLink === false) {
            return;
        }
        if (sidebarData.source !== app_settings_1.AppSettings.ENTITY_LINK_FOR_EOA_ASSOCIATED_ENTITY) {
            return;
        }
        var returnedEntityItm = this._entityLinkProcessReturnedItm(this.app.getAppData('sidebarData').entityItm);
        // @hack
        if (this.app.getAppData('formEntityAbbr') === 'ADS') {
            returnedEntityItm.AdId = this.app.getAppData('formEntity').AdId;
        }
        this.entityItems.push(this._processAssociatedEntitySingle(returnedEntityItm));
        if (this.app.getAppData('formEntityAbbr') === 'OFF') {
            this.app._getAllJoinLinkedProcess1(this.entityItems).then(function (entity_items) {
                _this.entityItems = entity_items;
            });
        }
    };
    EOAAssociatedEntityComponent.prototype._entityLinkProcessReturnedItm = function (entityItm) {
        // @hack
        if (this.app.getAppData('formEntityAbbr') === 'OFF') {
            var manyToManyItm = {
                BudgetId: entityItm.BudgetId,
                OfferId: this.app.getAppData('formEntity').OfferId,
            };
            return manyToManyItm;
        }
        return entityItm;
    };
    EOAAssociatedEntityComponent.prototype.entityOpenInSidebar = function ($event, entityItm) {
        // if ( $( $event.toElement ).closest( '.panel-default' ).hasClass( 'display-mode-edit' ) ) {
        //   $event.stopPropagation();
        //   return;
        // }
        if (this.app.getAppData('formEntityAbbr') === 'FIL') {
            this.app.setAppData('formDataSavedObserved', false);
            this.app.setAppData('sidebarFormEntityAbbr', 'FIC');
            this.app.setAppData('FIC_DATA', { entity: entityItm });
        }
        this.app.setAppData('FIC_addingNew', false);
        this.app.setAppData('formNewRecord', false);
        this.app.setAppData('sidebarFormEntity', entityItm);
        this.app.showEntityInSidebarForm(this.entityAbbr);
    };
    EOAAssociatedEntityComponent.prototype.getEntityID = function (entityItm) {
        return this.app.getFormattedEntityId(this.entityAbbr, entityItm[this.app.getEntityPk(this.entityAbbr)]);
    };
    EOAAssociatedEntityComponent.prototype.getAssociatedEntityColumnNames = function () {
        if (undefined === this.app.getAppData('entities')[this.app.getAppData('formEntityAbbr')].associatedEntities
            || undefined === this.app.getAppData('entities')[this.app.getAppData('formEntityAbbr')].associatedEntities[this.entityAbbr]) {
            return;
        }
        this.associatedEntityColumnNames = Object.keys(this.app.getAssociatedEntityColumns(this.entityAbbr));
        console.log('this.associatedEntityColumnNames ' + JSON.stringify(this.associatedEntityColumnNames));
    };
    EOAAssociatedEntityComponent.prototype.getAssociatedEntityColumnItems = function (columnName) {
        if (undefined === this.app.getAssociatedEntityColumns(this.entityAbbr)) {
            return;
        }
        var columnIDs = this.app.getAssociatedEntityColumns(this.entityAbbr)[columnName];
        for (var i = 0; i < columnIDs.length; i++) {
            var columnID = columnIDs[i];
            if (columnID.indexOf('_BUD_') !== -1) {
                columnIDs[i] = columnID.replace(this.app._getEntityLinkingToken('BUA'), '');
            }
        }
        return columnIDs;
    };
    return EOAAssociatedEntityComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], EOAAssociatedEntityComponent.prototype, "entityAbbr", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], EOAAssociatedEntityComponent.prototype, "associatedField", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], EOAAssociatedEntityComponent.prototype, "triggerSave", void 0);
EOAAssociatedEntityComponent = __decorate([
    core_1.Component({
        selector: 'eoa-associated-entity',
        templateUrl: './eoa-associated-entity.component.html',
        encapsulation: core_1.ViewEncapsulation.None,
        providers: [form_control_service_1.FormControlService],
    }),
    __metadata("design:paramtypes", [app_service_1.AppService,
        form_control_service_1.FormControlService])
], EOAAssociatedEntityComponent);
exports.EOAAssociatedEntityComponent = EOAAssociatedEntityComponent;
//# sourceMappingURL=eoa-associated-entity.component.js.map