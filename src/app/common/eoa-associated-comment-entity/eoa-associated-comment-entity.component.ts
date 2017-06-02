import { Component, EventEmitter, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Advertiser } from '../../entity/advertiser/advertiser.type';
import { FormControlService } from '../../form/form-control.service';
import { AppService } from '../../service/app.service';
import { FakeDataService } from '../../service/fake-data.service';


@Component( {
  selector:      'eoa-associated-comment-entity',
  templateUrl:   './eoa-associated-comment-entity.component.html',
  encapsulation: ViewEncapsulation.None,
  providers:     [],
} )

export class EOAAssociatedCommentEntityComponent implements OnInit {

  @Input() entityType: string;

  //// ** ItemList
  entityItems: any[];
  selectedEntity: Advertiser;
  _entity_type: string = 'advertiser';

  freeTextSearchFormField: any;
  query: string;
  orderProp: string;

  private routerEntityLoaded = false;

  currentBool: boolean = false;
  private fcs: FormControlService;

  router: Router;

  entityListCurrentPage: number;

  searchExpanded: boolean                     = false;
  public searchFieldExpandedFocusEventEmitter = new EventEmitter<boolean>();

//  private router: Router;

//  private advertiserService: AdvertiserService;

  constructor( public app: AppService, public fakeData: FakeDataService ) {
  }


  ngOnInit(): void {
    this.associatedEntityGetAll();
  }


  toggleParentLink( index: number ) {
    this.entityItems[ index ]._data.toDelete = !this.entityItems[ index ]._data.toDelete;
  }

  toggleSearchExpand() {
    this.searchExpanded = !this.searchExpanded;
    if ( this.searchExpanded ) {
      this.searchFieldExpandedFocusEventEmitter.emit( true );
    } else {
      this.query = "";
    }
  }

  private filterItems( items: any[] ) {
    if ( items && this.query ) {
      return items.filter( item => {
        let Entities = item.Comments.toLowerCase();
        return Entities.indexOf( this.query ) >= 0;
      } );
    }
    return items;
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

  getEntityItems() {
    return this.filterItems( this.entityItems );
  }

  private associatedEntityGetAll() {
    this.entityItems = [];

    for ( let i = 1; i < 30; i++ ) {
      this.entityItems.push( this.fakeData.getFakeComment() );
      // delete entityItm.OfferId;
    }


    // this.app.getAll('comment')
    //   .then((entityItems) => {
    //     this.routerEntityLoaded = true;
    //     let processedEntityItems: any = [];
    //     entityItems.forEach((entityItm: any, key: any) => {
    //       entityItm._data = {
    //         toDelete: false,
    //       };
    //       processedEntityItems.push(entityItm);
    //     })
    //     return this.entityItems = processedEntityItems;
    //   });
  }

  readMore( $event: MouseEvent ) {
    this.app.stopEventPropagation( $event );
  }

}
