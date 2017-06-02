import { FormControlBase } from '../form-control-base';

export class EntityLinkFormComponent extends FormControlBase<string> {
  controlType = 'entityLink';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
