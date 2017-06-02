import { FormControlBase } from '../form-control-base';

export class GroupHeaderComponent extends FormControlBase<string> {
  controlType = 'groupHeader';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
