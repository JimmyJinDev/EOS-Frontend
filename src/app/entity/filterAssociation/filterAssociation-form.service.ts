import { Injectable } from '@angular/core';
import { DropdownComponent } from '../../form/components/component-dropdown';
import { TextboxComponent } from '../../form/components/component-textbox';
import { FormControlService } from '../../form/form-control.service';
import { EntityLinkFormComponent } from '../../form/components/component-entityLink';
import { DateTimePickerComponent } from '../../form/components/component-datetimepicker';

@Injectable()
export class FilterAssociationFormService extends FormControlService {

  getFormFields(): any {

    let formFields = {

      // Main
      EffectiveDate: new DateTimePickerComponent( {
        key:      'EffectiveDate',
        label:    'Effective Date',
        required: true,
      } ),

      // Company
      AdvertiserId: new EntityLinkFormComponent( {
        key:      'AdId',
        label:    'Ad',
        required: true,
        data:     {
          entityLinkAbbr:        'ADS',
          entityLinkSuffixField: 'Name',
        },
      } ),

      Name: new TextboxComponent( {
        key:      'Name',
        label:    'Name',
        value:    '',
        min:      60,
        required: true,
      } ),

      Description: new TextboxComponent( {
        key:      'Description',
        label:    'Description',
        value:    '',
        min:      100,
        required: true,
      } ),

      ProductLineId: new DropdownComponent( {
        key:     'ProductLineId',
        label:   'Product Line',
        options: this.data.productLine,
      } ),
    }

    return formFields;
  }
}
