import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Advertiser } from '../../entity/advertiser/advertiser.type';
import { FormControlService } from '../../form/form-control.service';
import { AppService } from '../../service/app.service';
import { EOAEntity } from '../../entity/eoa-entity.type';
import { AppSettings } from '../../app-settings';

declare var $: any;

@Component( {
  selector:      'eoa-associated-entity',
  templateUrl:   './eoa-associated-entity.component.html',
  encapsulation: ViewEncapsulation.None,
  providers:     [ FormControlService ],
} )

export class EOAAssociatedEntityComponent implements OnInit {

  @Input() entityAbbr: string;
  @Input() associatedField: string;
  @Input() triggerSave: true;

  entityType: string;

  //// ** ItemList
  entityItems: any[];
  selectedEntity: Advertiser;
  _entity_type: string = 'advertiser';

  freeTextSearchFormField: any;
  query: string;
  orderProp: string;

  private routerEntityLoaded = false;

  currentBool: boolean = false;

  router: Router;

  entityListCurrentPage: number;

  associatedEntityColumnNames: any;

  searchExpanded: boolean                     = false;
  public searchFieldExpandedFocusEventEmitter = new EventEmitter<boolean>();
  public tableRowHoverEventEmitter            = new EventEmitter<boolean>();

//  private router: Router;

//  private advertiserService: AdvertiserService;

  constructor( public app: AppService,
               public fcs: FormControlService ) {
  }

  ngOnInit(): void {
    this.entityType = this.app.getEntityTypeFromAbbr( this.entityAbbr );

    /**
     * Observe formDataLoadedObserve message
     */
    this.app.formDataLoadedObserve().subscribe( ( val: boolean ) => {
      if ( this.app.getAppData( 'sidebarFormShown' ) ) {
        return;
      }

      if ( val ) {
        this.associatedEntityGetAll();
      }
    } );

    this.app.formDataSavedObserve().subscribe( ( val: boolean ) => {
      if ( val ) {
        this.saveEntityItemsChanges();
      }
    } );

    this.app.sidebarReturnLinkObserve().subscribe( ( val: boolean ) => {
      if ( val ) {
        this.entityLinkUpdate();
      }
    } );

    this.getAssociatedEntityColumnNames();
  }

  toggleParentLink( entityItm: EOAEntity, $event: MouseEvent ) {
    $event.preventDefault();
    $event.stopPropagation();

    entityItm._data.toDelete = !entityItm._data.toDelete;
    entityItm._data.modified = !entityItm._data.modified;
  }

  toggleSearchExpand() {
    this.searchExpanded = !this.searchExpanded;
    if ( this.searchExpanded ) {
      this.searchFieldExpandedFocusEventEmitter.emit( true );
    } else {
      this.query = '';
    }
  }

  tableRowHover( $event: MouseEvent, e_type: string ) {
    $event.preventDefault();
    $event.stopPropagation();

    let panel_card_tools = $( '.panel-heading .card-tools', $( $event.target ).parents().find( '.panel-card' ) );
    if ( e_type === 'out' ) {
      panel_card_tools.show();
      return;
    }
    panel_card_tools.hide();
  }

  private filterItems( items: any[] ) {
    if ( items ) {
      return items.filter( item => {
        // debugger;
        let parent_entity_values = this._getParentEntityValues();
        let parent_entity_result = item[ parent_entity_values[ 'field_name' ] ] === parent_entity_values[ 'field_value' ];

        // console.log('parent_entity_values ' + JSON.stringify(parent_entity_values));

        if ( this.query ) {
          let OfferName    = item.OfferName.toLowerCase();
          let query_result = OfferName.indexOf( this.query ) >= 0;
          return parent_entity_result && query_result;
        }
        return parent_entity_result;
      } );
    }
    return items;
  }

  private _getParentEntityValues() {
    return {
      field_name:  this.app.getAssociatedEntityBindColumn( this.entityAbbr ),
      field_value: this.app.getAppData( 'formEntitySingleId' ),
    };
  }

  private sortItems( items: any[] ) {
    if ( items && this.orderProp ) {
      return items
        .slice( 0 ) // Make a copy
        .sort( ( a, b ) => {
          if ( a[ this.orderProp ] < b[ this.orderProp ] ) {
            return -1;
          } else if ( [ b[ this.orderProp ] < a[ this.orderProp ] ] ) {
            return 1;
          } else {
            return 0;
          }
        } );
    }
    return items;
  }

