import { AfterViewInit, ChangeDetectorRef, Component, Injectable, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { AppService } from '../../service/app.service';
import { EOAEntityFormComponent } from '../eoa-entity-form.component';

import { Location } from '@angular/common';
import { FilterConditionFormService } from './filterCondition-form.service';
import { FilterCondition } from './filterCondition.type';

@Component( {
  selector:      'filterCondition-form',
  templateUrl:   './filterCondition-form.component.html',
  encapsulation: ViewEncapsulation.None,
  providers:     [ FilterConditionFormService ],
} )
@Injectable()
export class FilterConditionFormComponent extends EOAEntityFormComponent implements OnInit, AfterViewInit {

  Operator: string;
  Value: string;

  text_1: string;
  text_2: string;

  filterConditionValue: any = []; // @TODO: rename to 'filterConditionValues'

  entityItm: any;

  constructor( public fs: FilterConditionFormService,
               public app: AppService,
               public route: ActivatedRoute, private router: Router,
               public location: Location,
               private _changeDetectionRef?: ChangeDetectorRef ) {
    super( fs, app, route );
  }

  ngOnInit(): void {
    this.data.entity              = new FilterCondition;
    this.data.entity_type         = FilterCondition._entity_type;
    this.data.entity_abbreviation = FilterCondition._entity_abbreviation;
    this.data.entityName          = this.app.capitalize( this.data.entity_type );

    this.app.isDataLoaded.subscribe( ( val ) => this.AppDataLoaded( val ) );

    this.fs.initFormData();

    this.entityItm = this.app.getAppData( 'sidebarFormEntity' );

    this._initForm();
  }

  private _initForm() {

    this.Operator = this._getEntityOperator();
    this.Value    = this._getEntityValue()
    this.text_1   = this._getLabels()[ 0 ]
    this.text_2   = this._getLabels()[ 1 ]

  }

  private _getEntityOperator(): any {
    if ( this.app.getAppData( 'FIC_addingNew' ) ) {
      return this.fs.OperatorGetDefault();
    } else {
      return parseInt( this.entityItm.FilterConditionOperator, 10 );
    }
  }

  private _getEntityValue(): any {
    let entityFilterConditionValues = this.fs.parseEntityItmFilterConditionValue();
    if ( undefined === entityFilterConditionValues ) {
      return '';
    }
    if ( this.hasFilterConditionLUValues() ) {
      return parseInt( entityFilterConditionValues[ 0 ], 10 );
    } else {
      let values = [];
      for ( let i = 0; i < entityFilterConditionValues.length; i++ ) {
        values[ i ] = entityFilterConditionValues[ i ];
      }
      return values;
    }
  }

  private _getLabels() {
    return this.fs.Type.Labels;
  }

  ngAfterViewInit(): void {
    this._changeDetectionRef.detectChanges();
  }

  getFilterConditionColumnData( col: any ): string {
    return this.app.getEntityData( this.app.getAppData( 'FIC_DATA' ).entity, col );
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

  updateFICValue(): void {
    let filterConditionOperatorValue = this.getFilterConditionOperatorData( parseInt( this.Operator, 10 ) );

    let FICValue = [];
    // if ( false !== filterConditionOperatorValue ) {
    //   FICValue.push( filterConditionOperatorValue.value );
    // }

    if ( this.hasFilterConditionLUValues() ) {
      FICValue.push( this.Value );
    } else {
      let fcv_list = [];
      for ( let fcv of this.Value ) {
        fcv_list.push( fcv );
      }
      FICValue.push( fcv_list.join( this.fs.getStrGlue() ) );
    }

    let entityItm = this.app.getAppData( 'FIC_DATA' ).entity;

    console.log( 'FICValue.join ' + FICValue.join( this.fs.getStrGlue() ) );

    this.form.controls[ 'FilterId' ].setValue( this.app.getAppData( 'formEntity' ).FilterId );
    this.form.controls[ 'FilterConditionGroup' ].setValue( entityItm.FilterConditionGroup );
    this.form.controls[ 'FilterConditionType' ].setValue( entityItm.FilterConditionType );
    this.form.controls[ 'FilterConditionOperator' ].setValue( this.Operator );
    this.form.controls[ 'FilterConditionValue' ].setValue( FICValue.join( this.fs.getStrGlue() ) );

    this.app.setFormDummyData( this.form );
  }

  hasFilterConditionLUValues(): boolean {
    return this.fs.choices.Values.length > 0;
  }

  isShowable( filterConditionOperatorControlTypeGroupKey: any ): boolean {
    if ( parseInt( this.Operator, 10 ) === parseInt( filterConditionOperatorControlTypeGroupKey, 10 ) ) {
      return true;
    }
    return false;
  }

  getPanelTitle() {
    return this.getFilterConditionColumnData( [ {
        fieldName:  'FilterConditionGroup',
        lookupName: 'filterConditionGroup'
      } ] )
      + ' - ' +
      this.getFilterConditionColumnData( [ {
        fieldName:  'FilterConditionType',
        lookupName: 'filterConditionType'
      } ] )
  }
}
