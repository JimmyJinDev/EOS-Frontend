import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import 'rxjs/add/operator/switchMap';

import {AppService} from '../../service/app.service';
import {EOAEntityFormComponent} from '../eoa-entity-form.component';
import {ProductLineFormService} from './productLine-form.service';
import {ProductLineService} from './productLine.service';

import {ProductLine} from './productLine.type';
import {Location} from '@angular/common';

@Component({
  selector: 'productLine-form',
  templateUrl: './productLine-form.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [ProductLineFormService],
})
export class ProductLineFormComponent extends EOAEntityFormComponent implements OnInit, AfterViewInit {

  constructor(public formControlService: ProductLineFormService,
              public app: AppService,
              public route: ActivatedRoute,
              private router: Router,
              public location: Location,
              private _changeDetectionRef?: ChangeDetectorRef) {
    super(formControlService, app, route);
  }

  ngOnInit(): void {
    this.data.entity = new ProductLine;
    this.data.entity_type = ProductLine._entity_type;
    this.data.entity_abbreviation = ProductLine._entity_abbreviation;
    this.data.entityName = this.app.capitalize(this.data.entity_type);
    this.data.entityService = new ProductLineService(this.router);

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

