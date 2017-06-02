import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';

import 'rxjs/add/operator/switchMap';

import { AppService } from '../../service/app.service';
import { EOAEntityFormComponent } from '../eoa-entity-form.component';
import { BudgetFormService } from './budget-form.service';
import { BudgetService } from './budget.service';

import { Budget } from './budget.type';
import { Location } from '@angular/common';

@Component({
  selector:      'budget-form',
  templateUrl:   './budget-form.component.html',
  encapsulation: ViewEncapsulation.None,
  providers:     [ BudgetFormService ],
})
export class BudgetFormComponent extends EOAEntityFormComponent implements OnInit {

  constructor(public formControlService: BudgetFormService,
              public app: AppService,
              public route: ActivatedRoute,
              private router: Router,
              public location: Location,
              private _changeDetectionRef?: ChangeDetectorRef
  ) {
    super(formControlService, app, route);
  }

  ngOnInit(): void {
    this.data.entity = new Budget;
    this.data.entity_type = Budget._entity_type;
    this.data.entity_abbreviation = Budget._entity_abbreviation;
    this.data.entityName = this.app.capitalize(this.data.entity_type);
    this.data.entityService = new BudgetService(this.router);

    this.data.collapse = {
      offer: true,
      comment: true,
      audit: true,
    }

    this.app.isDataLoaded.subscribe((val) => this.AppDataLoaded(val));
  }

}
