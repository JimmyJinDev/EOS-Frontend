import {NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Directive} from '@angular/core';

@Directive({
  selector: '[ngbEOADateParserFormatterDirective]'
})

export class NgbEOADateParserFormatterDirective extends NgbDateParserFormatter {
  constructor() {
    super();
  };

  format(date: NgbDateStruct): string {
    if (date === null) {
      return '';
    }

    let stringDate = '';
    if (date) {
      stringDate += this._isNumber(date.month) ? this._padNumber(date.month) + '/' : '';
      stringDate += this._isNumber(date.day) ? this._padNumber(date.day) + '/' : '';
      stringDate += date.year;
    }
    console.log('stringDate ' + stringDate)
    return stringDate;
  }

  parse(value: string): NgbDateStruct {
    console.log('value ' + value);
    if (value) {
      const dateParts = value.trim().split('/');
      if (dateParts.length === 1 && this._isNumber(dateParts[0])) {
        return {year: this._toInteger(dateParts[0]), month: null, day: null};
      } else if (dateParts.length === 2 && this._isNumber(dateParts[0]) && this._isNumber(dateParts[1])) {
        return {year: this._toInteger(dateParts[1]), month: this._toInteger(dateParts[0]), day: null};
      } else if (dateParts.length === 3 && this._isNumber(dateParts[0]) && this._isNumber(dateParts[1]) && this._isNumber(dateParts[2])) {
        console.log('dateParts ' + JSON.stringify(dateParts));

        return {
          year: this._toInteger(dateParts[2]),
          month: this._toInteger(dateParts[1]),
          day: this._toInteger(dateParts[0])
        };
      }
    }
    return null;
  }

  private _isNumber(value: any): boolean {
    return !isNaN(this._toInteger(value));
  }

  private _toInteger(value: any): number {
    return parseInt(`${value}`, 10);
  }

  _padNumber(value: number): any {
    if (this._isNumber(value)) {
      return `0${value}`.slice(-2);
    } else {
      return '';
    }
  }
}
