import { Injectable } from '@angular/core';
import { DropdownComponent } from '../../form/components/component-dropdown';
import { TextboxComponent } from '../../form/components/component-textbox';
import { EntityLinkFormComponent } from '../../form/components/component-entityLink';
import { FormControlService } from '../../form/form-control.service';
import { DateTimePickerComponent } from '../../form/components/component-datetimepicker';

@Injectable()
export class OfferFormService extends FormControlService {

  getFormFields(): any {

    let formFields = {

      // Main
      EffectiveDate: new DateTimePickerComponent( {
        key:      'EffectiveDate',
        label:    'Effective Date',
        required: true,
      } ),

      // Details
      OfferName:     new TextboxComponent( {
        key:      'OfferName',
        label:    'Name',
        type:     'text',
        colClass: 'col-sm-3',
        required: true,
      } ),
      ProductLineId:  new EntityLinkFormComponent( {
        key:      'ProductLineId',
        label:    'Product Line',
        required: true,
        data:     {
          entityLinkAbbr:        'PRL',
          entityLinkSuffixField: 'ProductName',
        },
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
      HasOfferId:    new TextboxComponent( {
        key:      'HasOfferId',
        label:    'HasOffers Offer ID',
        required: true,
        order:    140,
        type:     'number'
      } ),
      OfferType:     new DropdownComponent( {
        key:      'OfferType',
        label:    'Type',
        options:  this.data.offerType,
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
