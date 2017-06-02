import { Injectable } from '@angular/core';
import { AppService } from './app.service';
//import * as moment from 'moment';

declare var faker: any;
declare var moment: any;

@Injectable()
export class FakeDataService {
  private data: any;

  constructor() {
    this.data = {
      entities: {},
      lists:    {},
    };
    this._initListData();
  }

  createFakeData() {
    // Ads
    this.data.entities.ad = [];
    for ( let i = 1; i < 100; i++ ) {
      this.data.entities.ad.push(
        this.getFakeAd( i )
      );
    }

    // ADC
    this.data.entities.adcategory = [];
    for ( let i = 1; i < 100; i++ ) {
      this.data.entities.adcategory.push(
        this.getFakeAdCategory( i )
      );
    }

    // Filter
    this.data.entities.filter = [];
    for ( let i = 1; i < 10; i++ ) {
      this.data.entities.filter.push(
        this.getFakeFilter( i )
      );
    }

    // FilterCondition
    this.data.entities.filtercondition = [];
    for ( let i = 1; i < 2; i++ ) {
      this.data.entities.filtercondition.push(
        this.getFakeFilterCondition( i )
      );
    }

    // FilterConditionOption
    this.data.entities.filterconditionoption = [];
    // for ( let i = 1; i < 4; i++ ) {
    //   this.data.entities.filterconditionoption.push(
    //     this.getFakeFilterConditionOption( i )
    //   );
    // }

    this.data.entities.filterconditionoption = this.getFakeFilterConditionOption( 1 );

    // Advertisers
    this.data.entities.advertiser = [];
    for ( let i = 1; i < 100; i++ ) {
      this.data.entities.advertiser.push(
        this.getFakeAdvertiser( i )
      );
    }

    // Offers
    this.data.entities.offer = [];
    for ( let i = 1; i < 30; i++ ) {
      this.data.entities.offer.push(
        this.getFakeOffer( i )
      );
    }

    // Budget
    this.data.entities.budget = [];
    for ( let i = 1; i < 30; i++ ) {
      this.data.entities.budget.push(
        this.getFakeBudget( i )
      );
    }

    // Budget Association
    this.data.entities.budgetassociation = [];
    for ( let i = 1; i < 2; i++ ) {
      this.data.entities.budgetassociation.push(
        this.getFakeBudgetAssociation( i )
      );
    }

    // Comments
    this.data.entities.comment = [];
    for ( let i = 1; i < 30; i++ ) {
      this.data.entities.comment.push(
        this.getFakeComment( i )
      );
    }

    // let returnObj = _.merge(this.data.entities, this.data.lists);
    let returnObj = Object.assign( this.data.entities, this.data.lists );

    return returnObj;
  }

  getFakeAdvertiser( id?: number ) {
    let data = {
      AdvertiserId:        this._generateItemId( id ),
      StatusId:            1,
      StatusReasonId:      1,
      AdvertiserName:      'ADV_' + faker.company.companyName(),
      CompanyName:         'ADV_' + faker.company.companyName(),
      PrimaryAddressLine1: faker.address.streetAddress(),
      PrimaryAddressLine2: faker.address.secondaryAddress(),
      PrimaryCity:         faker.address.city(),
      PrimaryState:        this._getRandomFromDataset( 'states' ),
      PrimaryPostal:       faker.address.zipCode(),
      PrimaryCountry:      this._getRandomFromDataset( 'countries' ),
      //
      PrimaryFirstName:    faker.name.firstName(),
      PrimaryLastName:     faker.name.lastName(),
      PrimaryPhone:        faker.phone.phoneNumber(),
      PrimaryEmailAddress: faker.internet.email(),
      //
      CreatedBy:           faker.name.firstName() + ' ' + faker.name.lastName(),
      CreatedDate:         faker.date.past(),
      LastModifiedBy:      faker.name.firstName() + ' ' + faker.name.lastName(),
      LastModifiedDate:    faker.date.past(),
    };

    return data;
  }

