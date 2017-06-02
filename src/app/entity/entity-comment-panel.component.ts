import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'entity-comment-panel',
  templateUrl: './entity-comment-panel.component.html',
})

export class EntityCommentPanelComponent implements OnInit {

  @Input() form: any;
  @Input() formFields: any;
  @Input() data: any;

  constructor() {
  }

  ngOnInit() {
  }

}
