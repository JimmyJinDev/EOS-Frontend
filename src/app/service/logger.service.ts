import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
  logs: any[] = []; // capture logs for testing

  log( msg: string, type?: string ) {
    this.logs.push( { type: type, msg: msg } );
    if ( undefined === type ) {
      type = 'log';
    }
    if ( type === 'MSG' ) {
      console.log( '%c%s', 'color: red; background: yellow; font-size: 11px;', `MSG: ${msg}` );
    } else {
      console[ type ]( msg );
    }
  }
}