  getFakeOffer( id?: number ) {
    let data = {
      OfferId:            this._generateItemId( id ),
      StatusId:           this._getRandomFromDataset( 'status' ),
      StatusReasonId:     this._getRandomFromDataset( 'statusReason' ),
      EffectiveDate:      this._formatDate( faker.date.past() ),
      //
      ProductLineId:      this._getRandomFromDataset( 'productLine' ),
      AdvertiserId:       this._getRandomFromDataset( 'advertiser', 'AdvertiserId', 2 ),
      OfferName:          'OFF_' + faker.company.companyName(),
      HasOfferId:         faker.random.number(),
      OfferType:          this._getRandomFromDataset( 'offerType' ),
      PrimaryGoal:        this._getRandomFromDataset( 'primaryGoal' ),
      RevenueType:        'RPC',
      DefaultPayoutRpc:   faker.finance.amount(),
      PayoutRpcStartDate: faker.date.past(),
      ScrubPercentage:    this._getRandomPercentage(),
      //
      CreatedBy:          faker.name.firstName() + ' ' + faker.name.lastName(),
      CreatedDate:        faker.date.past(),
      LastModifiedBy:     faker.name.firstName() + ' ' + faker.name.lastName(),
      LastModifiedDate:   faker.date.past(),
    };

    return data;
  }

  getFakeAd( id?: number ) {
    let data = {
      AdId:           this._generateItemId( id ),
      StatusId:       this._getRandomFromDataset( 'status' ),
      StatusReasonId: this._getRandomFromDataset( 'statusReason' ),

      OfferId:       this._getRandomFromDataset( 'offer', 'OfferId', 2 ),
      EffectiveDate: this._formatDate( faker.date.past() ),

      Name:                             'ADS_' + faker.commerce.productAdjective() + ' ' + faker.commerce.productName(),
      AdType:                           this._getRandomFromDataset( 'adType' ),
      PlacementType:                    this._getRandomFromDataset( 'placementType' ),
      CalculatedWeight:                 faker.random.number(),
      CalculatedWeightOverride:         this._getRandomFromDataset( 'yesNo' ),
      OverrideWeight:                   faker.random.number(),
      DisplayPercentage:                this._getRandomPercentage(),
      DisplayStartDate:                 this._formatDate( faker.date.past() ),
      DisplayEndDate:                   this._formatDate( faker.date.future() ),
      AdCategoryId:                     1,
      //
      TrackingCampaignName:             'Campaign: ' + faker.commerce.productName() + ' - ' + faker.commerce.productAdjective(),
      TrackingAutocompletionOnClick:    this._getRandomFromDataset( 'yesNo' ),
      TrackingCompletionRepeatRate:     faker.random.number(),
      TrackingCompletionRepeatInterval: this._getRandomFromDataset( 'trackingCompletionRepeatInterval' ),
      //
      PointsPointsEarning:              this._getRandomFromDataset( 'yesNo' ),
      PointsPoints:                     faker.random.number(),

      //
      CreatedBy:        1,
      CreatedDate:      faker.date.past(),
      LastModifiedBy:   1,
      LastModifiedDate: faker.date.past(),
    };

    return data;
  }

  getFakeAdCategory( id?: number ) {
    let data = {
      AdCategoryId:   this._generateItemId( id ),
      AdId:           this._generateItemId( id ),
      StatusId:       this._getRandomFromDataset( 'status' ),
      StatusReasonId: this._getRandomFromDataset( 'statusReason' ),

      Description:     'ADC_' + faker.commerce.productAdjective() + ' ' + faker.commerce.productName(),
      InternalOnly:    'No',
      PrimaryCategory: 'Yes',

      //
      CreatedBy:        faker.name.firstName() + ' ' + faker.name.lastName(),
      CreatedDate:      faker.date.past(),
      LastModifiedBy:   faker.name.firstName() + ' ' + faker.name.lastName(),
      LastModifiedDate: faker.date.past(),
    };

    return data;
  }

  getFakeFilter( id?: number ) {
    let data = {
      FilterId:          this._generateItemId( id ),
      FilterName:        'FIL_' + faker.random.word(),
      FilterDescription: faker.random.words(),

      StatusId:       this._getRandomFromDataset( 'status' ),
      StatusReasonId: this._getRandomFromDataset( 'statusReason' ),

      EffectiveDate: this._formatDate( faker.date.past() ),

      AdName:              'ADS_' + faker.commerce.productAdjective() + ' ' + faker.commerce.productName(),
      FilterAssociationId: faker.random.number(),
      ColumnName:          faker.random.word(),
      Operator:            faker.random.word(),
      Value:               faker.random.word(),
      Sequence:            faker.random.number(),
      AndOr:               this._getRandomFromDataset( 'andOr' ),
      Active:              this._getRandomFromDataset( 'yesNo' ),

      //
      CreatedBy:        faker.name.firstName() + ' ' + faker.name.lastName(),
      CreatedDate:      faker.date.past(),
      LastModifiedBy:   faker.name.firstName() + ' ' + faker.name.lastName(),
      LastModifiedDate: faker.date.past(),
    };

    return data;
  }

