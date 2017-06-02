import { Injectable } from '@angular/core';
import { DropdownComponent } from '../../form/components/component-dropdown';
import { TextboxComponent } from '../../form/components/component-textbox';
import { EntityLinkFormComponent } from '../../form/components/component-entityLink';
import { FormControlService } from '../../form/form-control.service';
import { DateTimePickerComponent } from '../../form/components/component-datetimepicker';

@Injectable()
export class ProductLineFormService extends FormControlService {

  getFormFields(): any {

    let formFields = {

      // Main
      EffectiveDate: new DateTimePickerComponent( {
        key:      'EffectiveDate',
        label:    'Effective Date',
        required: true,
      } ),

      // Details
      ProductLineName:     new TextboxComponent( {
        key:      'ProductLineName',
        label:    'Name',
        type:     'text',
        colClass: 'col-sm-3',
        required: true,
      } ),
      ProductLineId: new DropdownComponent( {
        key:      'ProductLineId',
        label:    'Product Line',
        options:  this.data.productLine,
        required: true,
      } ),
      AdvertiserId:  new EntityLinkFormComponent( {
        key:      'AdvertiserId',
        label:    'Advertiser',
        required: true,
        data:     {
          entityLinkAbbr:        'ADV',
          entityLinkSuffixField: 'CompanyName',
        },
      } ),
      HasProductLineId:    new TextboxComponent( {
        key:      'HasProductLineId',
        label:    'HasProductLines ProductLine ID',
        required: true,
        order:    140,
        type:     'number'
      } ),
      ProductLineType:     new DropdownComponent( {
        key:      'ProductLineType',
        label:    'Type',
        options:  this.data.productLineType,
        required: true,
      } ),
      PrimaryGoal:   new DropdownComponent( {
        key:      'PrimaryGoal',
        label:    'Primary Goal',
        options:  this.data.primaryGoal,
        required: true,
      } ),

      // Revenue Information
      RevenueType:      new DropdownComponent( {
        key:      'RevenueType',
        label:    'Revenue Type',
        options:  this.data.revenueType,
        value:    '',
        required: true,
        order:    175
      } ),
      DefaultPayoutRpc: new TextboxComponent( {
        key:      'DefaultPayoutRpc',
        label:    'Default Payout',
        prefix:   '$',
        value:    '',
        required: true,
      } ),
      // PayoutRpcStartDate: new DateTimePickerComponent({
      //   key:      'PayoutRpcStartDate',
      //   label:    'Payout / RPC Start Date',
      //   value:    '',
      //   required: true,
      // }),
      ScrubPercentage:  new TextboxComponent( {
        key:      'ScrubPercentage',
        label:    'Scrub %',
        value:    '0',
        required: true,
      } ),
    }

    return formFields;
  }
}