  saveEntityItemsChanges() {
    // this.app.setAppData('sidebarFormShown', false);
    // this.app.setAppData('sidebarShown', false);
    if ( this.app.getAppData( 'formDataSavedObserved' ) ) {
      // return;
    }
    this.app.setAppData( 'formDataSavedObserved', true );

    this.associatedEntityGetAll();


    //   .then( ( entityItems ) => {
    //     debugger;
    //     for ( let itmId in entityItems ) {
    //       if ( entityItems.hasOwnProperty( itmId ) ) {
    //         let entityItm = entityItems[ itmId ]
    //         if ( !entityItm._data.modified ) {
    //           return;
    //         }
    //         if ( entityItm._data.toDelete ) {
    //           entityItm[ this.associatedField ] = null;
    //         }
    //         //debugger;
    //         this.app.saveOne( entityItm ).then( ( result: any ) => {
    //           // entityItm._data.modified = false;
    //         } );
    //       }
    //     }
    //   }
    // );

  }

  hasEntityItems() {
    return (undefined !== this.entityItems && this.entityItems.length !== 0);
  }

  getEntityItems(): any {
    return this.filterItems( this.entityItems );
  }

  private associatedEntityGetAll(): Promise<any> {
    if ( !this._hasAssociatedEntities() ) {
      return Promise.resolve( false );
    }

    if ( this.app.associatedEntityIsManyToMany( this.entityAbbr ) ) {
      this.app.getAllJoinLinked( this.entityType )
        .then( ( entityItems ) => {
          if ( undefined === entityItems ) {
            debugger;
          }
          this.routerEntityLoaded = true;
          this.entityItems        = this._processAssociatedEntities( entityItems );
          return Promise.resolve( entityItems );
        } );
    } else {
      this.app.getAll( this.entityType )
        .then( ( entityItems ) => {
          if ( undefined === entityItems ) {
            debugger;
          }
          this.routerEntityLoaded = true;
          this.entityItems        = this._processAssociatedEntities( entityItems );
          return Promise.resolve( entityItems );
        } );
    }
  }

  private _hasAssociatedEntities() {
    if ( this.app.getAppData( 'sidebarFormShown' ) ) {
      return false;
    }
    return true;
  }

  private _processAssociatedEntities( entityItems: any ): any {
    if ( undefined === entityItems ) {
      debugger;
    }
    let processedEntityItems: any = [];

    entityItems.forEach( ( entityItm: any, key: any ) => {
      if ( undefined === entityItm._data ) {
        this._processAssociatedEntitySingle( entityItm );
      }
      processedEntityItems.push( entityItm );
    } )
    // if (this.entityAbbr == 'FIC') {
    //   for ( let i = 0; i < processedEntityItems.length; i++ ) {
    //     if (processedEntityItems[i].FilterConditionValue == 1) {
    //       processedEntityItems[i].FilterConditionValue = 'is Male';
    //     } else {
    //       processedEntityItems[i].FilterConditionValue = 'is Female';
    //     }
    //   }
    // }
    // if (this.entityAbbr == 'BUD') {
    //   for ( let i = 0; i < processedEntityItems.length; i++ ) {
    //     if (processedEntityItems[i].BudgetInterval == 1) {
    //       processedEntityItems[i].BudgetInterval = 'Daily';
    //     } else if ( processedEntityItems[i].BudgetInterval == 2 ) {
    //       processedEntityItems[i].BudgetInterval = 'Weekly';
    //     } else { processedEntityItems[i].BudgetInterval = 'Monthly'}
    //   }
    // }
    return processedEntityItems;
  }

  _processAssociatedEntitySingle( entityItm: any ): any {
    entityItm       = this._hackEntitySingle( entityItm );
    entityItm._data = {
      toDelete:   false,
      modified:   false,
      entityType: this.entityType,
      entityAbbr: this.entityAbbr,
    };

    return entityItm;
  }

  _hackEntitySingle( entityItm: any ): any {
    if ( undefined === this.app.getAppData( 'sidebarData' ) ) {
      return entityItm;
    }

    let clickedItm = this.app.getAppData( 'sidebarData' ).entityItm;
    if ( undefined === clickedItm ) {
      return entityItm;
    }

    switch ( this.app.getAppData( 'formEntityAbbr' ) ) {
      case 'OFF':
        entityItm.BudgetName = clickedItm.BudgetName;
        break;
      case 'ADV':
        entityItm.AdvertiserId = this.app.getAppData( 'formEntity' ).AdvertiserId;
        // entityItm.OfferName = clickedItm.OfferName;
        break;
    }
    return entityItm;
  }

  entityNewInSidebar(): void {
    console.log( 'entityNewInSidebar: this.entityAbbr ' + this.entityAbbr );
    if ( this.entityAbbr === 'FIC' ) {
      this.app.setAppData( 'formDataSavedObserved', false );
      this.app.showEntityInSidebar( 'FIO' );
      this.app.setAppData( 'FIC_addingNew', true );
    } else {
      this.app.setAppData( 'formDataSavedObserved', false );
      this.app.showEntityInSidebarForm( this.entityAbbr );
    }
  }