  getFakeFilterCondition( id?: number ) {
    let data = {
      FilterConditionId: this._generateItemId( id ),
      FilterId:          1,
      // FilterId:          this._getRandomFromDataset( 'filterAssociation' ),

      FilterConditionGroup:    this._getRandomFromDataset( 'filterConditionGroup' ),
      FilterConditionType:     this._getRandomFromDataset( 'filterConditionType' ),
      FilterConditionOperator: this._getRandomFromDataset( 'filterConditionOperator' ),
      FilterConditionValue:    this._getRandomFromDataset( 'filterConditionValue' ),

      StatusId:         this._getRandomFromDataset( 'status' ),
      StatusReasonId:   this._getRandomFromDataset( 'statusReason' ),
      //
      CreatedBy:        faker.name.firstName() + ' ' + faker.name.lastName(),
      CreatedDate:      faker.date.past(),
      LastModifiedBy:   faker.name.firstName() + ' ' + faker.name.lastName(),
      LastModifiedDate: faker.date.past(),
    };

    return data;
  }

  getFakeFilterConditionOption( id?: number ) {
    // let data = {
    //   FilterConditionOptionId: this._generateItemId( id ),
    //
    //   FilterConditionGroup: this._getRandomFromDataset( 'filterConditionGroup' ),
    //   FilterConditionType:  this._getRandomFromDataset( 'filterConditionType' ),
    //   FilterConditionValue: this._getRandomFromDataset( 'filterConditionValue' ),
    // };
    let data = [
      {
        FilterConditionOptionId: 1,
        FilterConditionGroup:    1,
        FilterConditionType:     1,
        FilterConditionValue:    '',
      },
      {
        FilterConditionOptionId: 2,
        FilterConditionGroup:    1,
        FilterConditionType:     2,
        FilterConditionValue:    '',
      },
      {
        FilterConditionOptionId: 3,
        FilterConditionGroup:    2,
        FilterConditionType:     3,
        FilterConditionValue:    '',
      },
      {
        FilterConditionOptionId: 4,
        FilterConditionGroup:    4,
        FilterConditionType:     5,
        FilterConditionValue:    '',
      },
    ];

    return data;
  }

  getFakeBudget( id?: number ) {
    let data = {
      BudgetId:          this._generateItemId( id ),
      StatusId:          this._getRandomFromDataset( 'status' ),
      StatusReasonId:    this._getRandomFromDataset( 'statusReason' ),
      EffectiveDate:     this._formatDate( faker.date.past() ),
      //
      BudgetName:        'BUD_' + faker.company.companyName(),
      BudgetType:        1,
      ProductId:         this._getRandomFromDataset( 'productLine' ),
      BudgetLimit:       1,
      BudgetInterval:    this._getRandomFromDataset( 'budgetInterval' ),
      IsShared:          1,
      DefaultPayoutRpc:  'Sample Data',
      OverridePayoutRpc: faker.finance.amount(),
      //
      CreatedBy:         faker.name.firstName() + ' ' + faker.name.lastName(),
      CreatedDate:       faker.date.past(),
      LastModifiedBy:    faker.name.firstName() + ' ' + faker.name.lastName(),
      LastModifiedDate:  faker.date.past(),
    };

    return data;
  }

  getFakeBudgetAssociation( id?: number ) {
    let data = {
      BudgetId: this._getRandomFromDataset( 'budget', 'BudgetId', 1 ),
      OfferId:  1,
      // OfferId:  this._getRandomFromDataset( 'offer', 'OfferId', 1 ),
    };

    return data;
  }

  getFakeComment( id?: number ) {

    let data = {
      id:               this._generateItemId( id ),
      statusId:         this._getRandomFromDataset( 'status' ),
      StatusReasonId:   this._getRandomFromDataset( 'statusReason' ),
      //
      Comments:         faker.lorem.paragraphs(),
      //
      CreatedBy:        faker.name.firstName() + ' ' + faker.name.lastName(),
      CreatedDate:      faker.date.past(),
      LastModifiedBy:   faker.name.firstName() + ' ' + faker.name.lastName(),
      LastModifiedDate: faker.date.past(),
    };

    return data;
  }

