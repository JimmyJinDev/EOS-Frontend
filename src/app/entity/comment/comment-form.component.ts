import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';

import 'rxjs/add/operator/switchMap';

import { AppService } from '../../service/app.service';
import { EOAEntityFormComponent } from '../eoa-entity-form.component';
import { CommentFormService } from './comment-form.service';
import { CommentService } from './comment.service';

import { Comment } from './comment.type';
import { Location } from '@angular/common';

@Component({
  selector:      'comment-form',
  templateUrl:   './comment-form.component.html',
  encapsulation: ViewEncapsulation.None,
  providers:     [ CommentFormService ],
})
export class CommentFormComponent extends EOAEntityFormComponent implements OnInit {

  private comment: Comment;

  constructor(public formControlService: CommentFormService,
              public app: AppService,
              public route: ActivatedRoute,
              private router: Router,
              public location: Location,
              private _changeDetectionRef?: ChangeDetectorRef
  ) {
    super(formControlService, app, route);
  }

  ngOnInit(): void {
    this.data.entity = new Comment;
    this.data.entity_type = Comment._entity_type;
    this.data.entity_abbreviation = Comment._entity_abbreviation;
    this.data.entityName = this.app.capitalize(this.data.entity_type);
    this.data.entityService = new CommentService(this.router);;
    this.app.isDataLoaded.subscribe((val) => this.AppDataLoaded(val));

  }

  _entitySingleLoaded(){
    this.app.entity_type = 'comment';
  }

}
