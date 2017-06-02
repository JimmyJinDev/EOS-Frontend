import { Injectable, Injector } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AppData } from '../appData.type';

import 'rxjs/add/operator/toPromise';

import { LoggerService } from './logger.service';
import { Router } from '@angular/router';

@Injectable()
export class BaseService {

  static injector: Injector;
  //public appDataLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false);

  // private apiUrl2 = 'http://offeradmin.odata';
//  private apiUrl = 'http://localhost:1797/odata';
  // private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
  //public apiUrl = 'api';

  public dev_mode = 'iis';

  public apiUrl = '/api';

  public headers = new Headers( { 'Content-Type': 'application/json' } );

  protected http: Http;
  protected logger: LoggerService;
  protected appData: AppData;

  // public sidebar: AppSidebarModule;

  constructor( public router: Router ) {
    this.http    = BaseService.injector.get( Http );
    this.logger  = BaseService.injector.get( LoggerService );
    this.appData = BaseService.injector.get( AppData );

    // this.sidebar = BaseService.injector.get(AppSidebarModule);
  }

  public getApiUrl() {

  }

  public _getResponseValue( response: any ) {
    let responseValue = this.dev_mode !== 'jit' ? response.json() : response.json().data;

    return responseValue;
  }

  public _log( msg: string, type?: string ) {
    if ( this.logger ) {
      this.logger.log( msg, type );
    }
  }

  public MSG( msg: string ) {
    this._log( msg, 'MSG' );
  }

  public _handleError( error: any ): Promise<any> {
    if ( undefined !== error.status ) {
      if ( error.status.toString() === '404' ) {
        return Promise.resolve( undefined );
      }
      if ( error.status.toString() === '500' ) {
        // @TODO: Show error dashpop
        console.error( 'A catchable 500 error occurred', error );
        return Promise.resolve( undefined );
      }
    }
    console.error( 'An error occurred', error );
    return Promise.reject( error.message || error );
  }
}
