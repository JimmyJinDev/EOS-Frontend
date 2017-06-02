import { FormControlBase } from '../form-control-base';

export class YesNoComponent extends FormControlBase<string> {
  controlType = 'yesNo';
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
