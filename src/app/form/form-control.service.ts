import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import * as _ from 'lodash';

import { AppService } from '../service/app.service';
import { EOAFormGroup } from './eoa-form-group';
import { TextboxComponent } from './components/component-textbox';
import { DropdownComponent } from './components/component-dropdown';

@Injectable()
export class FormControlService {

  data: any = {};

  constructor( public app: AppService, public fb: FormBuilder ) {
    this.app.isDataLoaded.subscribe( ( val ) => {

      if ( val === true ) {

        let data: any = this.app.getAppData( 'appDataTypes' );
        // let data: any = this.app.getAppData(this.app.getAppData('remoteDataTypes'));
        if ( undefined === data ) {
          return;
        }
        for ( let key in data ) {
          if ( !data.hasOwnProperty( key ) ) {
            return;
          }
          let value = data[ key ];
          if ( undefined === value || !value.length || key === 'entities' ) {
            return;
          }
          this.data[ key ] = this._idNameToKeyValue( value );
        }
      }
    } );
  }

  /**
   * Stub. Gets overriden by others extending this class.
   */
  getFormFields(): any {
  }

  getForm(): EOAFormGroup {
    let formFields         = this._populateFormFields();
    let form: EOAFormGroup = this._toFormGroup( formFields );
    form.formFields        = formFields;
    return form;
  }

  _toFormGroup( controls: any ): EOAFormGroup {
    let group: any = {};

    for ( let key in controls ) {
      if ( !controls.hasOwnProperty( key ) ) {
        return;
      }
      let control  = controls[ key ];
      group[ key ] = control.required ? new FormControl( control.value || '', Validators.required )
        : new FormControl( control.value || '' );
    }

    return new EOAFormGroup( group );
  }

  private _idNameToKeyValue( data: any ) {
    let keyValue: any[] = [];
    data.forEach( function ( itm: any ) {
      if ( itm.key !== undefined ) {
        keyValue.push( itm );
      } else {
        keyValue.push( { key: itm.id, value: itm.name } );
      }
    } );

    return keyValue;
  }

  private _populateFormFields() {
    let formFields: any;
    if ( this.app.getAppData( 'formEntityAbbr' ) === 'FIC' ) {
      formFields = this.getFormFields();
    } else {
      formFields = Object.assign(
        this._getStatusFields(),
        this.getFormFields(),
        this._getAuditFields()
      );
    }

    return formFields;
  }

  private _getStatusFields(): any {

    let status_fields = {
      // Status
      StatusId:       new DropdownComponent( {
        key:     'StatusId',
        label:   'Status',
        options: this.data.status,
      } ),
      StatusReasonId: new DropdownComponent( {
        key:     'StatusReasonId',
        label:   'Status Reason',
        options: this.data.statusReason,
      } ),
    }

    return status_fields;
  }

  private _getAuditFields(): any {

    let audit_fields = {
      // Audit
      CreatedDate:      new TextboxComponent( {
        key:      'CreatedDate',
        label:    'Created Date',
        value:    '',
        required: true,
      } ),
      CreatedBy:        new TextboxComponent( {
        key:      'CreatedBy',
        label:    'Created By',
        value:    '',
        required: true,
      } ),
      LastModifiedBy:   new TextboxComponent( {
        key:      'LastModifiedBy',
        label:    'Last Modified By',
        value:    '',
        required: true,
      } ),
      LastModifiedDate: new TextboxComponent( {
        key:      'LastModifiedDate',
        label:    'Last Modified Date',
        value:    '',
        required: true,
      } ),
    }

    return audit_fields;
  }
}
