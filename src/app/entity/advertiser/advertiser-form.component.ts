import {
  AfterViewInit,
  ChangeDetectorRef, Component, EventEmitter, Injectable, OnInit, Output,
  ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';

import 'rxjs/add/operator/switchMap';

import { AppService } from '../../service/app.service';
import { EOAEntityFormComponent } from '../eoa-entity-form.component';
import { AdvertiserFormService } from './advertiser-form.service';
import { AdvertiserService } from './advertiser.service';

import { Advertiser } from './advertiser.type';
import { Location } from '@angular/common';

@Component({
  selector: 'advertiser-form',
  templateUrl: './advertiser-form.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [AdvertiserFormService],
})
@Injectable()
export class AdvertiserFormComponent extends EOAEntityFormComponent implements OnInit, AfterViewInit {

  constructor(public formControlService: AdvertiserFormService,
              public app: AppService,
              public route: ActivatedRoute, private router: Router,
              public location: Location,
              private _changeDetectionRef?: ChangeDetectorRef
  ) {
    super(formControlService, app, route);
  }

  ngOnInit(): void {
    this.data.entity = new Advertiser;
    this.data.entity_type = Advertiser._entity_type;
    this.data.entity_abbreviation = Advertiser._entity_abbreviation;
    this.data.entityName = this.app.capitalize(this.data.entity_type);
    this.data.entityService = new AdvertiserService(this.router);

    this.data.collapse = {
      offer: true,
      comment: true,
      audit: true,
    }

    // this.data.relatedForms = {
    //   offer: true,
    //   comment: true,
    //   audit: true,
    // }

    this.app.isDataLoaded.subscribe((val) => this.AppDataLoaded(val));
  }

  ngAfterViewInit(): void {
    this._changeDetectionRef.detectChanges();
  }

}