  getFakeStatus() {
    return [
      {
        'key':   1,
        'value': 'Active'
      },
      {
        'key':   2,
        'value': 'Inactive'
      },
    ];
  }

  getFakeStatusReason() {
    return [
      {
        'key':          1,
        'StatusId':     1,
        'StatusReason': 'New'
      },
      {
        'key':          2,
        'StatusId':     2,
        'StatusReason': 'Budget Limit Met'
      },
      {
        'key':          3,
        'StatusId':     2,
        'StatusReason': 'Terminated'
      },
      {
        'key':          4,
        'StatusId':     2,
        'StatusReason': 'Paused'
      },
      {
        'key':          5,
        'StatusId':     2,
        'StatusReason': 'Archived'
      },
    ];
  }

  getFakeProductLine() {
    return [
      {
        'key':   1,
        'value': 'FAS'
      },
      {
        'key':   2,
        'value': 'SCP'
      },
      {
        'key':   3,
        'value': 'RF'
      },
    ];
  }

  getFakeCountries() {
    let data = [
      {
        key:   1,
        value: 'USA',
      }
    ];

    for ( let i = 2; i < 5; i++ ) {
      data.push(
        {
          key:   i,
          value: faker.address.country(),
        }
      );
    }
    return data;
  }

  getFakeStates() {
    let data = [];
    for ( let i = 1; i < 5; i++ ) {
      data.push(
        {
          key:   i,
          value: faker.address.state(),
        }
      );
    }

    return data;
  }

  getFakeOfferType() {
    return [
      {
        'key':   1,
        'value': 'Product'
      },
      {
        'key':   2,
        'value': 'Service'
      },
      {
        'key':   3,
        'value': 'Survey'
      },
    ];

  }

  getFakeBudgetType() {
    return [
      {
        'key':   1,
        'value': '$ Limit'
      },
      {
        'key':   2,
        'value': 'Click Limit'
      },
    ];
  }

  getFakeBudgetInterval() {
    return [
      {
        'key':   1,
        'value': 'Day'
      },
      {
        'key':   2,
        'value': 'Week'
      },
      {
        'key':   3,
        'value': 'Month'
      },
    ];
  }

  getFakeAdType() {
    return [
      {
        'key':   1,
        'value': 'Offer Wall'
      },
      {
        'key':   2,
        'value': 'Co-Reg'
      },
      {
        'key':   3,
        'value': 'Survey'
      },
      {
        'key':   4,
        'value': 'Video'
      },
      {
        'key':   5,
        'value': 'Game'
      },
      {
        'key':   6,
        'value': 'Scholarship'
      },
      {
        'key':   7,
        'value': 'Bonus Code'
      },
    ];
  }

  getFakeTrackingCompletionRepeatInterval() {
    return [
      {
        'key':   1,
        'value': 'Ever'
      },
      {
        'key':   2,
        'value': 'Per Day'
      },
      {
        'key':   3,
        'value': 'Per Week'
      },
      {
        'key':   3,
        'value': 'Per Month'
      },
      {
        'key':   3,
        'value': 'Per Year'
      },
    ];
  }

  getFakePrimaryGoal() {
    return [
      {
        'key':   1,
        'value': 'Sales'
      },
      {
        'key':   2,
        'value': 'Views'
      },
      {
        'key':   3,
        'value': 'Downloads'
      },
      {
        'key':   4,
        'value': 'Lead Generation'
      },
    ];
  }

  getFakeRevenueType() {
    return [
      {
        'key':   'RPC',
        'value': 'RPC'
      },
      {
        'key':   'RPA',
        'value': 'RPA'
      },
      {
        'key':   'RPM',
        'value': 'RPM'
      },
      {
        'key':   'Performance',
        'value': 'Performance'
      },
    ];
  }

  getFakePlacementType() {
    return [
      {
        'key':   1,
        'value': 'Offer Wall'
      },
      {
        'key':   2,
        'value': 'Co-Reg'
      },
      {
        'key':   3,
        'value': 'Reg Path'
      },
      {
        'key':   4,
        'value': 'Exit Pop'
      },
      {
        'key':   5,
        'value': 'Email'
      },
    ];
  }

