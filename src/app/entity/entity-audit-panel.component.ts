import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'entity-audit-panel',
  templateUrl: './entity-audit-panel.component.html',
})

export class EntityAuditPanelComponent implements OnInit {

  @Input() form: any;
  @Input() formFields: any;
  @Input() data: any;

  constructor() {
  }

  ngOnInit() {
  }

}
