import { Injectable } from '@angular/core';
import { DropdownComponent } from '../../form/components/component-dropdown';
import { TextboxComponent } from '../../form/components/component-textbox';
import { FormControlService } from '../../form/form-control.service';

@Injectable()
export class AdvertiserFormService extends FormControlService {

  getFormFields(): any {

    let formFields = {

      // Company
      CompanyName: new TextboxComponent( {
        key:      'CompanyName',
        label:    'Name',
        value:    '',
        required: true,
        order:    105
      } ),

      // Primary Address
      PrimaryAddressLine1: new TextboxComponent( {
        key:       'PrimaryAddressLine1',
        label:     'Address Line 1',
        type:      'text',
        maxlength: 75,
        order:     115
      } ),
      PrimaryAddressLine2: new TextboxComponent( {
        key:       'PrimaryAddressLine2',
        label:     'Address Line 2',
        type:      'text',
        maxlength: 75,
        order:     120
      } ),
      PrimaryCity:         new TextboxComponent( {
        key:       'PrimaryCity',
        label:     'City',
        type:      'text',
        rowClass:  'col-sm-3',
        maxlength: 15,
        order:     130
      } ),
      PrimaryState:        new DropdownComponent( {
        key:      'PrimaryState',
        label:    'State',
        options:  this.data.states,
        rowClass: 'col-sm-3',
        order:    140
      } ),
      PrimaryPostal:       new TextboxComponent( {
        key:       'PrimaryPostal',
        label:     'Postal Code',
        type:      'text',
        maxlength: 15,
        rowClass:  'col-sm-3',
        order:     150
      } ),
      PrimaryCountry:      new DropdownComponent( {
        key:      'PrimaryCountry',
        label:    'Country',
        options:  this.data.countries,
        rowClass: 'col-sm-3',
        order:    160
      } ),

      // Primary Contact
      PrimaryFirstName:    new TextboxComponent( {
        key:      'PrimaryFirstName',
        label:    'First Name',
        value:    '',
        rowClass: 'col-sm-3',
        order:    175
      } ),
      PrimaryLastName:     new TextboxComponent( {
        key:      'PrimaryLastName',
        label:    'Last Name',
        value:    '',
        rowClass: 'col-sm-3',
        order:    180
      } ),
      PrimaryPhone:        new TextboxComponent( {
        key:      'PrimaryPhone',
        label:    'Phone',
        value:    '',
        rowClass: 'col-sm-3',
        order:    190
      } ),
      PrimaryEmailAddress: new TextboxComponent( {
        key:      'PrimaryEmailAddress',
        label:    'Email',
        value:    '',
        rowClass: 'col-sm-3',
        order:    200
      } ),
    }

    return formFields;
  }
}
