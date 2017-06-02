import { Injectable } from '@angular/core';
import { TextboxComponent } from '../../form/components/component-textbox';
import { FormControlService } from '../../form/form-control.service';

@Injectable()
export class CommentFormService extends FormControlService {

  getFormFields(): any {

    let formFields = {
      // Main
      EffectiveDate: new TextboxComponent( {
        key:      'EffectiveDate',
        label:    'Effective Date',
        value:    '',
        required: true,
      } ),

      // Details
      CommentName:  new TextboxComponent( {
        key:      'CommentName',
        label:    'Name',
        type:     'text',
        colClass: 'col-sm-3',
      } ),
    }

    return formFields;
  }
}
