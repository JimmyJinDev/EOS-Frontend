import { Injectable } from '@angular/core';
import { EOAEntity } from './entity/eoa-entity.type';
import { OfferFormComponent } from './entity/offer/offer-form.component';

@Injectable()
export class AppData {

  formEntity: EOAEntity;
  formEntityType = '';
  formEntityAbbr = '';
  sidebarEntityType = '';
  sidebarEntityAbbr = '';

  localDataTypes: any[] = [
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

  remoteDataTypes: any[] = [
    { name: 'statusReason', endpoint: 'statusreason' },
    { name: 'productLine', endpoint: 'productline' },
  ];
  dataTypes: any[] = [
    'entities',
  ];

  entities: any = {
    'ADS': {
      name: 'Ad',
      pk: 'AdId',
      associatedEntities: {
        'ADC' : {
          bindColumn: 'AdId',
          columns: {
            'Id' : [
              '||EntityID||',
            ],
            'Description' : [
              'Description',
            ],
            'InternalOnly' : [
              'Internal?',
            ],
            'Primary?' : [
              'PrimaryCategory',
            ],
          }
        },
        'FIL' : {
          bindColumn: 'FilterId',
          columns: {
            'And/Or' : [
              'AndOr',
            ],
            'Filter Id' : [
              '||EntityID||',
            ],
            'Filter Name' : [
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
                  fieldName:  'FilterConditionGroup',
                  lookupName: 'filterConditionGroup'
                },
                '" - "',
                {
                  fieldName:  'FilterConditionType',
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
            fieldName:  'FilterConditionGroup',
            lookupName: 'filterConditionGroup'
          },
        ],
        text_2: [
          {
            fieldName:  'FilterConditionType',
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
            fieldName:  'FilterConditionGroup',
            lookupName: 'filterConditionGroup'
          },
        ],
        text_2: [
          {
            fieldName:  'FilterConditionType',
            lookupName: 'filterConditionType'
          },
        ],
      }
    },
    'ADV': {
      name: 'Advertiser',
      pk: 'AdvertiserId',
      associatedEntities: {
        'OFF' : {
          bindColumn: 'AdvertiserId',
          columns: {
            'Offer Id' : [
              '||EntityID||',
            ],
            'HasOffers Offer Id' : [
              'HasOfferId',
            ],
            'Revenue Type' : [
              'RevenueType',
            ],
          }
        }
      },
      sidebarFilterFields: [
        // 'PrimaryCity',
        'PrimaryState',
        // 'PrimaryCountry',
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
        'BUA' : {
          bindColumn: 'OfferId',
          manyToMany : true,
          linkingEntityAbbr: 'BUD',
          columns: {
            'Seq' : [
              'Sequence',
            ],
            'Budget ID' : [
              '_BUD_BudgetId',
            ],
            'Budget Name' : [
              '_BUD_BudgetName',
            ],
            'Dates' : [
              'StartDate',
              'EndDate',
            ],
            'Interval / Limit' : [
              '_BUD_Interval',
              '_BUD_Limit',
            ],
            'Applicable Payout / Remaining Budget' : [
              '_BUD_ApplicablePayout',
              '_BUD_RemainingBudget',
            ],
            'When Met' : [
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
        'OFF' : {
          bindColumn: 'OfferId',
          columns: {
            'Offer Id' : [
              '||EntityID||',
            ],
            'HasOffers Offer Id' : [
              'HasOfferId',
            ],
            'Advertiser' : [
              'AdvertiserId',
            ],
            'Revenue Type' : [
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

  countries: any[] = [];
  states: any[] = [];

  constructor() {
    this.dataTypes.concat(this.remoteDataTypes);
  }

  getAppEntities() {
    let appEntities = [];
    for (let entityItm in this.entities) {
      if (this.entities.hasOwnProperty(entityItm)) {
        appEntities.push({
          key: entityItm,
          value: this.entities[entityItm].name
        });
      }
    }
    return appEntities;
  }
}