  getFakeYesNo() {
    return [
      {
        'key':   1,
        'value': 'Yes'
      },
      {
        'key':   2,
        'value': 'No'
      },
    ];
  }

  getFakeAndOr() {
    return [
      {
        'key':   1,
        'value': 'And'
      },
      {
        'key':   2,
        'value': 'Or'
      },
    ];
  }

  getFakeMatchType() {
    return [
      {
        'key':   1,
        'value': 'exact'
      },
      {
        'key':   2,
        'value': 'substring'
      },
    ];
  }

  getMatchTypeForFilterConditionItem() {
    return [
      {
        'key':   1,
        'value': 'exact'
      },
      {
        'key':   2,
        'value': 'substring'
      },
    ];
  }

  // Filters
  getFakeFilterConditionGroup() {
    return [
      {
        'key':   1,
        'value': 'User'
      },
      {
        'key':   2,
        'value': 'Visit'
      },
      // {
      //  'key':   3,
      //  'value': 'Ad'
      // },
      {
        'key':   4,
        'value': 'List'
      },
      // {
      //  'key':   5,
      //  'value': 'Placement'
      // },
    ];
  }

  getFakeFilterConditionType() {
    return [
      {
        'key':                              1,
        'value':                            'Gender',
        'filterConditionGroupId':           1,
        'filterConditionControlType':       2,
        'Labels':                           [
          'Visitor',
        ],
        'filterConditionOperatorIds':       [
          1, 2
        ],
        'filterConditionOperatorIdDefault': 1,
        'filterConditionValues':            [
          1, 2
        ],
      },
      {
        'key':                              2,
        'value':                            'Age',
        'Labels':                           [
          'Visitor\'s age',
          'and',
        ],
        'filterConditionGroupId':           1,
        'filterConditionControlType':       1,
        'filterConditionOperatorIds':       [
          3, 4, 5, 6, 7
        ],
        'filterConditionOperatorIdDefault': 3,
      },
      {
        'key':                              3,
        'value':                            'Browser / Version',
        'Labels':                           [
          'Visitor',
        ],
        'filterConditionControlType':       2,
        'filterConditionOperatorIds':       [
          1, 2
        ],
        'filterConditionOperatorIdDefault': 1,
        'filterConditionValues':            [
          3, 4
        ],
      },
      {
        'key':                              5,
        'value':                            'IP Address',
        'Labels':                           [
          'Visitor',
          'these IP address patterns:',
        ],
        'filterConditionGroupId':           4,
        'filterConditionDesc':              'Limits display of ad to visitors that match a certain IP address pattern',
        'filterConditionControlType':       1,
        'filterConditionOperatorIds':       [
          8, 9
        ],
        'filterConditionOperator2Ids':      [
          10, 11, 12, 13
        ],
        'filterConditionOperatorIdDefault': 8,
      },
    ];
  }

  getFakeFilterConditionControlType() {
    return [
      {
        'key':   1,
        'value': 'TextboxComponent'
      },
      {
        'key':   2,
        'value': 'DropdownComponent'
      },
    ];
  }

  getFakeFilterConditionOperator() {
    return [
      {
        'key':                                1,
        'value':                              'is',
        'filterConditionOperatorControlType': [ 1 ],
      },
      {
        'key':                                2,
        'value':                              'is not',
        'filterConditionOperatorControlType': [ 1 ],
      },
      {
        'key':                                3,
        'value':                              'is equal to',
        'filterConditionOperatorControlType': [ 1 ],
      },
      {
        'key':                                4,
        'value':                              'is not equal to',
        'filterConditionOperatorControlType': [ 1 ],
      },
      {
        'key':                                5,
        'value':                              'is greater than',
        'filterConditionOperatorControlType': [ 1 ],
      },
      {
        'key':                                6,
        'value':                              'is not greater than',
        'filterConditionOperatorControlType': [ 1 ],
      },
      {
        'key':                                7,
        'value':                              'is between',
        'str_glue':                           'and',
        'filterConditionOperatorControlType': [ 1, 1 ],
      },
      {
        'key':                                8,
        'value':                              'matches',
        'filterConditionOperatorControlType': [ 1 ],
      },
      {
        'key':                                9,
        'value':                              'does not match',
        'filterConditionOperatorControlType': [ 1 ],
      },
      {
        'key':                                10,
        'value':                              'Exact match',
        'filterConditionOperatorControlType': [ 1 ],
      },
      {
        'key':                                11,
        'value':                              'Regular expression match',
        'filterConditionOperatorControlType': [ 1 ],
      },
      {
        'key':                                12,
        'value':                              'CIDR Notation',
        'filterConditionOperatorControlType': [ 1 ],
      },
      {
        'key':                                13,
        'value':                              'Prefix match',
        'filterConditionOperatorControlType': [ 1 ],
      },
    ];
  }

