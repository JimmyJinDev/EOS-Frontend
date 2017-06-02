import { Injectable } from '@angular/core';
import { DropdownComponent } from '../../form/components/component-dropdown';
import { TextboxComponent } from '../../form/components/component-textbox';
import { FormControlService } from '../../form/form-control.service';
import { EntityLinkFormComponent } from '../../form/components/component-entityLink';
import { AppService } from '../../service/app.service';
import { FormBuilder } from '@angular/forms';
import { AppSettings } from '../../app-settings';

@Injectable()
export class FilterConditionFormService extends FormControlService {

  Group: any;
  Type: any;
  Operator: any = {};
  Value: any;

  choices: any = {
    Operators: {},
    Values:    {}
  };

  entityItm: any;

  constructor( public app: AppService, public fb: FormBuilder ) {
    super( app, fb );

  }

  getFormFields(): any {

    let formFields = {
      // Main
      FilterId: new EntityLinkFormComponent( {
        key:      'FilterId',
        label:    'Filter',
        required: true,
        data:     {
          entityLinkAbbr:        'FIL',
          entityLinkSuffixField: 'FilterName',
        },
      } ),

      // Details
      // FilterId: new TextboxComponent( {
      //   key:     'FilterId',
      // } ),
      FilterConditionGroup:    new DropdownComponent( {
        key:     'FilterConditionGroup',
        label:   'Group',
        options: this.data.filterConditionGroup,
      } ),
      FilterConditionType:     new DropdownComponent( {
        key:     'FilterConditionType',
        label:   'Type',
        options: this.data.filterConditionType,
      } ),
      FilterConditionOperator: new DropdownComponent( {
        key:     'FilterConditionOperator',
        label:   'Operator',
        options: this.data.filterConditionOperator,
      } ),
      FilterConditionValue:    new TextboxComponent( {
        key:   'FilterConditionValue',
        label: 'Value',
        type:  'text',
      } ),
    }

    return formFields;
  }

  public initFormData() {
    let filterConditionTypes = this.app.getAppData( 'initialDataTypes' )[ 'filterConditionType' ];

    let filterConditionOperators = [];
    let filterConditionValues    = [];
    this.entityItm               = this.app.getAppData( 'sidebarFormEntity' );

    for ( let filterConditionType of filterConditionTypes ) {
      if ( filterConditionType.key === this.entityItm.FilterConditionType ) {

        this.Type              = filterConditionType;
        this.choices.Operators = this._getFilterConditionOperators();

        if ( undefined !== filterConditionType.filterConditionValues ) {
          this.choices.Values = this._getFilterConditionValues();
        }

      }
    }
  }

  public parseEntityItmFilterConditionValue(): any {
    return this.entityItm.FilterConditionValue.toString().split( this.getStrGlue() );
  }

  public getStrGlue(): string {
    return AppSettings.VALUE_SPLIT_GLUE;
  }

  public OperatorGetDefault(): number {
    if ( undefined !== this.Type.filterConditionOperatorIdDefault ) {
      return this.Type.filterConditionOperatorIdDefault;
    }
    return 0;
  }

  private _getFilterConditionOperators(): any {

    let filterConditionOperators      = this.app.getAppData( 'initialDataTypes' )[ 'filterConditionOperator' ];
    let filterConditionOperatorValues = [];

    for ( let filterConditionOperatorKey of this.Type.filterConditionOperatorIds ) {
      for ( let filterConditionOperator of filterConditionOperators ) {
        if ( filterConditionOperator.key === filterConditionOperatorKey ) {
          filterConditionOperatorValues.push(
            {
              'key':                                filterConditionOperator.key,
              'value':                              filterConditionOperator.value,
              'filterConditionOperatorControlType': filterConditionOperator.filterConditionOperatorControlType
            },
          );
        }
      }
    }

    return filterConditionOperatorValues;
  }

  private _getFilterConditionValues(): any {
    let filterConditionValues = [];

    for ( let filterConditionValuesKey of this.Type.filterConditionValues ) {
      let filterConditionValue = this._getFilterConditionValueData( filterConditionValuesKey );
      if ( false !== filterConditionValue ) {
        filterConditionValues.push(
          {
            'key':   filterConditionValue.key,
            'value': filterConditionValue.value
          },
        );
      }
    }

    return filterConditionValues;
  }

  private _getFilterConditionOperatorControlTypes(): any {
    let appFilterConditionTypes             = this.app.getAppData( 'filterConditionControlType' )
    let filterConditionOperatorControlTypes = []
    for ( let filterConditionOperator of this.choices.Operators ) {
      filterConditionOperatorControlTypes.push(
        {
          operator_id:     filterConditionOperator.key,
          operator_fields: filterConditionOperator.filterConditionOperatorControlType
        }
      );
    }
    return filterConditionOperatorControlTypes;
  }

  _getFilterConditionValueData( filterConditionValuesKey: number ): any {
    let filterConditions = this.app.getAppData( 'initialDataTypes' )[ 'filterConditionValue' ];

    for ( let filterCondition of filterConditions ) {
      if ( filterCondition.key === filterConditionValuesKey ) {
        return filterCondition;
      }
    }

    return false;
  }

}
