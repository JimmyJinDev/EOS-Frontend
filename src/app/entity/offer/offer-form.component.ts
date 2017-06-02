import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import 'rxjs/add/operator/switchMap';

import {AppService} from '../../service/app.service';
import {EOAEntityFormComponent} from '../eoa-entity-form.component';
import {OfferFormService} from './offer-form.service';
import {OfferService} from './offer.service';

import {Offer} from './offer.type';
import {Location} from '@angular/common';

@Component({
  selector: 'offer-form',
  templateUrl: './offer-form.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [OfferFormService],
})
export class OfferFormComponent extends EOAEntityFormComponent implements OnInit, AfterViewInit {

  constructor(public formControlService: OfferFormService,
              public app: AppService,
              public route: ActivatedRoute,
              private router: Router,
              public location: Location,
              private _changeDetectionRef?: ChangeDetectorRef) {
    super(formControlService, app, route);
  }

  ngOnInit(): void {
    this.data.entity = new Offer;
    this.data.entity_type = Offer._entity_type;
    this.data.entity_abbreviation = Offer._entity_abbreviation;
    this.data.entityName = this.app.capitalize(this.data.entity_type);
    this.data.entityService = new OfferService(this.router);

    this.data.collapse = {
      budget: true,
      comment: true,
      audit: true,
    }

    this.app.isDataLoaded.subscribe((val) => this.AppDataLoaded(val));
  }

  ngAfterViewInit(): void {
    this._changeDetectionRef.detectChanges();
  }
}

