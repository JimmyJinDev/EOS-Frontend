import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Injectable,
  OnChanges,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { AppService } from '../../service/app.service';
import { EOAEntityFormComponent } from '../eoa-entity-form.component';
import { AdFormService } from './ad-form.service';

import { Ad } from './ad.type';
import { Location } from '@angular/common';
import { AppSettings } from '../../app-settings';

declare var moment: any;

@Component( {
  selector:      'ad-form',
  templateUrl:   './ad-form.component.html',
  encapsulation: ViewEncapsulation.None,
  providers:     [ AdFormService ],
} )
@Injectable()
export class AdFormComponent extends EOAEntityFormComponent implements OnInit, AfterViewInit {

  constructor( public formControlService: AdFormService,
               public app: AppService,
               public route: ActivatedRoute, private router: Router,
               public location: Location,
               private _changeDetectionRef?: ChangeDetectorRef ) {
    super( formControlService, app, route );
  }

  ngOnInit(): void {
    this.data.entity              = new Ad;
    this.data.entity_type         = Ad._entity_type;
    this.data.entity_abbreviation = Ad._entity_abbreviation;
    this.data.entityName          = this.app.capitalize( this.data.entity_type );

    this.data.collapse = {
      offer:      true,
      adCategory: true,
      filter:     false,
      creative:   true,
      comment:    true,
      audit:      true,
    }

    this.data.calculatedWeightDisabled = false;

    // this.data.relatedForms = {
    //   offer: true,
    //   comment: true,
    //   audit: true,
    // }

    this.app.isDataLoaded.subscribe( ( val ) => this.AppDataLoaded( val ) );
  }

  ngAfterViewInit(): void {
    this._changeDetectionRef.detectChanges();
  }

  startDateChanged( $event: any ) {
    let date   = $event
    date.month = date.month - 1;

    let formatted_date = moment( date ).format( AppSettings.DATE_FORMAT_DEFAULT );
    this.form.controls[ 'DisplayEndDate' ].setValue( formatted_date );
  }

  calculatedWeightChange( $event: any ) {
    if ( $event === '1' ) {
      this.data.calculatedWeightDisabled = false;
    } else {
      this.data.calculatedWeightDisabled = true;
    }
  }

}