  getFakeFilterConditionValue() {
    return [
      {
        'key':   1,
        'value': 'Male'
      },
      {
        'key':   2,
        'value': 'Female'
      },
      {
        'key':   3,
        'value': 'Firefox (any version)'
      },
      {
        'key':   4,
        'value': 'Google Chrome'
      },
    ];
  }

  //getFakeFilterConditionType() {
  //  return [
  //    {
  //      'key':   1,
  //      'value': 'cookies'
  //    },
  //    {
  //      'key':   2,
  //      'value': 'substring'
  //    },
  //  ];
  //}

  private _initListData() {
    this.data.lists.status = this.getFakeStatus();

    this.data.lists.statusreason = this.getFakeStatusReason();

    this.data.lists.productLine = this.getFakeProductLine();

    this.data.lists.primaryGoal = this.getFakePrimaryGoal();

    this.data.lists.revenueType = this.getFakeRevenueType();

    this.data.lists.placementType = this.getFakePlacementType();

    this.data.lists.yesNo = this.getFakeYesNo();

    this.data.lists.andOr = this.getFakeAndOr();

    this.data.lists.fieldGrouping = [
      {
        'key':   1,
        'value': 'short'
      },
      {
        'key':   2,
        'value': 'long'
      },
    ];

    // _Countries
    this.data.lists.countries = this.getFakeCountries();

    // _States
    this.data.lists.states = this.getFakeStates();

    // _Offer-related fields
    this.data.lists.offerType = this.getFakeOfferType();

    // _Budget-related fields
    this.data.lists.budgetType     = this.getFakeBudgetType();
    this.data.lists.budgetInterval = this.getFakeBudgetInterval();

    // Ad-related fields
    this.data.lists.adType                           = this.getFakeAdType();
    this.data.lists.placementType                    = this.getFakePlacementType();
    this.data.lists.trackingCompletionRepeatInterval = this.getFakeTrackingCompletionRepeatInterval();

    // Filter-related fields
    this.data.lists.matchType                  = this.getFakeMatchType();
    this.data.lists.filterConditionGroup       = this.getFakeFilterConditionGroup();
    this.data.lists.filterConditionType        = this.getFakeFilterConditionType();
    this.data.lists.filterConditionOperator    = this.getFakeFilterConditionOperator();
    this.data.lists.filterConditionValue       = this.getFakeFilterConditionValue();
    this.data.lists.filterConditionControlType = this.getFakeFilterConditionControlType();
  }


  private _generateItemId( id?: number ) {
    id = (undefined === id) ? faker.random.number() : id;
    return id;
  }

  private _getRandomFromDataset( datasetName: string, pk?: string, fallbackValue?: any ) {
    if ( undefined !== this.data.lists[ datasetName ] ) {
      return this.data.lists[ datasetName ][ this._getRandomArbitrary( 0, this.data.lists[ datasetName ].length - 1 ) ].key;
    }
    if ( undefined === this.data.entities[ datasetName ] ) {
      return fallbackValue;
    }
    if ( undefined === pk ) {
      pk = 'id';
    }
    let data = this.data.entities[ datasetName ][ this._getRandomArbitrary( 0, this.data.entities[ datasetName ].length - 1 ) ][ pk ];
    if ( undefined === data && undefined !== fallbackValue ) {
      return fallbackValue;
    }
    return data;
  }

  private _getRandomArbitrary( min: number, max: number ) {
    return Math.floor( Math.random() * (max - min + 1) ) + min;
  }

  private _formatDate( strDate: string ): string {
    return moment( strDate ).format( 'MM/DD/YYYY' );
  }

  private _getRandomPercentage() {
    return Math.floor( Math.random() * 100 ) + 1
  }
}
