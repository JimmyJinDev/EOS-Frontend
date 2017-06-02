import { Injectable } from '@angular/core';
import { DropdownComponent } from '../../form/components/component-dropdown';
import { TextboxComponent } from '../../form/components/component-textbox';
import { FormControlService } from '../../form/form-control.service';
import { EntityLinkFormComponent } from '../../form/components/component-entityLink';

@Injectable()
export class FilterConditionOptionFormService extends FormControlService {

  getFormFields(): any {

    let formFields = {
      // Main
      // FilterId: new EntityLinkFormComponent({
      //   key:   'FilterId',
      //   label: 'Filter',
      //   required: true,
      //   data:  {
      //     entityLinkAbbr : 'FIL',
      //     entityLinkSuffixField : 'FilterName',
      //   },
      // }),

      // Details
      // FilterConditionGroup:      new DropdownComponent( {
      //   key:      'FilterConditionGroup',
      //   label:    'Type',
      //   options:  this.data.filterConditionGroup,
      // } ),
      // FilterConditionType:      new DropdownComponent( {
      //   key:      'FilterConditionType',
      //   label:    'Type',
      //   options:  this.data.filterConditionType,
      // } ),
      // FilterConditionOperator:      new DropdownComponent( {
      //   key:      'FilterConditionOperator',
      //   label:    'Type',
      //   options:  this.data.filterConditionOperator,
      // } ),
      FilterConditionValue: new TextboxComponent( {
        key:      'FilterConditionValue',
        label:    'Name',
        type:     'text',
      } ),
    }

    return formFields;
  }
}
