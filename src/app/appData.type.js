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
var AppData = (function () {
    function AppData() {
        this.formEntityType = '';
        this.formEntityAbbr = '';
        this.sidebarEntityType = '';
        this.sidebarEntityAbbr = '';
        this.localDataTypes = [
            // General
            'status',
            'yesNo',
            'productLine',
            'countries',
            'states',
            'primaryGoal',
            'revenueType',
            'appEntities',
            // Offer
            'offerType',
            // Budget
            'budgetType',
            'budgetInterval',
            // Ad
            'adType',
            'trackingCompletionRepeatInterval',
            'placementType',
            // FilterCondition
            'filterConditionGroup',
            'filterConditionType',
            'filterConditionOperator',
            'filterConditionValue',
        ];
        this.remoteDataTypes = [
            { name: 'statusReason', endpoint: 'statusreason' },
            { name: 'productLine', endpoint: 'productline' },
        ];
        this.dataTypes = [
            'entities',
        ];
        this.entities = {
            'ADS': {
                name: 'Ad',
                pk: 'AdId',
                associatedEntities: {
                    'ADC': {
                        bindColumn: 'AdId',
                        columns: {
                            'Id': [
                                '||EntityID||',
                            ],
                            'Description': [
                                'Description',
                            ],
                            'InternalOnly': [
                                'Internal?',
                            ],
                            'Primary?': [
                                'PrimaryCategory',
                            ],
                        }
                    },
                    'FIL': {
                        bindColumn: 'FilterId',
                        columns: {
                            'And/Or': [
                                'AndOr',
                            ],
                            'Filter Id': [
                                '||EntityID||',
                            ],
                            'Filter Name': [
                                'FilterName',
                            ],
                        }
                    }
                },
                sidebarFilterFields: [
                    'Name',
                ],
                sidebarSearchFields: {
                    text_1: 'Name',
                    text_2: 'AdType',
                }
            },
            'ADC': {
                name: 'adcategory',
                pk: 'AdCategoryId',
                appSidebarSearchable: true,
                sidebarFilterFields: [
                    'Description',
                ],
                sidebarSearchFields: {
                    text_1: 'Description',
                    text_2: 'AdCategoryId',
                }
            },
            'FIA': {
                name: 'filterassociation',
                type: 'filterassociation',
                pk: 'FilterAssociationId',
                appSidebarSearchable: true,
                sidebarFilterFields: [
                    'Name',
                    'Description',
                ],
                sidebarSearchFields: {
                    text_1: 'Name',
                    text_2: 'Description',
                },
                associatedEntities: {
                    'FIC': {
                        bindColumn: 'FilterId',
                        columns: {
                            '': [
                                [
                                    {
                                        fieldName: 'FilterConditionGroup',
                                        lookupName: 'filterConditionGroup'
                                    },
                                    '" - "',
                                    {
                                        fieldName: 'FilterConditionType',
                                        lookupName: 'filterConditionType'
                                    },
                                ],
                                'FilterConditionValue',
                            ],
                        }
                    }
                },
            },
            'FIC': {
                name: 'filter',
                pk: 'FilterConditionId',
                appSidebarSearchable: false,
                sidebarFilterFields: [
                    'FilterConditionGroup',
                    'FilterConditionType',
                ],
                sidebarSearchFields: {
                    text_1: [
                        {
                            fieldName: 'FilterConditionGroup',
                            lookupName: 'filterConditionGroup'
                        },
                    ],
                    text_2: [
                        {
                            fieldName: 'FilterConditionType',
                            lookupName: 'filterConditionType'
                        },
                    ],
                }
            },
            'FIO': {
                name: 'filterconditionoption',
                pk: 'FilterConditionOptionId',
                appSidebarSearchable: false,
                sidebarFilterFields: [
                    'FilterConditionGroup',
                    'FilterConditionType',
                ],
                sidebarSearchFields: {
                    text_1: [
                        {
                            fieldName: 'FilterConditionGroup',
                            lookupName: 'filterConditionGroup'
                        },
                    ],
                    text_2: [
                        {
                            fieldName: 'FilterConditionType',
                            lookupName: 'filterConditionType'
                        },
                    ],
                }
            },
            'ADV': {
                name: 'Advertiser',
                pk: 'AdvertiserId',
                associatedEntities: {
                    'OFF': {
                        bindColumn: 'AdvertiserId',
                        columns: {
                            'Offer Id': [
                                '||EntityID||',
                            ],
                            'HasOffers Offer Id': [
                                'HasOfferId',
                            ],
                            'Revenue Type': [
                                'RevenueType',
                            ],
                        }
                    }
                },
                sidebarFilterFields: [
                    // 'PrimaryCity',
                    'PrimaryState',
                ],
                sidebarSearchFields: {
                    text_1: 'CompanyName',
                    text_2: 'AddressCountry',
                },
            },
            'OFF': {
                name: 'Offer',
                pk: 'OfferId',
                associatedEntities: {
                    'BUA': {
                        bindColumn: 'OfferId',
                        manyToMany: true,
                        linkingEntityAbbr: 'BUD',
                        columns: {
                            'Seq': [
                                'Sequence',
                            ],
                            'Budget ID': [
                                '_BUD_BudgetId',
                            ],
                            'Budget Name': [
                                '_BUD_BudgetName',
                            ],
                            'Dates': [
                                'StartDate',
                                'EndDate',
                            ],
                            'Interval / Limit': [
                                '_BUD_Interval',
                                '_BUD_Limit',
                            ],
                            'Applicable Payout / Remaining Budget': [
                                '_BUD_ApplicablePayout',
                                '_BUD_RemainingBudget',
                            ],
                            'When Met': [
                                '_BUD_WhenMet',
                            ],
                        }
                    },
                },
                // sidebarFilterFields: [
                //   'OfferType',
                // ]
                sidebarSearchFields: {
                    text_1: 'OfferName',
                    text_2: 'ProductLineId',
                },
            },
            'BUD': {
                name: 'Budget',
                pk: 'BudgetId',
                associatedEntities: {
                    'OFF': {
                        bindColumn: 'OfferId',
                        columns: {
                            'Offer Id': [
                                '||EntityID||',
                            ],
                            'HasOffers Offer Id': [
                                'HasOfferId',
                            ],
                            'Advertiser': [
                                'AdvertiserId',
                            ],
                            'Revenue Type': [
                                'RevenueType',
                            ],
                        }
                    }
                },
                sidebarSearchFields: {
                    text_1: 'BudgetName',
                    text_2: 'ProductLineId',
                }
            },
            'COM': {
                name: 'Comment',
                appSidebarSearchable: false
            },
            'BUA': {
                name: 'BudgetAssociation',
                appSidebarSearchable: false
            },
            'PRL': {
                name: 'productline',
                pk: 'ProductLineId',
                appSidebarSearchable: false,
                sidebarFilterFields: [
                    'ProductName',
                    'Description',
                ],
                sidebarSearchFields: {
                    text_1: 'ProductName',
                    text_2: 'Description',
                }
            },
        };
        this.countries = [];
        this.states = [];
        this.dataTypes.concat(this.remoteDataTypes);
    }
    AppData.prototype.getAppEntities = function () {
        var appEntities = [];
        for (var entityItm in this.entities) {
            if (this.entities.hasOwnProperty(entityItm)) {
                appEntities.push({
                    key: entityItm,
                    value: this.entities[entityItm].name
                });
            }
        }
        return appEntities;
    };
    return AppData;
}());
AppData = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], AppData);
exports.AppData = AppData;
//# sourceMappingURL=appData.type.js.map