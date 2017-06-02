import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { AppService } from '../service/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EOAEntityFormComponent } from '../entity/eoa-entity-form.component';
import { FormControlService } from './form-control.service';
import { Location } from '@angular/common';

@Component( {
  selector:    'form-footer',
  templateUrl: './form-footer.component.html',
  providers:   [ FormControlService ]
} )

export class FormFooterComponent extends EOAEntityFormComponent {
  @Input() form: any = {};

  constructor( public formControlService: FormControlService,
               public app: AppService,
               public route: ActivatedRoute,
               private router: Router,
               public location: Location, ) {
    super( formControlService, app, route );
  }

}
