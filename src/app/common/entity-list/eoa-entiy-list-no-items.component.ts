import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from '../../service/app.service';


@Component( {
  selector:    'eoa-entity-list-no-items',
  templateUrl: './eoa-entiy-list-no-items.component.html',
  providers:   [],
} )

export class EOAEntityListNoItemsComponent implements OnInit {

  @Input() entityList: any;
  @Input() dataLoaded: boolean;
  @Output() addOneClicked = new EventEmitter<boolean>();

  constructor( public app: AppService ) {
  }

  ngOnInit(): void {
  }

  getEntityListIsEmpty() {
    if ( undefined === this.entityList || this.entityList.length === 0 ) {
      return true;
    }
    return false;
  }

  addOne() {
    this.addOneClicked.emit(true);
  }

}
