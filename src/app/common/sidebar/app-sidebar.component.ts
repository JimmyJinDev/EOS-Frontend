import {
  AfterViewInit,
  Compiler,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  Injectable,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';
import { EOAEntityFormComponent } from '../../entity/eoa-entity-form.component';
import { FormControlService } from '../../form/form-control.service';
import { AppService } from '../../service/app.service';
import { AppSidebarFormService } from './app-sidebar-form.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { EOAEntity } from '../../entity/eoa-entity.type';
import { Observable } from 'rxjs/Observable';

declare var $: any;
declare var _: any;


@Component( {
  selector:      'app-sidebar',
  templateUrl:   './app-sidebar.component.html',
  encapsulation: ViewEncapsulation.None,
  providers:     [ FormControlService, AppSidebarFormService ],
  inputs:        [ 'entityList' ],
} )

@Injectable()
export class AppSidebarComponent extends EOAEntityFormComponent implements OnInit, AfterViewInit {

  @Input() isAppLoaded: BehaviorSubject<boolean>;

  @ViewChild( 'searchTextBox' ) search_text_box: ElementRef;

  @ViewChild( 'sidebarBody' ) sidebarBodyRef: ElementRef;
  @ViewChild( 'sidebarFormContainer', { read: ViewContainerRef } ) sidebarFormInline: ViewContainerRef;
                              cmpRef: ComponentRef<Component>;

  private sidebarFormComponent: any;

  //// ** ItemList
  _entityItems: EOAEntity[];
  selectedEntity: EOAEntity;

  freeTextSearchFormField: any;
  query: string;
  orderProp: string;
  order_prop_values = [
    {
      key:   'name',
      value: 'Alphabetical',
    },
    {
      key:   'date',
      value: 'Date',
    },
  ];
  orderDirection    = 'asc';

  @Input() entityList: EOAEntity[];
  public sidebarFormShown = false;

  public routerEntityLoaded = false;

  appSidebarCurrentPage: number;

  areEntityItemsLoaded = new BehaviorSubject<boolean>( this._areEntityItemsLoaded() );

  sidebarShownQueued: Observable<boolean>;
  searchFieldExpanded = true;

  appSidebarFiltersCollapsed = true;

  public entitySidebarSearchFields: any;

  filterConditionsShown = false;

  filterList: any = [];

  displayGrouped = '0';

  FICGroup: 0

  constructor( public formControlService: AppSidebarFormService,
               public app: AppService, private router: Router,
               private _componentFactoryResolver: ComponentFactoryResolver,
               private viewContainerRef: ViewContainerRef,
               private componentFactoryResolver: ComponentFactoryResolver, private compiler: Compiler ) {
    super( formControlService, app );
  }

  ngOnInit(): void {

    this.app.setAppData( 'sidebarEntityAbbr', this.app.getAppData( 'formEntityAbbr' ) );
    this.app.setAppData( 'sidebarEntityType', this.app.getAppData( 'formEntityType' ) );

    /**
     * Observe formDataLoadedObserve message
     */
    this.app.formDataLoadedObserve().subscribe( ( val: boolean ) => {
      if ( val ) {
        console.log( 'formDataLoadedObserve' );
        if ( !this.app.getAppData( 'sidebarFormShown' ) ) {
          this.AppDataLoaded( val, true );
          this._initSidebar();
        }
      }
    } );

    /**
     * Observe sidebarShownQueued message
     * entityLink-aware
     */
    this.app.sidebarShownQueuedObserve().subscribe( ( val: boolean ) => {
      if ( val ) {
        console.log( 'sidebarShownQueuedObserve' );

        this.app.setAppData( 'sidebarShown', true );
        this.app.setAppData( 'sidebarShownQueued', false );
        this.app.setAppData( 'sidebarFormShown', false );

        // this._initSidebar();
        this.showFilterConditions();
      }
    } );

    /**
     * Observe sidebarEntityLinkQueued message
     * entityLink-aware
     */
    this.app.sidebarEntityLinkQueuedObserve().subscribe( ( val: boolean ) => {
      if ( val ) {
        console.log( 'sidebarEntityLinkQueuedObserve' );

        this.app.setAppData( 'sidebarEntityLinkQueued', false );
        this.app.setAppData( 'sidebarShown', true );
        this.app.setAppData( 'sidebarFormShown', false );

        this.entityLinkRequested();
      }
    } );

    /**
     * Observe sidebarEntityLinkQueued message
     * entityLink-aware
     */
    this.app.sidebarEntityLinkFormQueuedObserve().subscribe( ( val: boolean ) => {
      if ( val ) {
        console.log( 'sidebarEntityLinkFormQueuedObserve' );

        this.app.setAppData( 'sidebarEntityLinkFormQueued', false );
        this.app.setAppData( 'sidebarFormShown', true );
        this.app.setAppData( 'sidebarShown', false );

        this._initSidebarForm();
        // this.entityLinkFormRequested();
      }
    } );

    /**
     * Observe sidebarFormShownQueued message
     * entityLink-aware
     */
    this.app.sidebarFormShownQueuedObserve().subscribe( ( val: boolean ) => {
      if ( val ) {
        console.log( 'sidebarFormShownQueuedObserve' );

        if ( undefined === this.sidebarFormInline ) {
          return;
        }

        this.app.setAppData( 'sidebarFormShown', true );
        this.app.setAppData( 'sidebarFormShownQueued', false );
        this.app.setAppData( 'sidebarShown', false );

        this._initSidebarForm();
      }
    } );

    /**
     * Observe sidebarFormShownQueued message
     * entityLink-aware
     */
    this.app.sidebarHideQueuedObserve().subscribe( ( val: boolean ) => {
      if ( val ) {
        this.hideSidebar();
      }
    } );

    /**
     * Observe formDataSavedObserve message
     */
    this.app.formDataSavedObserve().subscribe( ( val: boolean ) => {
      if ( val ) {
        console.log( 'formDataSavedObserve' );
        this.app.setAppData( 'sidebarFormShown', false );
      }
    } );
  }

  ngAfterViewInit() {
    //  if (this.app.getAppData('sidebarShown') === true) {
    //    this._initSidebarForm();
    //  }

  }

  hideSidebar() {
    this.app.setAppData( 'sidebarFormShown', false );
    this.app.setAppData( 'sidebarShown', false );
    this.app.setAppData( 'sidebarHideQueued', false );
  }

  _initSidebarForm() {
    this.routerEntityLoaded = true;
    this.areEntityItemsLoaded.next( true );

    if ( this.cmpRef ) {
      // when the `type` input changes we destroy a previously
      // created component before creating the new one
      this.cmpRef.destroy();
    }

    // if ( typeof this.sidebarFormComponent !== 'function' ) {
    this.sidebarFormComponent = this.app.getAppData( 'entities' )[ this.app.getAppData( 'sidebarFormEntityAbbr' ) ].form_component;
    // }

    let factory = this._componentFactoryResolver.resolveComponentFactory( this.sidebarFormComponent );
    this.cmpRef = this.sidebarFormInline.createComponent( factory );

    let formInstance                                 = this.cmpRef.instance as EOAEntityFormComponent;
    let formEntitySingle                             = this.app.getAppData( 'formEntity' );
    formInstance.data.entitySingle[ 'AdvertiserId' ] = formEntitySingle[ this.app.getEntityPk( this.app.getAppData( 'formEntityAbbr' ) ) ];

    if (this.isFIC()){
      this.app.setAppData( 'sidebarFormEntity', this.app.getAppData( 'FIC_DATA' ).entity );
      formInstance.data.FIC_ENTITY_DATA = this.app.getAppData( 'FIC_DATA' );
    }
    // to access the created instance use
    // this.compRef.instance.someProperty = 'someValue';
    // this.compRef.instance.someOutput.subscribe(val => doSomething());
  }

  _initSidebar(): void {
    this._initFilters()
    this.updateEntityItems();
    // this._initSidebarForm();

    this.areEntityItemsLoaded.subscribe( ( val ) => {
      if ( !val ) {
//        console.log('updating entity items...');
      }
    } );
    this.form.controls[ 'AppEntities' ].setValue( this.app.getAppData( 'sidebarEntityAbbr' ) );

  }

  private _initFilters(): void {
    this.entitySidebarSearchFields = this.app.getEntitySidebarFilterFields( this.app.getAppData( 'sidebarEntityAbbr' ) );
    console.log( 'entitySidebarSearchFields ' + JSON.stringify( this.entitySidebarSearchFields ) );
  }

  getFormField( sidebarSearchField: any ): any {
    console.log('sidebarSearchField ' + sidebarSearchField);
    return this.formFields[ sidebarSearchField ];
  }

  entityGoTo( $event: MouseEvent, entityItm: EOAEntity ): void {
    this.app.stopEventPropagation( $event );

    if ( this.filterConditionsShown ) {
      this.app.openFilterCondition( entityItm );
      return;
    }

    let sidebarData = this.app.getAppData( 'sidebarData' );

    if ( undefined !== sidebarData && undefined !== sidebarData.entityLink && sidebarData.entityLink === true ) {
      this.entityReturnLink( entityItm );
      return;
    }

    this.entityNavigateTo( entityItm );

  }

  entityNavigateTo( entityItm: EOAEntity ): void {
    this.selectedEntity = entityItm;
    let entityId        = this.selectedEntity[ this.app.getEntityPk( this.app.getAppData( 'sidebarEntityAbbr' ) ) ];
    this.router.navigate( [ '/' + this.app.getAppData( 'sidebarEntityType' ) + '/', entityId ] );
    this.app.setAppData( 'sidebarShown', false );
  }

  showFilterConditions() {
    this.routerEntityLoaded = true;
    this.areEntityItemsLoaded.next( true );

    // console.log('sidebarEntityType '  + this.app.getAppData( 'sidebarEntityType' ));

    this.updateEntityItems( this.app.getAppData( 'sidebarEntityType' ), true );

    this._focusOnSearchTextBox();
  }

  _focusOnSearchTextBox() {
    if (
      undefined !== this.search_text_box
      && undefined !== this.search_text_box.nativeElement
    ) {
      this.search_text_box.nativeElement.focus();
    }
  }

  /**
   * entityLink-aware
   */
  entityLinkRequested(): void {
    this.updateEntityItems( this.app.getAppData( 'sidebarEntityType' ), true );
    this.query = this.app.getAppData( 'sidebarData' ).query;

    this._focusOnSearchTextBox();
  }

  /**
   * entityLink-aware
   */
  entityLinkFormRequested(): void {

  }

  /**
   * entityLink-aware
   * @param entityItm
   */
  entityReturnLink( entityItm: EOAEntity ): void {
    let sidebarData = this.app.getAppData( 'sidebarData' );

    sidebarData.entityItm = entityItm;

    this.app.setAppData( 'sidebarReturnLinkQueued', true );
    this.app.setAppData( 'sidebarData', sidebarData );
    this.app.sidebarReturnLinkSubject.next( true );
    this.app.setAppData( 'sidebarShown', false );
  }

  getGroupedEntityItems() {
    return this.groupItems( this.getEntityItems() );
  }

  getEntityItems() {
    return this.sortItems( this.filterItems( this._entityItems ) );
  }

  get entityItems() {
    return this.sortItems( this.filterItems( this._entityItems ) );
  }

  // @TODO: Upgrade to an observable
  public updateEntityItems( entityType?: string, showSidebar?: boolean ): void {
    this._entityItems = [];
    this.areEntityItemsLoaded.next( false );

    if ( undefined === entityType ) {
      entityType = this.app.getAppData( 'formEntityType' );
    }

    this.app.setAppData( 'sidebarEntityType', entityType );

    this.filterConditionsShown = false;
    if ( this.app.getEntityAbbrFromType( entityType ) === 'FIO' ) {
      this.filterConditionsShown = true;
    }

    this.app.getAll( entityType )
      .then( ( entityItems ) => {
        this.routerEntityLoaded = true;
        this.areEntityItemsLoaded.next( true );

        this._entityItems = entityItems;
        if ( showSidebar ) {
          this.app.setAppData( 'sidebarShownQueued', false );
          this.app.setAppData( 'sidebarShown', true );
        }
        this.form.valueChanges.subscribe( data => this._formChanges( data ) );
      } );
  }

  _formChanges( data: any ): void {
    if ( this.app.getAppData( 'sidebarEntityAbbr' ) !== data.AppEntities ) {
      this.app.setAppData( 'sidebarEntityAbbr', data.AppEntities );
      this.app.setAppData( 'sidebarEntityType', this.app.getEntityTypeFromAbbr( data.AppEntities ) );
      this.updateEntityItems( this.app.getEntityTypeFromAbbr( data.AppEntities ) );
    } else {
      this.filterItems();
    }
  }

  showEntity( entityType: string, filterData: any ) {
    if ( entityType !== this.app.getAppData( 'sidebarEntityType' ) ) {
      this.updateEntityItems( entityType );
    }

    this.query = filterData.query;
  }

  private filterItems( items?: EOAEntity[] ): EOAEntity[] {
    //debugger;
    if ( undefined === items ) {
      items = this._entityItems;
    }

    if ( undefined === items ) {
      // this.updateEntityItems();
      return;
    }

    return items.filter( entityItm => {
      let entity_pk     = this.app.getEntityPk( this.app.getAppData( 'sidebarEntityAbbr' ) );
      let entity_field1 = this.app.getAppData( 'entities' )[ this.app.getAppData( 'sidebarEntityAbbr' ) ].sidebarSearchFields.text_1
      let group_field   = this.FICGroup;

      if ( undefined === entity_pk || undefined === entityItm[ entity_pk ] ) {
        return;
      }

      let found1 = true, found2 = true, found3 = true, found4 = true;

      if ( this.query ) {
        let searchField1: string = entityItm[ entity_pk ].toString();
        found1                   = searchField1.indexOf( this.query ) >= 0;
        let searchField2: string = entityItm[ entity_field1 ].toString().toLowerCase();
        found2                   = searchField2.indexOf( this.query.toString().toLowerCase() ) >= 0;
      }

      found3 = this._filterByField( entityItm );

      if ( this.isFIC() ) {
        let FICGroup: number = this.getFICGroup();
        // console.log('ficgroup ' + this.getFICGroup())
        if ( FICGroup !== 0 ) {
          found4 = entityItm[ 'FilterConditionGroup' ] === FICGroup;
        }
      }

      return (found1 || found2) && found3 && found4;
    } );
  }

  private _filterByField( entityItm: EOAEntity ): boolean {
    // @TODO: Dynamic multiple field filter.
    let found3          = true;
    let field_to_search = 'PrimaryState';
    if ( this.form.controls[ field_to_search ].value.length !== 0 ) {
      // debugger;
      if ( undefined === entityItm[ field_to_search ] || null === entityItm[ field_to_search ] ) { // @TODO either null or undefined?
        return false;
      }
      let searchField3: string = entityItm[ field_to_search ].toString();
      found3                   = searchField3 === this.form.controls[ field_to_search ].value;
    }
    return found3;
  }

  private sortItems( items: EOAEntity[] ): EOAEntity[] {
    return items;
    // if ( items && this.orderProp ) {
    //   return _.orderBy( items, this.orderProp, this.orderDirection );
    // }
  }

  groupItems( items: EOAEntity[] ): any {
    return _( this._entityItems )
      .groupBy( ( x: any ) => x.FilterConditionGroup )
      .map( ( value: any, key: number ) => ({
          Group: this.app.getFilterConditionGroupFromId( _.toInteger( key ) ),
          Items: value
        })
      ).value();
  }

  _groupBy( xs: any, key: any ): any {
    return xs.reduce( function ( rv: any, x: any ) {
      (rv[ x[ key ] ] = rv[ x[ key ] ] || []).push( x );
      return rv;
    }, {} );
  };

  /**
   * @deprecated since v1.2.0
   */
  getSidebarState(): boolean {
    return this.getSidebarShown();
  }

  /**
   * @deprecated since v1.2.0
   */
  getSidebarFormState(): boolean {
    return this.getSidebarFormShown();
  }

  getSidebarShown(): boolean {
    return this.app.getAppData( 'sidebarShown' );
  }

  getSidebarFormShown(): boolean {
    return this.app.getAppData( 'sidebarFormShown' );
  }

  private _areEntityItemsLoaded() {
    if ( undefined === this._entityItems ) {
      return false;
    }
    return !!this._entityItems.length;
  }

  // @TODO: Move to component
  searchFieldExpandedClass() {
    return ((this.query === '' || undefined === this.query) ? 'fa-search' : 'fa-remove');
  }

  toggleSearchExpand() {
    if ( this.query !== '' ) {
      this.query = '';
    }
    this.search_text_box.nativeElement.focus();
  }

  getEntitySidebarFields( entityItm: EOAEntity ): any {
    if ( undefined === this.app.getAppData( 'sidebarEntityAbbr' ) ) {
      return;
    }
    let currSidebarFields = this.app.getAppData( 'entities' )[ this.app.getAppData( 'sidebarEntityAbbr' ) ].sidebarSearchFields;

    return {
      text_1: currSidebarFields.text_1,
      text_2: currSidebarFields.text_2,
    };
  }

  getEntityID( entityItm: any ) {
    let entityAbbr = this.app.getAppData( 'sidebarEntityAbbr' );
    return this.app.getFormattedEntityId(
      entityAbbr,
      entityItm[ this.app.getEntityPk( entityAbbr ) ]
    );
  }

  clearFilterValue( filterId: string ): void {
    this.form.controls[ filterId ].setValue( '' );
  }

  public isFIC() {
    return this.app.getAppData( 'sidebarEntityAbbr' ) === 'FIO';
  }

  public getFICGroup(): number {
    return _.toInteger( this.FICGroup );
  }

  public getOrderPropValue() {
    return 'Name / Desc';
  }

  public getEntityClass() {
    return 'entity-type-'+ this.app.getAppData( 'sidebarEntityType' );
  }

}
