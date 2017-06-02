import { Injectable } from '@angular/core';
import { DropdownComponent } from '../../form/components/component-dropdown';
import { TextboxComponent } from '../../form/components/component-textbox';
import { FormControlService } from '../../form/form-control.service';
import { EntityLinkFormComponent } from '../../form/components/component-entityLink';
import { DateTimePickerComponent } from '../../form/components/component-datetimepicker';

@Injectable()
export class AdFormService extends FormControlService {

  getFormFields(): any {

    let formFields = {
      // Associated Offer
      OfferId: new EntityLinkFormComponent( {
        key:      'OfferId',
        label:    'Offer',
        required: true,
        data:     {
          entityLinkAbbr:        'OFF',
          entityLinkSuffixField: 'OfferName',
        },
      } ),

      // Main
      EffectiveDate: new DateTimePickerComponent( {
        key:      'EffectiveDate',
        label:    'Effective Date',
        value:    '',
        required: true,
      } ),

      // Details
      Name:                             new TextboxComponent( {
        key:      'Name',
        label:    'Name',
        type:     'text',
        required: true,
      } ),
      AdType:                           new DropdownComponent( {
        key:      'AdType',
        label:    'Type',
        options:  this.data.adType,
        type:     'text',
        required: true,
        order:    120
      } ),
      PlacementType:                    new DropdownComponent( {
        key:      'PlacementType',
        label:    'Placement',
        options:  this.data.placementType,
        required: true,
      } ),
      CalculatedWeight:                 new TextboxComponent( {
        key:      'CalculatedWeight',
        label:    'Calculated Weight',
        type:     'number',
        required: true,
      } ),
      CalculatedWeightOverride:         new DropdownComponent( {
        key:      'CalculatedWeightOverride',
        label:    'Override Calculated Weight?',
        options:  this.data.yesNo,
        required: true,
      } ),
      OverrideWeight:                   new TextboxComponent( {
        key:      'OverrideWeight',
        label:    'Override Weight',
        type:     'number',
        required: true,
      } ),
      DisplayPercentage:                new TextboxComponent( {
        key:      'DisplayPercentage',
        label:    'Display %',
        type:     'number',
        min:      0,
        max:      100,
        required: true,
      } ),
      DisplayStartDate:                 new DateTimePickerComponent( {
        key:      'DisplayStartDate',
        label:    'Start Date',
        value:    '',
        required: true,
      } ),
      DisplayEndDate:                   new DateTimePickerComponent( {
        key:      'DisplayEndDate',
        label:    'End Date',
        value:    '',
        required: true,
      } ),
      AdCategoryId:                     new DropdownComponent( {
        key:      'AdCategoryId',
        label:    'Category',
        options:  this.data.adCategory,
        required: true,
        data:     {
          multiple: true,
        },
      } ),
      //
      TrackingCampaignName:             new TextboxComponent( {
        key:      'TrackingCampaignName',
        label:    'Campaign Name',
        type:     'text',
        required: true,
      } ),
      TrackingAutocompletionOnClick:    new DropdownComponent( {
        key:      'TrackingAutocompletionOnClick',
        label:    'Autocompletion on Click',
        options:  this.data.yesNo,
        required: true,
        data:     {
          multiple: true,
        },
      } ),
      TrackingCompletionRepeatRate:     new TextboxComponent( {
        key:      'TrackingCompletionRepeatRate',
        label:    'Completion Repeat Rate',
        type:     'number',
        required: true,
      } ),
      TrackingCompletionRepeatInterval: new DropdownComponent( {
        key:      'TrackingCompletionRepeatInterval',
        label:    'Completion Repeat Interval',
        options:  this.data.trackingCompletionRepeatInterval,
        required: true,
      } ),
      //
      PointsPointsEarning:              new DropdownComponent( {
        key:      'PointsPointsEarning',
        label:    'Points Earning?',
        options:  this.data.yesNo,
        required: true,
      } ),
      PointsPoints:                     new TextboxComponent( {
        key:      'PointsPoints',
        label:    'Points',
        type:     'number',
        required: true,
      } ),

    }

    return formFields;
  }
}
