import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BaseService } from './base.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { FakeDataService } from './fake-data.service';
import { Location } from '@angular/common';

declare var _: any;
declare var moment: any;

@Injectable()
export class AppService extends BaseService {

  public appDataLoaded: number;
  public data: {
    entityService: {},
    formEntitySingleId: number
  };

  isDataLoaded = new BehaviorSubject<boolean>( this.hasData() );

  public entity_type?: string;

  public allPanelsToViewModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.allPanelsToViewModeQuery()
  );

  /**
   * Main Form Events
   * @type {BehaviorSubject<boolean>}
   */
  private formDataLoadedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.formDataLoadedQuery()
  );
  public formDataSavedSubject: BehaviorSubject<boolean>   = new BehaviorSubject<boolean>( // @TODO: Move to private
    this.formDataSavedQuery()
  );

  /**
   * Sidebar Events
   * @type {BehaviorSubject<boolean>}
   */
  public sidebarEntityLinkQueuedSubject: BehaviorSubject<boolean>     = new BehaviorSubject<boolean>(
    this.sidebarEntityLinkQueuedQuery()
  );
  public sidebarEntityLinkFormQueuedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.sidebarEntityLinkFormQueuedQuery()
  );
  public sidebarShownQueuedSubject: BehaviorSubject<boolean>          = new BehaviorSubject<boolean>(
    this.sidebarShowQueuedQuery()
  );
  public sidebarFormShownQueuedSubject: BehaviorSubject<boolean>      = new BehaviorSubject<boolean>(
    this.sidebarFormShowQueuedQuery()
  );
  public sidebarHideQueuedSubject: BehaviorSubject<boolean>           = new BehaviorSubject<boolean>(
    this.sidebarHideQueuedQuery()
  );
  public sidebarReturnLinkSubject: BehaviorSubject<boolean>           = new BehaviorSubject<boolean>(
    this.sidebarReturnLinkQuery()
  );

  public fakeData: FakeDataService;

  public appAlertMessage: string;
  public successMessage = new Subject<string>();

  constructor( public router: Router,
               public location?: Location ) {
    super( router );

    this.isDataLoaded.next( false );

    this.fakeData = new FakeDataService;

    this.setPanels();
  }

  setPanels() {
    let panels = {
      offer: {
        edit_mode: 'view'
      }
    };
    this.setAppData( 'panels', panels );
  }

  /**
   * @returns {boolean}
   */
  private hasData(): boolean {
    return !!this.getAppData( [ 'countries' ] );
  }

  /**
   *  Load the data then tell all the subscribers about the new status
   */
  loadData(): void {
    let localDataToLoad = this.appData.localDataTypes;
    //appDataTypes

    let initialDataTypes = {}, funcName = '';
    for ( let key in localDataToLoad ) {
      if ( localDataToLoad.hasOwnProperty( key ) ) {
        funcName = 'getFake' + _.startCase( localDataToLoad[ key ] ).replace( /\s+/g, '' );
        if ( undefined !== this.fakeData[ funcName ] ) {
          // console.log('getting Fake  - ' + localDataToLoad[key] + ' - calling ' + funcName);
          initialDataTypes[ localDataToLoad[ key ] ] = this.fakeData[ funcName ]();
        } else {
          funcName = 'get' + _.startCase( localDataToLoad[ key ] ).replace( /\s+/g, '' );
          if ( undefined !== this.appData[ funcName ] ) {
            initialDataTypes[ localDataToLoad[ key ] ] = this.appData[ funcName ]();
          }
        }
      }
    }
    this.setAppData( 'initialDataTypes', initialDataTypes );

    if ( this.appData.remoteDataTypes.length ) {
      let remoteDataToLoad = this.appData.remoteDataTypes;
      for ( let key in remoteDataToLoad ) {
        let dataType         = remoteDataToLoad[ key ];
        let dataTypeEndpoint = dataType;
        if ( undefined !== dataType.endpoint ) {
          dataTypeEndpoint = dataType.endpoint;
        }

        this.getRemoteAppData( dataTypeEndpoint )
          .then( ( data ) => this._setAppDataFromRemote( dataType, data ) );
      }
    } else {
      this.setAppData( 'appDataTypes', initialDataTypes );
      // this.isDataLoaded.next(true);
    }
  }

  private _setAppDataFromRemote( dataType: any, data: any ) {
    let dataTypeName = dataType;
    if ( undefined !== dataType.name ) {
      dataTypeName = dataType.name;
    }

    let appDataTypes             = this.getAppData( 'initialDataTypes' );
    appDataTypes[ dataTypeName ] = data;

    this.setAppData( 'appDataTypes', appDataTypes );

    // if (this.appDataLoaded === this.appData.remoteDataTypes.length) {
    this.isDataLoaded.next( true );
    // }
  }

  getAll( entity_type?: string ): Promise<any> {
    if ( undefined === entity_type ) {
      entity_type = this.entity_type;
    }
    let url = `${this.apiUrl}/${entity_type}`;
    if ( this.dev_mode !== 'jit' ) {
      url += '/getall/';
    }

    return this.http.get( url )
      .toPromise()
      .then( response => {
        let responseValue = this._getResponseValue( response );
        this._log( `${response.url}: Fetched ${responseValue.length} entities.`, 'MSG' );
        return responseValue;
      } )
      .catch( this._handleError );
  }

  getAllJoinLinked( entity_type: string ): Promise<any> {
    return this.getAll( entity_type )
      .then(
        ( entityItems ) => this._getAllJoinLinkedProcess1( entityItems )
      );
  }

  public _getAllJoinLinkedProcess1( entityItems: any ) {
    if ( undefined === entityItems ) {
      return Promise.resolve( [] );
    }

    let promises_array: Array<any>  = [];
    let processedResponseValue: any = [];

    for ( let entityItm of entityItems ) {
      promises_array.push( this._getAllJoinLinkedProcess2( entityItm, processedResponseValue ) );
    }
    return Promise.all( promises_array );
  }

  private _getAllJoinLinkedProcess2( entityItm: any, processedResponseValue: any ) {
    return new Promise( ( resolve, reject ) => {
      resolve(
        this._getAllJoinLinkedProcess3( entityItm, processedResponseValue )
      );
    } );
  }

  private _getAllJoinLinkedProcess3( entityItm: any, processedResponseValue: any ): Promise<any> {
    return this.getOne( entityItm[ 'BudgetId' ], 'budget' )
      .then( ( relatedEntity: any ) => {
        if ( undefined === relatedEntity || null === relatedEntity ) {
          return Promise.resolve( [] );
        }
        let manyToManyColumns = this.getAssociatedEntityManyToManyColumns( 'BUA' );
        console.log( 'manyToManyColumns  ' + JSON.stringify( manyToManyColumns ) )
        if ( undefined === manyToManyColumns || [] === manyToManyColumns ) {
          debugger;
        }

        for ( let col in manyToManyColumns ) {
          if ( manyToManyColumns.hasOwnProperty( col ) ) {
            entityItm[ manyToManyColumns[ col ] ] = relatedEntity[ manyToManyColumns[ col ] ];
          }
        }
        processedResponseValue.push( entityItm );
        return Promise.resolve( entityItm );
      } );
  }

  getOne( id: number, entity_type?: string ): Promise<any> {
    if ( undefined === entity_type ) {
      entity_type = this.entity_type;
    }

    let entityPk = this.getEntityPk( this.getEntityAbbrFromType( entity_type ) );

    let url = `${this.apiUrl}/${entity_type}/getbyid/${id}/`;
    if ( this.dev_mode === 'jit' ) {
      url = `${this.apiUrl}/${entity_type}/?${entityPk}=^${id}\d*$`;
    }

    return this.http.get( url )
      .toPromise()
      .then( response => {
        let responseValue = this._getResponseValue( response );
        if ( this.dev_mode === 'jit' ) {
          return responseValue[ 0 ];
        } else {
          return responseValue;
        }
      } )
      .catch( this._handleError );
  }

  saveOne( entityItm: any, entityAbbr?: string ): Promise<any> {
    let entity_type = this.getAppData( 'formEntityType' );

    if ( undefined !== entityAbbr ) {
      entity_type = this.getEntityTypeFromAbbr( entityAbbr );
    }

    if ( undefined !== entityItm._data ) {
      let { _data, ...cleanEntityItm } = entityItm;
      _data                            = '';
      if ( undefined !== entityItm._data.entityType ) {
        entity_type = entityItm._data.entityType;
      }
      entityItm = cleanEntityItm;
    }
    if ( undefined === entityAbbr ) {
      entityAbbr = this.getEntityAbbrFromType( entity_type );
    }

    let url = `${this.apiUrl}/${entity_type}/save`;
    if ( this.dev_mode === 'jit' ) {
      url               = `${this.apiUrl}/${entity_type}`;
      entityItm[ 'Id' ] = entityItm[ this.getEntityPk( entityAbbr ) ]; // @TODO: do this at in_memory_data_services
    } else {
      // @TODO: Solve in API/database
      switch ( entity_type ) {
        case 'advertiser':
          entityItm.AdvertiserName = entityItm.CompanyName;
          break;
      }
    }

    let payLoad = JSON.stringify( entityItm );
    console.log( 'saving one. Payload:: ' + url + ' ' + payLoad );

    return this.http
      .post( url, payLoad, { headers: this.headers } )
      .toPromise()
      .then( response => {
        this.MSG( 'RESULT -> ' + JSON.stringify( response ) );
        let responseValue = this._getResponseValue( response );
        return responseValue;
      } )
      .catch( this._handleError );
  }

  public getRemoteAppData( requestedValue: string ): Promise<any> {

    let url = `${this.apiUrl}/${requestedValue}/getall`;
    if ( this.dev_mode === 'jit' ) {
      url = `${this.apiUrl}/${requestedValue}`;
    }

    return this.http.get( url )
      .toPromise()
      .then( response => {
        let responseValue = this._getResponseValue( response );
        return responseValue;
      } )
      .catch( this._handleError );
  }

  public setAppData( dataType: string, value: any ) {
    this.appData[ dataType ] = value;
  }

  public getAppData( dataToRequest: any ): any {
    if ( typeof dataToRequest === 'string' ) {
      return this.appData[ dataToRequest ];
    }

    let output = {};
    for ( let i = 0; i < dataToRequest.length; i++ ) {
      output[ dataToRequest[ i ] ] = this.appData[ dataToRequest[ i ] ];
    }
    return output;
  }

  /**
   * @returns {Observable<T>}
   */
  // sidebarEntityType(): Observable<string> {
  //   return this.sidebarEntitySubject.asObservable();
  // }

  allPanelsToViewModeObserve(): Observable<boolean> {
    return this.allPanelsToViewModeSubject.asObservable();
  }

  allPanelsToViewModeQuery(): boolean {
    return this.getAppData( 'allPanelsToViewMode' );
  }

  /**
   * Observes requests from Main Form
   * @returns {Observable<T>}
   */
  formDataLoadedObserve(): Observable<boolean> {
    return this.formDataLoadedSubject.asObservable();
  }

  formDataLoadedQuery(): boolean {
    return this.getAppData( 'formDataLoaded' );
  }

  setFormDataLoaded( value: boolean ): void {
    this.setAppData( 'formDataLoaded', value );
    this.formDataLoadedSubject.next( value );
  }

  formDataSavedObserve(): Observable<boolean> {
    return this.formDataSavedSubject.asObservable();
  }

  formDataSavedQuery(): boolean {
    return this.getAppData( 'formSubmittedAndSaved' );
  }

  /**
   * Observes a request for opening an Entity Link
   * @returns {Observable<T>}
   */
  sidebarEntityLinkQueuedObserve(): Observable<boolean> {
    return this.sidebarEntityLinkQueuedSubject.asObservable();
  }

  sidebarEntityLinkFormQueuedObserve(): Observable<boolean> {
    return this.sidebarEntityLinkFormQueuedSubject.asObservable();
  }

  /**
   * Observes a request for opening AppSidebar
   * @returns {Observable<T>}
   */
  sidebarShownQueuedObserve(): Observable<boolean> {
    return this.sidebarShownQueuedSubject.asObservable();
  }

  /**
   * Observes a request for opening AppSidebar
   * @returns {Observable<T>}
   */
  sidebarFormShownQueuedObserve(): Observable<boolean> {
    return this.sidebarFormShownQueuedSubject.asObservable();
  }

  sidebarHideQueuedObserve(): Observable<boolean> {
    return this.sidebarHideQueuedSubject.asObservable();
  }

  sidebarEntityLinkQueuedQuery(): boolean {
    return this.getAppData( 'sidebarEntityLinkQueued' );
  }

  sidebarEntityLinkFormQueuedQuery(): boolean {
    return this.getAppData( 'sidebarEntityLinkFormQueued' );
  }

  sidebarShowQueuedQuery(): boolean {
    return this.getAppData( 'sidebarShownQueued' );
  }

  sidebarFormShowQueuedQuery(): boolean {
    return this.getAppData( 'sidebarFormShownQueued' );
  }

  sidebarHideQueuedQuery(): boolean {
    return this.getAppData( 'sidebarHideQueued' );
  }

  //
  sidebarReturnLinkObserve(): Observable<boolean> {
    return this.sidebarReturnLinkSubject.asObservable();
  }

  sidebarReturnLinkQuery(): boolean {
    return this.getAppData( 'sidebarReturnLinkQueued' );
  }

  showEntityInSidebar( entityAbbr: string ): void {
    this.setsidbarEntityData( entityAbbr );

    this.setAppData( 'sidebarShownQueued', true );
    this.sidebarShownQueuedSubject.next( true );
  }

  showEntityLink( entityAbbr: string ): void {
    if ( this.associatedEntityIsManyToMany( entityAbbr ) ) {
      entityAbbr = this.getLinkingEntityAbbr( entityAbbr );
    }

    this.setsidbarEntityData( entityAbbr );

    if ( this.isFIC1() ) {
      this.setAppData( 'sidebarEntityLinkFormQueued', true );
      this.sidebarEntityLinkFormQueuedSubject.next( true );
    } else {
      this.setAppData( 'sidebarEntityLinkQueued', true );
      this.sidebarEntityLinkQueuedSubject.next( true );
    }
  }

  showEntityInSidebarForm( entityAbbr: string ) {
    let sidebarFormEntityAbbr = entityAbbr;
    if ( this.associatedEntityIsManyToMany( entityAbbr ) ) {
      sidebarFormEntityAbbr = this.getLinkingEntityAbbr( entityAbbr );
    }

    console.log( 'sidebarFormEntityAbbr ' + sidebarFormEntityAbbr );
    this.setAppData( 'sidebarFormEntityAbbr', sidebarFormEntityAbbr );

    this.setAppData( 'sidebarFormShownQueued', true );
    this.sidebarFormShownQueuedSubject.next( true );
  }

  // showEntityInForm(entityType: string, filterData: any): void {
  //   this.setAppData('sidebarFormShown', true);
  // }

  capitalize( str: string ) {
    let splitStr = str.toLowerCase().split( ' ' );
    for ( let i = 0; i < splitStr.length; i++ ) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[ i ] = splitStr[ i ].charAt( 0 ).toUpperCase() + splitStr[ i ].substring( 1 );
    }
    // Directly return the joined string
    return splitStr.join( ' ' );
  }

  getEntityPk( entityAbbr?: string ) {
    // if (undefined === entityAbbr){
    //   entityAbbr = this.app.getAppData('sidebarEntityAbbr');
    // }
    if ( undefined === this.getAppData( 'entities' )[ entityAbbr ] ) {
      debugger;
    }
    return this.getAppData( 'entities' )[ entityAbbr ].pk;
  }

  getEntityAbbrFromType( entityType: string ): string {
    for ( let key in this.getAppData( 'entities' ) ) {
      if ( this.getAppData( 'entities' ).hasOwnProperty( key ) ) {

        let entityItm = this.getAppData( 'entities' )[ key ];
        if ( entityItm.name.toLowerCase() === entityType.toLowerCase() ) {
          return key;
        }
      }
    }
  }

  getEntityTypeFromAbbr( entityAbbr: string ): string {
    for ( let key in this.getAppData( 'entities' ) ) {
      if ( this.getAppData( 'entities' ).hasOwnProperty( key ) ) {

        let entityItm = this.getAppData( 'entities' )[ key ];
        if ( key === entityAbbr ) {
          return entityItm.name.toLowerCase();
        }
      }
    }
  }

  /**
   * setsidbarEntityMetaData
   *
   * @param entityAbbr
   */
  setsidbarEntityData( entityAbbr: string ) {
    if ( undefined === this.getAppData( 'entities' )[ entityAbbr ] ) {
      return;
    }
    let entityType = this.getAppData( 'entities' )[ entityAbbr ].name.toLowerCase();
    this.setAppData( 'sidebarEntityType', entityType );
    this.setAppData( 'sidebarEntityAbbr', entityAbbr );
  }

  str_capitalize( str: string ) {
    return str[ 0 ].toUpperCase() + str.slice( 1 );
  }

  getFormattedEntityId( entityAbbr: string, entityIdValue: string ) {
    return '<span class="badge badge-default badge-itm-id-wrapper"><span class="badge-itm-abbr"> '
      + entityAbbr + '</span><span class="badge-itm-id"> -'
      + entityIdValue + '</span></span>';
  }

  EOA_EntityNew( $event: MouseEvent ) {
    this.stopEventPropagation( $event );
    let entityType = this.getEntityTypeFromAbbr( this.getAppData( 'listEntityAbbr' ) )

    this.router.navigate( [ `/${entityType}/new` ] );
    this.setAppData( 'sidebarShown', false );
  }

  EOA_EntityList( $event?: MouseEvent ): void {
    if ( undefined !== event ) {
      this.stopEventPropagation( $event );
    }

    this.router.navigate( [ `/${this.getAppData( 'formEntityType' )}` ] );
    this.setAppData( 'sidebarShown', false );
  }

  EOA_NavigateTo( where: string, $event?: MouseEvent ): void {
    if ( undefined !== $event ) {
      this.stopEventPropagation( $event );
    }

    switch ( where ) {
      case 'home':
        this.router.navigate( [ `/` ] );
        return;
      case 'back':
        if ( this.getAppData( 'sidebarFormShown' ) ) {
          this.sidebarHideQueuedSubject.next( true );
        } else {
          this.location.back();
        }
        return;
      case 'prev':
        break;
      case 'next':
        break;
      case 'current_entity_list':
        this.EOA_EntityList();
        return;
    }

    if ( where !== 'back' ) {
      let curr_id = parseInt( this.router.url.split( '/' )[ 2 ], 10 );
      if ( typeof curr_id !== 'number' ) {
        return;
      }

      let future_id = curr_id + 1;
      if ( where === 'prev' ) {
        if ( curr_id === 1 ) {
          return;
        }
        future_id = curr_id - 1;
      }
      this.router.navigate( [ `/${this.getAppData( 'formEntityType' )}/${future_id}` ] );
      this.sidebarHideQueuedSubject.next( true );
    }


  }

  /**
   * @deprecated since 1.2.0
   */
  goBack( $event?: MouseEvent ) {
    this.EOA_NavigateTo( 'back', $event );
  }

  getEntitySidebarFilterFields( entityAbbr: string ): any {
    return this.appData.entities[ entityAbbr ].sidebarFilterFields;
  }

  getEntitySidebarSearchFields( entityAbbr: string ): any {
    return this.appData.entities[ entityAbbr ].sidebarSearchFields;
  }

  public changeSuccessMessage( msg: string ) {
    this.successMessage.next( `${new Date()} - ${msg}.` );
  }

  public getAssociatedEntityColumns( entityAbbr: string ): any {
    if (
      undefined === this.getAppData( 'entities' )[ this.getAppData( 'formEntityAbbr' ) ]
      || undefined === this.getAppData( 'entities' )[ this.getAppData( 'formEntityAbbr' ) ].associatedEntities
      || undefined === this.getAppData( 'entities' )[ this.getAppData( 'formEntityAbbr' ) ].associatedEntities[ entityAbbr ]
      || undefined === this.getAppData( 'entities' )[ this.getAppData( 'formEntityAbbr' ) ].associatedEntities[ entityAbbr ].columns
    ) {
      return;
    }
    return this.getAppData( 'entities' )[ this.getAppData( 'formEntityAbbr' ) ].associatedEntities[ entityAbbr ].columns;
  }

  public getAssociatedEntityBindColumn( childEntityAbbr: string ): any {
    let associatedEntityBindColumn = '';
    if ( this.getAppData( 'formEntityAbbr' ) === 'FIC' ) {
      associatedEntityBindColumn = this.getAppData( 'entities' )[ 'FIL' ].associatedEntities[ childEntityAbbr ].bindColumn;
    } else {
      let associatedEntities = this.getAppData( 'entities' )
        [ this.getAppData( 'formEntityAbbr' ) ]
        .associatedEntities;
      if ( undefined !== associatedEntities[ childEntityAbbr ] ) {
        associatedEntityBindColumn = associatedEntities[ childEntityAbbr ].bindColumn;
      }
    }

    return associatedEntityBindColumn;
  }

  public associatedEntityIsManyToMany( childEntityAbbr: string ): boolean {
    let formEntityAssociatedEntities = this.getAppData( 'entities' )[ this.getAppData( 'formEntityAbbr' ) ].associatedEntities;
    if ( undefined === formEntityAssociatedEntities ) {
      this._log( 'Entity has no associatedEntities defined.', 'MSG' );
      return false;
    }
    let associatedEntities = formEntityAssociatedEntities[ childEntityAbbr ];
    if ( undefined === associatedEntities ) {
      for ( let formEntityAssociatedEntity in formEntityAssociatedEntities ) {
        if ( formEntityAssociatedEntities.hasOwnProperty( formEntityAssociatedEntity ) ) {
          let itm = formEntityAssociatedEntities[ formEntityAssociatedEntity ];
          if ( itm.linkingEntityAbbr === childEntityAbbr && itm.manyToMany ) {
            return true;
          }
        }
      }
    }
    return (
      undefined !== associatedEntities
      && undefined !== associatedEntities.manyToMany
    );
  }

  public getAssociatedEntityManyToManyFromChildEntityAbbr( childEntityAbbr: string ): string {
    let formEntityAssociatedEntities = this.getAppData( 'entities' )[ this.getAppData( 'formEntityAbbr' ) ].associatedEntities;

    for ( let formEntityAssociatedEntity in formEntityAssociatedEntities ) {
      if ( formEntityAssociatedEntities.hasOwnProperty( formEntityAssociatedEntity ) ) {
        let itm = formEntityAssociatedEntities[ formEntityAssociatedEntity ];
        if ( itm.linkingEntityAbbr === childEntityAbbr && itm.manyToMany ) {
          return formEntityAssociatedEntity;
        }
      }
    }
  }

  public getLinkingEntityAbbr( childEntityAbbr: string ) {
    return this.getAppData( 'entities' )[ this.getAppData( 'formEntityAbbr' ) ].associatedEntities[ childEntityAbbr ].linkingEntityAbbr;
  }

  public _getEntityLinkingToken( childEntityAbbr: string ) {
    let linkingEntityAbbr  = this.getLinkingEntityAbbr( childEntityAbbr );
    let entityLinkingToken = '_' + linkingEntityAbbr + '_';

    return entityLinkingToken;
  }


  public getAssociatedEntityManyToManyColumns( childEntityAbbr: string ): any {
    let associatedEntityColumns           = this.getAssociatedEntityColumns( childEntityAbbr );
    let associatedEntityManyToManyColumns = [];
    let entityLinkingToken                = this._getEntityLinkingToken( childEntityAbbr );

    for ( let col in associatedEntityColumns ) {
      if ( associatedEntityColumns.hasOwnProperty( col ) ) {
        for ( let i = 0; i < associatedEntityColumns[ col ].length; i++ ) {
          if ( associatedEntityColumns[ col ][ i ].indexOf( entityLinkingToken ) !== -1 ) {
            associatedEntityManyToManyColumns.push(
              associatedEntityColumns[ col ][ i ]
                .replace( entityLinkingToken, '' )
            );
          }
        }
      }
    }

    return associatedEntityManyToManyColumns;
  }

  stopEventPropagation( $event: MouseEvent ) {
    if ( undefined === $event ) {
      return;
    }

    $event.preventDefault();
    $event.stopPropagation();
  }

  public getEntityData( entityItm: any, column_name: any ): string {
    // entityItm[getAssociatedEntityColumnItems(col)[0]]
    if ( typeof column_name === 'string' ) {
      return entityItm[ column_name ];
    }

    if ( this._associatedEntityColumnGroupIsComposite( column_name ) ) {
      let entityDataOutput = '';
      for ( let col_itm of column_name ) {
        if ( this._associatedEntityColumnIsLookup( col_itm ) ) {
          if ( undefined !== entityItm[ col_itm.fieldName ] ) {
            let filterLookupValues = this.getAppData( 'appDataTypes' )[ col_itm.lookupName ];
            for ( let filterLookupValue of filterLookupValues ) {
              if ( filterLookupValue.key === entityItm[ col_itm.fieldName ] ) {
                entityDataOutput += filterLookupValue.value;
              }
            }
          }
        } else {
          entityDataOutput += col_itm.replace( /"/g, '' );
        }
      }
      return entityDataOutput;
    }
  }

  private _associatedEntityColumnGroupIsComposite( column_name: any ): boolean {
    return typeof column_name === 'object';
  }

  private _associatedEntityColumnIsLookup( col_itm: any ): boolean {
    return typeof col_itm === 'object';
  }

  public openFilterCondition( entityItm: any ) {
    let data = {
      entity: entityItm
    };
    this.setAppData( 'formNewRecord', true );
    this.setAppData( 'FIC_DATA', data );
    this.showEntityInSidebarForm( 'FIC' );
  }

  public setFormDummyData( form: any ) {
    form.controls[ 'CreatedDate' ].setValue( this._formatDate( new Date().toString() ) );
    form.controls[ 'CreatedBy' ].setValue( 1 );
    form.controls[ 'LastModifiedBy' ].setValue( 1 );
    form.controls[ 'LastModifiedDate' ].setValue( this._formatDate( new Date().toString() ) );
  }

  public getFilterConditionGroupFromId( id: number ): any {
    let filterConditionGroups = this.getAppData( 'initialDataTypes' )[ 'filterConditionGroup' ];
    let Group                 = _.find( filterConditionGroups, [ 'key', _.toInteger( id ) ] );

    return Group;
  }

  private _formatDate( strDate: string ): string {
    return moment( strDate ).format( 'MM/DD/YYYY' );
  }

  public isFIC() {
    return this.getAppData( 'sidebarEntityAbbr' ) === 'FIO';
  }

  public isFIC1() {
    return this.getAppData( 'formEntityAbbr' ) === 'FIL';
  }

  public _getRandomArbitrary( min: number, max: number ) {
    return Math.floor( Math.random() * (max - min + 1) ) + min;
  }

}
