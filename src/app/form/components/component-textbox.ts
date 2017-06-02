import { FormControlBase } from '../form-control-base';

export class TextboxComponent extends FormControlBase<string> {
  controlType = 'textbox';
  type: string;
  datetimepicker: boolean;
  preffix: '';
  suffix: '';
  min: string;
  max: string;

  constructor( options: {} = {} ) {
    super( options );
    this.type           = options[ 'type' ] || '';
    this.datetimepicker = options[ 'datetimepicker' ] || false;
    this.preffix        = options[ 'preffix' ] || '';
    this.suffix         = options[ 'suffix' ] || '';
    this.min            = options[ 'min' ] || '';
    this.max            = options[ 'max' ] || '';
  }
}