  entityLinkAdd(): void {
    console.log( 'addEntityLink: this.entityAbbr ' + this.entityAbbr );

    if ( this.entityAbbr === 'FIC' ) {
      this.app.setAppData( 'formDataSavedObserved', false );
      this.app.showEntityInSidebar( 'FIO' );
      this.app.setAppData( 'FIC_addingNew', true );

      return;
    }

    let sidebarData = {
      entityLink: true,
      source:     AppSettings.ENTITY_LINK_FOR_EOA_ASSOCIATED_ENTITY,
    };
    this.app.setAppData( 'sidebarData', sidebarData );
    this.app.showEntityLink( this.entityAbbr );
  }

  entityLinkUpdate() {
    let sidebarData = this.app.getAppData( 'sidebarData' );
    if ( sidebarData.entityLink === false ) {
      return;
    }
    if ( sidebarData.source !== AppSettings.ENTITY_LINK_FOR_EOA_ASSOCIATED_ENTITY ) {
      return;
    }

    let returnedEntityItm = this._entityLinkProcessReturnedItm(
      this.app.getAppData( 'sidebarData' ).entityItm
    );

    // @hack
    if ( this.app.getAppData( 'formEntityAbbr' ) === 'ADS' ) {
      returnedEntityItm.AdId = this.app.getAppData( 'formEntity' ).AdId;
    }

    this.entityItems.push( this._processAssociatedEntitySingle( returnedEntityItm ) );

    if ( this.app.getAppData( 'formEntityAbbr' ) === 'OFF' ) {
      this.app._getAllJoinLinkedProcess1( this.entityItems ).then( ( entity_items ) => {
        this.entityItems = entity_items;
      } );
    }

  }

  _entityLinkProcessReturnedItm( entityItm: any ) {
    // @hack
    if ( this.app.getAppData( 'formEntityAbbr' ) === 'OFF' ) {
      let manyToManyItm = {
        BudgetId: entityItm.BudgetId,
        OfferId:  this.app.getAppData( 'formEntity' ).OfferId,
      };
      return manyToManyItm;
    }
    return entityItm
  }

  entityOpenInSidebar( $event: MouseEvent, entityItm: any ): void {
    // if ( $( $event.toElement ).closest( '.panel-default' ).hasClass( 'display-mode-edit' ) ) {
    //   $event.stopPropagation();
    //   return;
    // }

    if ( this.app.getAppData( 'formEntityAbbr' ) === 'FIL' ) {
      this.app.setAppData( 'formDataSavedObserved', false );
      this.app.setAppData( 'sidebarFormEntityAbbr', 'FIC' );
      this.app.setAppData( 'FIC_DATA', { entity: entityItm } );
    }
    this.app.setAppData( 'FIC_addingNew', false );
    this.app.setAppData( 'formNewRecord', false );
    this.app.setAppData( 'sidebarFormEntity', entityItm );
    this.app.showEntityInSidebarForm( this.entityAbbr );
  }

  getEntityID( entityItm: any ): string {
    return this.app.getFormattedEntityId(
      this.entityAbbr,
      entityItm[ this.app.getEntityPk( this.entityAbbr ) ]
    );
  }

  getAssociatedEntityColumnNames(): any {
    if (
      undefined === this.app.getAppData( 'entities' )[ this.app.getAppData( 'formEntityAbbr' ) ].associatedEntities
      || undefined === this.app.getAppData( 'entities' )[ this.app.getAppData( 'formEntityAbbr' ) ].associatedEntities[ this.entityAbbr ]
    ) {
      return;
    }
    this.associatedEntityColumnNames = Object.keys( this.app.getAssociatedEntityColumns( this.entityAbbr ) );
    console.log( 'this.associatedEntityColumnNames ' + JSON.stringify( this.associatedEntityColumnNames ) );
  }

  getAssociatedEntityColumnItems( columnName: string ): any {
    if ( undefined === this.app.getAssociatedEntityColumns( this.entityAbbr ) ) {
      return;
    }
    let columnIDs = this.app.getAssociatedEntityColumns( this.entityAbbr )[ columnName ];
    for ( let i = 0; i < columnIDs.length; i++ ) {
      let columnID = columnIDs[ i ];
      if ( columnID.indexOf( '_BUD_' ) !== -1 ) {
        columnIDs[ i ] = columnID.replace( this.app._getEntityLinkingToken( 'BUA' ), '' );
      }
    }

    return columnIDs;
  }
}
