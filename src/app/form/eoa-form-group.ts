import { AbstractControl, AsyncValidatorFn, FormGroup, ValidatorFn } from '@angular/forms';
import { FormControlBase } from './form-control-base';
export class EOAFormGroup extends FormGroup {

  formFields: FormControlBase<any>[];

  constructor(controls: {
    [key: string]: AbstractControl;
  }, validator?: ValidatorFn, asyncValidator?: AsyncValidatorFn) {
    super(controls, validator);
  }
}
