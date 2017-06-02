export class FormControlBase<T> {
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  maxlength: number;
  controlType: string;
  colClass: string;
  data: any;
  showClearButton: boolean;
  prefix: string;
  suffix: string;

  constructor( options: {
    value?: T,
    key?: string,
    label?: string,
    required?: boolean,
    order?: number,
    maxlength?: number;
    controlType?: string
    colClass?: string
    data?: any
    showClearButton?: boolean;
    prefix?: string;
    suffix?: string;

  } = {} ) {
    this.value           = options.value;
    this.key             = options.key || '';
    this.label           = options.label || '';
    this.required        = !!options.required;
    this.order           = options.order === undefined ? 1 : options.order;
    this.maxlength       = options.maxlength || options.maxlength;
    this.controlType     = options.controlType || '';
    this.colClass        = options.colClass || 'col-sm-12';
    this.data            = options.data || {};
    this.showClearButton = options.showClearButton || false;
    this.prefix          = options.prefix || '';
    this.suffix          = options.suffix || '';
  }
}
