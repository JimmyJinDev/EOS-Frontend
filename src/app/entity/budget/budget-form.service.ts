import { Injectable } from '@angular/core';
import { DropdownComponent } from '../../form/components/component-dropdown';
import { TextboxComponent } from '../../form/components/component-textbox';
import { EntityLinkFormComponent } from '../../form/components/component-entityLink';
import { FormControlService } from '../../form/form-control.service';
import { DateTimePickerComponent } from '../../form/components/component-datetimepicker';
import { YesNoComponent } from '../../form/components/component-yesNo';

@Injectable()
export class BudgetFormService extends FormControlService {

  getFormFields(): any {

    let formFields = {
      // Main
      EffectiveDate: new DateTimePickerComponent( {
        key:      'EffectiveDate',
        label:    'Effective Date',
        value:    '',
        required: true,
      } ),

      // Details
      BudgetName:        new TextboxComponent( {
        key:      'BudgetName',
        label:    'Name',
        type:     'text',
        colClass: 'col-sm-3',
        required: true,
      } ),
      BudgetType:        new DropdownComponent( {
        key:      'BudgetType',
        label:    'Type',
        options:  this.data.budgetType,
        required: true,
        value: '1',
      } ),
      BudgetInterval:    new DropdownComponent( {
        key:     'BudgetInterval',
        label:   'Interval',
        options: this.data.budgetInterval,
      } ),
      ProductId:         new DropdownComponent( {
        key:      'ProductId',
        label:    'Product Line',
        options:  this.data.productLine,
        required: true,
      } ),
      IsShared:          new YesNoComponent( {
        key:      'IsShared',
        options:  this.data.yesNo,
        label:    'Shared',
        value:    '2',
      } ),
      BudgetLimit:       new TextboxComponent( {
        key:      'BudgetLimit',
        label:    'Limit',
        required: true,
      } ),
      OverridePayoutRpc: new TextboxComponent( {
        key:      'OverridePayoutRpc',
        label:    'Override Payout',
        prefix:   '$',
        value:    '',
        required: true,
      } ),
      DefaultPayoutRpc:  new YesNoComponent( {
        key:      'DefaultPayoutRpc',
        label:    'Default Payout',
        value:    '1',
        options:  this.data.yesNo,
        required: true,
      } ),
    }

    return formFields;
  }
}
