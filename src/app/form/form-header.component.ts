import { Component, Input, Output, EventEmitter, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { AppService } from '../service/app.service';
import { Router } from '@angular/router';

declare var _: any;

@Component( {
  selector:    'form-header',
  templateUrl: './form-header.component.html',
} )

export class FormHeaderComponent implements OnInit {
  @Input() data: any = {};

  @Input() statusId: any;
  @Output() statusIdChange       = new EventEmitter<number>();
  @Input() StatusReasonId: any;
  @Output() StatusReasonIdChange = new EventEmitter<number>();
  @Input() submittedAndSaved: boolean;

  @ViewChild( 'messageHolder' ) messageHolder: ElementRef;

  entityAbbreviation: string;
  StatusName            = '';
  StatusNamePrev        = '';
  StatusReason          = '';
  StatusReasonPrev      = '';
  statusList: any       = [];
  statusReasonList: any = [];

  staticAlertClosed = false;

  entityID = '';

  constructor( public app: AppService,
               private router: Router ) {
  }

  ngOnInit() {
    /**
     * Observe formDataLoadedObserve message
     */
    this.app.formDataLoadedObserve().subscribe( ( val: boolean ) => {
      if ( val ) {
        this.initFormHeader();
      }
    } );
  }


  toggleButton( $event: MouseEvent ) {

    $event.preventDefault();
    $event.stopPropagation();
    // debugger;
    // this.statusIdChange.emit(this.statusId);
  }

  ngbOpenChange( $event: MouseEvent ) {
    // console.log( 'this.StatusReason_2' + this.StatusReason );
    // console.log( 'this.statusId_2 ' + this.statusId );


    console.log( 'this.StatusName ' + this.StatusName );

    let closed = !$event;
    let open   = $event;

    if ( open ) {
      this.StatusNamePrev = this.StatusName;
    }

    let oddValue: number = this.statusList[ 0 ].key;
    if ( this.statusId === oddValue ) {
      this.statusId   = this.statusList[ 1 ].key;
      this.StatusName = this.statusList[ 1 ].value;
    } else {
      this.statusId   = this.statusList[ 0 ].key;
      this.StatusName = this.statusList[ 0 ].value;
    }


    if ( open ) {
      this.StatusReason = '...';
    }
    if ( closed ) {
      this.StatusReason = this.StatusReasonPrev;
      console.log( 'this.StatusName_3 ' + this.StatusName );
    }
    console.log( 'this.statusId' + this.statusId );

    // if ( closed ) {
    //   if ( ) {
    //
    //   }
    // }
  }

  selectStatusReason( index: number ): void {
    this.StatusReason     = this.statusReasonList[ index ].StatusReason;
    this.StatusReasonPrev = this.StatusReason;
    this.StatusNamePrev   = this.StatusName;

    this.statusId = index;


    this.StatusReasonIdChange.emit( this.StatusReasonId );
  }

  initFormHeader(): void {
    this.statusList         = this.app.getAppData( 'appDataTypes' )[ 'status' ];
    this.statusReasonList   = this.app.getAppData( 'appDataTypes' )[ 'statusReason' ];
    this.entityAbbreviation = this.app.getAppData( 'formEntityAbbr' );

    this.StatusName       = this.statusList[ 0 ].value;
    this.StatusReason     = this.statusReasonList[ 0 ].StatusReason;
    this.StatusNamePrev   = this.StatusName;
    this.StatusReasonPrev = this.StatusReason;

    this.setEntityID();
  }

  getStatusReasonList() {
    if ( undefined === this.statusId ) {
      return;
    }

    return this.statusReasonList = _.filter(
      this.app.getAppData( 'appDataTypes' )[ 'statusReason' ], [ 'StatusId', this.statusId ]
    );
  }

  setEntityID() {
    return this.entityID = (this.data.newRecord) ?
      ' [NEW] '
      : this.data.entitySingle[ this.app.getEntityPk( this.data.entity_abbreviation ) ];
  }

  getSidebarFormState(): boolean {
    return this.app.getAppData( 'sidebarFormShown' );
  }

  hideSidebar( state: boolean ): void {
    this.app.setAppData( 'sidebarFormShown', state );
    this.app.setAppData( 'sidebarShown', state );
  }

  isFIC() {
    return this.data.entity_type === 'filtercondition';
  }

  goBackToFIC() {
    this.app.showEntityInSidebar( 'FIC' );
  }
}
