import { FormControlBase } from '../form-control-base';

export class ButtonDropdownComponent extends FormControlBase<string> {
  controlType = 'buttonDropdown';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
