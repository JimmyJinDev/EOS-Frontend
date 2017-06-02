import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit, Output,
  ViewEncapsulation
} from '@angular/core';
import { EOAFormGroup } from './eoa-form-group';
import { FormControlBase } from './form-control-base';
import { AppService } from '../service/app.service';
import { AppSidebarComponent } from '../common/sidebar/app-sidebar.component';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbEOADateParserFormatterDirective } from '../common/directives/ngbEOADateParserFormatter';
import { AppSettings } from '../app-settings';

@Component( {
  selector:      'df-formfield',
  templateUrl:   './dynamic-form.component.html',
  encapsulation: ViewEncapsulation.None,
  providers:     [ AppSidebarComponent, NgbDatepickerConfig, NgbEOADateParserFormatterDirective ],
} )
export class DynamicFormComponent implements OnInit, AfterViewInit {
  @Input() form: EOAFormGroup;
  @Input() formField: FormControlBase<any>;
  @Input() clearFieldButtonOnClick: any;
  @Input() data: any;
  @Input() isDisabled       = false;
  @Output() dateValueChange = new EventEmitter<any>();

  dateValue: string;

  constructor( public app: AppService,
               private _changeDetectionRef: ChangeDetectorRef,
               private datePickerConfig: NgbDatepickerConfig,
               private ngbDateParserFormatter: NgbEOADateParserFormatterDirective ) {
    // this.isDisabled = false;
  }

  ngOnInit() {
    this.app.sidebarReturnLinkObserve().subscribe( ( val: boolean ) => {
      if ( val ) {
        this.returnLinkUpdate();
      }
    } );

    // customize default values of datepickers used by this component tree
    let d                             = new Date();
    this.datePickerConfig.minDate     = { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
    this.datePickerConfig.maxDate     = { year: 2099, month: 12, day: 31 };
    this.datePickerConfig.outsideDays = 'hidden';

    if ( this.formField === undefined ) {
      console.log( 'FormField is undefined. Called from sidebar? - Check app-sidebar-form.service.ts field definitions' )
      debugger;
    }

    if ( this.formField.controlType === 'entityLink' ) {
      this._initEntityLinkField();
    }
  }

  private _initEntityLinkField(): void {
    let entityAbbr     = this.formField[ 'data' ].entityLinkAbbr;
    let entityLinkType = this.app.getEntityTypeFromAbbr( entityAbbr );
    let entityLinkID   = this.form.controls[ this.formField.key ].value;

    this.formField.data.dataPreffix = this._getLinkFieldPreffix( entityAbbr );

    if ( this.app.getAppData( 'formNewRecord' ) === true ) {
      return;
    }
    this.app.getOne( entityLinkID, entityLinkType ).then( ( result ) => {
      this.formField.data.dataSuffix = this._setEntityLinkSuffix( result );
    } );
  }

  private _setEntityLinkSuffix( result: any ): string {
    return result[ this.formField[ 'data' ].entityLinkSuffixField ];
  }

  ngAfterViewInit(): void {
    if ( this.formField.controlType === 'entityLink' ) {
      this.formField.data.dataValue = this.form.controls[ this.formField.key ].value;
    }
    // this._unknownFunction();
    this._changeDetectionRef.detectChanges();
  }

  /**
   * // @TODO: What's this?
   * @private
   */
  private _unknownFunction() {
    if ( this.app.getAppData( 'sidebarFormShown' ) ) {
      this.formField.data.dataPreffix = this._getLinkFieldPreffix( this.app.getAppData( 'formEntityAbbr' ) );
      let formEntitySingle            = this.app.getAppData( 'formEntity' );
      if ( undefined !== formEntitySingle ) {
        this.formField.data.dataSuffix = formEntitySingle[
          this.app.getAppData( 'entities' )[ this.app.getAppData( 'formEntityAbbr' ) ].sidebarFields.text_1
          ];
      }
    }
  }

  get isValid() {
    return this.form.controls[ this.formField.key ].valid;
  }

  chooseEntityInSidebar( formFieldKey: string ) {
    let sidebarData = {
      entityLink:   true,
      source:       AppSettings.ENTITY_LINK_FOR_DYNAMIC_FORMFIELD,
      formFieldKey: formFieldKey,
      query:        this.form.controls[ formFieldKey ].value
    };
    this.app.setAppData( 'sidebarData', sidebarData );

    this.app.showEntityLink( this.formField.data.entityLinkAbbr );
  }

  private _getLinkFieldPreffix( val: string ) {
    return val + ' -';
  }

  // @TODO: remove entityLink
  returnLinkUpdate() {
    if ( this.formField.controlType !== 'entityLink' ) {
      return;
    }

    let sidebarData = this.app.getAppData( 'sidebarData' );
    if ( sidebarData.formFieldKey !== this.formField.key ) {
      return;
    }
    if ( sidebarData.entityLink === false ) {
      return;
    }

    if ( this.form.controls[ sidebarData.formFieldKey ] === undefined ) {
      return;
    }

    this.formField.data.dataValue = sidebarData.entityItm[ this.app.getEntityPk( this.app.getAppData( 'sidebarEntityAbbr' ) ) ];
    this.form.controls[ sidebarData.formFieldKey ].setValue( this.formField.data.dataValue );
    this.formField.data.dataPreffix = this._getLinkFieldPreffix( this.app.getAppData( 'sidebarEntityAbbr' ) );
    this.formField.data.dataSuffix  = sidebarData.entityItm[ this.formField.data.entityLinkSuffixField ];
    this.app.setAppData( 'sidebarReturnLinkQueued', false );

//    this.app.setAppData('sidebarData', { entityLink: false });
  }

  entityLinkComponentIsDisabled() {
    return this.app.getAppData( 'sidebarShown' );
  }

  /**
   * Date functions
   */
  get dateValueModel() {
    return this.dateValue;
  }

  set dateValueModel( date: any ) {
    // this.form.controls[this.formField.key].setValue(date.year + '/' + date.month + '/' + date.day);
    this.form.controls[ this.formField.key ].setValue(
      this.ngbDateParserFormatter.format( date )
    );
    // this.dateValueChange.next(date);
  }

  hasPrefix(): boolean {
    if ( undefined !== this.formField.prefix && this.formField.prefix !== '' ) {
      return true;
    }
    return false;
  }


  hasSuffix() {
    if ( undefined !== this.formField.suffix && this.formField.suffix !== '' ) {
      return true;
    }
    return false;
  }

  inputValueChanged( $event: any ) {
    this.dateValueChange.emit( $event );
  }
}
