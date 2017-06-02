import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EOAEntity } from './eoa-entity.type';
import { AppService } from '../service/app.service';
import { Location } from '@angular/common';

@Component( {
  selector:    'eoa-entity-list',
  templateUrl: './entity-list.component.html',
} )
export class EntityListComponent implements OnInit {
  entityItems: EOAEntity[];
  selectedEntityItm: EOAEntity;
  entityType: string;
  entityAbbr: string;

  entityListCurrentPage: number;

  constructor( public app: AppService,
               private router: Router,
               public route: ActivatedRoute,
               public location: Location ) {
  }

  ngOnInit(): void {
    this.entityType = this.route.routeConfig.path;
    this.entityAbbr = this.app.getEntityAbbrFromType( this.entityType );
    this.app.setAppData( 'sidebarEntityAbbr', this.entityAbbr );
    this.app.setAppData( 'listEntityAbbr', this.entityAbbr );

    this.getEntityItems();
    this.app.setFormDataLoaded(true);
  }

  getEntityItems(): void {
    this.app.getAll( this.entityType )
      .then( ( entityItems ) => {
        return this.entityItems = entityItems;
      } );
  }

  entityGoTo( entityItm: EOAEntity ): void {
    this.selectedEntityItm = entityItm;
    this.router.navigate( [ '/' + this.entityType + '/', entityItm[ this.app.getEntityPk( this.entityAbbr ) ] ] );
  }

  getEntityID( entityItm: any ) {
    return this.app.getFormattedEntityId(
      this.entityAbbr,
      entityItm[ this.app.getEntityPk( this.entityAbbr ) ]
    );
  }

  getEntityItemDesc( entityItm: any ): string {
    return entityItm[ this.app.getEntitySidebarSearchFields( this.entityAbbr ).text_1 ];
  }

}
