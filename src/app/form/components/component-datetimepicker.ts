import { FormControlBase } from '../form-control-base';

export class DateTimePickerComponent extends FormControlBase<string> {
  controlType = 'datetimepicker';
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
