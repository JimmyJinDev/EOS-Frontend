import { AfterViewInit, ChangeDetectorRef, Component, Injectable, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { AppService } from '../../service/app.service';
import { EOAEntityFormComponent } from '../eoa-entity-form.component';

import { Location } from '@angular/common';
import { FilterConditionOptionFormService } from './filterConditionoption-form.service';
import { FilterCondition } from './filterCondition.type';

@Component( {
  selector:      'filterCondition-form',
  templateUrl:   './filterCondition-form.component.html',
  encapsulation: ViewEncapsulation.None,
  providers:     [ FilterConditionOptionFormService ],
} )
@Injectable()
export class FilterConditionOptionFormComponent extends EOAEntityFormComponent implements OnInit, AfterViewInit {

  filterConditionOperatorValues: any;
  filterConditionValues: any;

  filterConditionOperatorKey: string;
  filterConditionValueKey: string;

  constructor( public formControlService: FilterConditionOptionFormService,
               public app: AppService,
               public route: ActivatedRoute, private router: Router,
               public location: Location,
               private _changeDetectionRef?: ChangeDetectorRef ) {
    super( formControlService, app, route );
  }

  ngOnInit(): void {
    this.data.entity              = new FilterCondition;
    this.data.entity_type         = FilterCondition._entity_type;
    this.data.entity_abbreviation = FilterCondition._entity_abbreviation;
    this.data.entityName          = this.app.capitalize( this.data.entity_type );

    this.app.isDataLoaded.subscribe( ( val ) => this.AppDataLoaded( val ) );

    this.getFilterConditionData();
  }

  ngAfterViewInit(): void {
    this._changeDetectionRef.detectChanges();
  }

  getFilterConditionDatagetData( col: any ): string {
    return this.app.getEntityData( this.data.FIC_ENTITY_DATA.entity, col );
  }

  getFilterConditionData() {
    let filterConditionTypes     = this.app.getAppData( 'initialDataTypes' )[ 'filterConditionType' ];
    let filterConditionOperators = this.app.getAppData( 'initialDataTypes' )[ 'filterConditionOperator' ];

    let filterConditionOperatorValues = [];
    let filterConditionValues         = [];
    let entityItm                     = this.data.FIC_ENTITY_DATA.entity;

    for ( let filterConditionType of filterConditionTypes ) {
      if ( filterConditionType.filterConditionControlType === entityItm.FilterConditionType ) {
        for ( let filterConditionOperatorKey of filterConditionType.filterConditionOperatorIds ) {
          for ( let filterConditionOperator of filterConditionOperators ) {
            if ( filterConditionOperator.key === filterConditionOperatorKey ) {
              filterConditionOperatorValues.push(
                {
                  'key':   filterConditionOperator.key,
                  'value': filterConditionOperator.value
                },
              );
            }
          }
        }
        for ( let filterConditionValuesKey of filterConditionType.filterConditionValues ) {
          let filterConditionValue = this.getFilterConditionValueData( filterConditionValuesKey );
          if ( false !== filterConditionValue ) {
            filterConditionValues.push(
              {
                'key':   filterConditionValue.key,
                'value': filterConditionValue.value
              },
            );
          }
        }
      }

    }

    this.filterConditionOperatorValues = filterConditionOperatorValues;
    this.filterConditionValues         = filterConditionValues;

  }

  getFilterConditionValueData( filterConditionValuesKey: number ): any {
    let filterConditions = this.app.getAppData( 'initialDataTypes' )[ 'filterConditionValue' ];

    for ( let filterCondition of filterConditions ) {
      if ( filterCondition.key === filterConditionValuesKey ) {
        return filterCondition;
      }
    }

    return false;
  }

  getFilterConditionOperatorData( filterConditionValuesKey: number ): any {
    let filterConditions = this.app.getAppData( 'initialDataTypes' )[ 'filterConditionOperator' ];

    for ( let filterCondition of filterConditions ) {
      if ( filterCondition.key === filterConditionValuesKey ) {
        return filterCondition;
      }
    }

    return false;
  }

  updateFICValue() {
    let filterConditionValue         = this.getFilterConditionValueData( parseInt( this.filterConditionValueKey, 10 ) );
    let filterConditionOperatorValue = this.getFilterConditionOperatorData( parseInt( this.filterConditionOperatorKey, 10 ) );

    let FICValue = [];
    if ( false !== filterConditionOperatorValue ) {
      FICValue.push( filterConditionOperatorValue.value );
    }
    if ( false !== filterConditionValue ) {
      FICValue.push( filterConditionValue.value );
    }

    let entityItm = this.data.FIC_ENTITY_DATA.entity;

    this.form.controls[ 'FilterConditionGroup' ].setValue( entityItm.FilterConditionGroup );
    this.form.controls[ 'FilterConditionType' ].setValue( entityItm.FilterConditionType );
    this.form.controls[ 'FilterConditionValue' ].setValue( FICValue.join( ' ' ) );


    debugger;
  }

}
