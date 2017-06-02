import { AfterViewInit, ChangeDetectorRef, Component, Injectable, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { AppService } from '../../service/app.service';
import { EOAEntityFormComponent } from '../eoa-entity-form.component';

import { Location } from '@angular/common';
import { FilterAssociationType } from './filterAssociation.type';
import { FilterAssociationFormService } from './filterAssociation-form.service';

@Component( {
  selector:      'filter-form',
  templateUrl:   './filterAssociation-form.component.html',
  encapsulation: ViewEncapsulation.None,
  providers:     [ FilterAssociationFormService ],
} )
@Injectable()
export class FilterAssociationFormComponent extends EOAEntityFormComponent implements OnInit, AfterViewInit {

  constructor( public formControlService: FilterAssociationFormService,
               public app: AppService,
               public route: ActivatedRoute, private router: Router,
               public location: Location,
               private _changeDetectionRef?: ChangeDetectorRef ) {
    super( formControlService, app, route );
  }

  ngOnInit(): void {
    this.data.entity              = new FilterAssociationType;
    this.data.entity_type         = FilterAssociationType._entity_type; // @deprecated since 1.2.2
    this.data.entity_abbreviation = FilterAssociationType._entity_abbreviation;
    this.data.entityName          = this.app.capitalize( this.data.entity_type );

    this.data.collapse = {
      offer:   true,
      comment: true,
      audit:   true,
    }

    this.app.isDataLoaded.subscribe( ( val ) => this.AppDataLoaded( val ) );
  }

  ngAfterViewInit(): void {
    this._changeDetectionRef.detectChanges();
  }

}
