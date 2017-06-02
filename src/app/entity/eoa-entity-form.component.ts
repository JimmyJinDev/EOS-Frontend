import { Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { EOAFormGroup } from '../form/eoa-form-group';

import { FormControlBase } from '../form/form-control-base';
import { FormControlService } from '../form/form-control.service';

import { AppService } from '../service/app.service';
import { Location } from '@angular/common';

export class EOAEntityFormComponent {

  @Input() formFields: FormControlBase<any>[] = [];
  public form: EOAFormGroup;
  public submittedAndSaved                    = false;
           payLoad                            = '';
           dataLoaded                         = false;
           submitted                          = false;
           routerLoaded: number;

  formErrors: any = [];

  public data: any = {
    entity_type:         '',
    entity_abbreviation: '',
    newRecord:           false,
    entityService:       {}, // @deprecated.
    entitySingle:        {},
    panels:              {
      offer: {
        edit_mode: 'view'
      }
    },
    collapse:            {},
    relatedForms:        {}
  };

  formValue: any;

  hasAsassociatedEntityDefined: boolean = false;

  @Input() appDataLoaded: boolean;

  // public formDataSavedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
  //   this.formDataSavedQuery()
  // );

  validationMessages = {
    'name':  {
      'required':      'Name is requiredaqa.',
      'minlength':     'Name must be at least 4 characters long.',
      'maxlength':     'Name cannot be more than 24 characters long.',
      'forbiddenName': 'Someone named "Bob" cannot be a hero.'
    },
    'power': {
      'required': 'Power is required.'
    }
  };

  constructor( public formControlService: FormControlService,
               public app?: AppService,
               public route?: ActivatedRoute,
               public location?: Location, ) {
    this.routerLoaded = 0;
    this.app.setAppData( 'formSubmittedAndSaved', false );
  }

  public AppDataLoaded( isAppDataLoaded: boolean, fromSidebar?: boolean ) {

    if ( !this.app.getAppData( 'sidebarFormShown' ) && !fromSidebar ) {

      this.app.setFormDataLoaded( false );
      this.app.entity_type = this.data.entity_type;

      if ( !this.app.getAppData( 'sidebarFormShown' ) ) {
        this.app.setAppData( 'formEntityType', this.data.entity_type );
        this.app.setAppData( 'formEntityAbbr', this.data.entity_abbreviation );
        this.app.setAppData( 'sidebarEntityAbbr', this.app.getAppData( 'formEntityAbbr' ) );
        this.app.setAppData( 'sidebarEntityType', this.app.getAppData( 'formEntityType' ) );
      } else {
        this.app.setAppData( 'sidebarFormEntityAbbr', this.data.entity_abbreviation );
        this.app.setAppData( 'sidebarFormEntityType', this.data.entity_type );
      }

      if ( this.route.routeConfig === null
        || this.route.routeConfig.path === this.app.getAppData( 'formEntityType' ) + '/new'
      ) {
        this.app.setAppData( 'formNewRecord', true );
      } else {
        this.app.setAppData( 'formNewRecord', false );
      }
    }

    if ( !isAppDataLoaded ) {
      return;
    }

    this._loadFormFields();
    this._showForm( fromSidebar );
  }

  private _loadFormFields(): void {
    this.form = this.formControlService.getForm();

    if ( undefined !== this.form ) {
      this.form.valueChanges
        .subscribe( data => this._onValueChanged( data ) );
    }
    this.formFields = this.form.formFields;

    // this.form.valueChanges
    //   .subscribe(data => this.onValueChanged(data));
    // this.onValueChanged(); // (re)set validation messages now
  }

  private _showForm( fromSidebar: boolean ): void {
    if ( !fromSidebar ) {
      if ( this.app.getAppData( 'formNewRecord' ) === true ) {
        this._showNew();
      } else {
        this._showOne();
      }
    }
  }

  private _onValueChanged( data?: any ) {
    // debugger;
    // console.log('data - ' + data);
    if ( !this.form ) {
      return;
    }
    const form = this.form;

    for ( const field in this.form.controls ) {
      // clear previous error message (if any)
      this.formErrors[ field ] = '';
      const control            = form.get( field );
      if ( control && control.dirty && !control.valid ) {
        const messages = this.validationMessages[ field ];
        for ( const key in control.errors ) {
          this.formErrors[ field ] += field;
        }
      } else {
        if ( !control.valid ) {
          console.log( 'NOT VALID: control ' + field + ' - ' + control.valid );
        }
      }
    }
  }

  private _showNew(): void {
    this.data.newRecord = true;
    this.app.setAppData( 'formNewRecord', true );
    // this.app.setAppData('formEntityType', this.data.entity_type);

    this.dataLoaded = true;
    for ( let key in this.formFields ) {
      if ( this.formFields.hasOwnProperty( key ) ) {
        if ( undefined === this.formFields[ key ] ) {
          return;
        }
        if ( undefined === this.data.entitySingle[ key ] && this.form.controls[ key ].value !== '' ) {
          this.form.controls[ key ].setValue( this.form.controls[ key ].value );
        } else {
          this.form.controls[ key ].setValue( this.data.entitySingle[ key ] );
        }
      }
    }
    if ( this.app.getAppData( 'formEntityAbbr' ) !== 'FIC' ) {
      this.form.controls[ 'StatusId' ].setValue( 1 );
      this.form.controls[ 'StatusReasonId' ].setValue( 1 );
      this.app.setFormDummyData(this.form);
    }

    console.log( 'setFormDataLoaded - _showNew' );
    this.app.setFormDataLoaded( true );
  }

  private _showOne(): void {
    console.log( 'showone' );
    this.app.setAppData( 'formNewRecord', false );

    if ( !this.app.getAppData( 'sidebarFormShown' ) ) {
      this.route.params
        .switchMap( ( params: Params ) => {
          this.app.setAppData( 'formEntitySingleId', +params[ 'id' ] );
          return this.app.getOne( +params[ 'id' ] );
        } )
        .subscribe( entitySingle => {
          if ( entitySingle ) {
            this._fillFormData( entitySingle );
          }
        } );
    } else {
      let entitySingle = this.app.getAppData( 'sidebarFormEntity' );
      this._fillFormData( entitySingle );
    }
  }

  _fillFormData( entitySingle: any ): void {
    // console.log('formEntity ' + JSON.stringify(entitySingle))
    this.app.setAppData( 'formEntity', entitySingle );

    for ( let key in this.formFields ) {
      if ( this.formFields.hasOwnProperty( key ) ) {
        if ( undefined === this.formFields[ key ] ) {
          return;
        }
        this.form.controls[ key ].setValue( entitySingle[ key ] );
      }
    }

    this.dataLoaded = true;

    this._entitySingleLoaded();

    this.hasAsassociatedEntityDefined = this.getHasAsassociatedEntityDefined();

    // @TODO: Dummy data for the DB (API) until we get actual data for these.
    this.app.setFormDummyData(this.form);

    this.data.entitySingle = entitySingle;
  }

  _entitySingleLoaded() {
    if ( this.routerLoaded === 0 ) {

      console.log( 'setFormDataLoaded - _entitySingleLoaded' );
      this.app.setFormDataLoaded( true );
      this.routerLoaded++;
    }
  }

  onSubmit() {
    this.app._log( 'BUG? onSubmit called', 'MSG' );
    this.payLoad = JSON.stringify( this.form.value );
  }

  // @TODO: Rename to 'saveOne'
  saveEntity( $event: MouseEvent ) {
    this.app.stopEventPropagation( $event );

    this.submitted = true;

    // if ( undefined !== this.form.controls[ 'EffectiveDate' ] ) {
    //   let EffectiveDate = this.form.controls[ 'EffectiveDate' ].value;
    //   this.form.controls[ 'EffectiveDate' ].setValue(
    //     EffectiveDate.month + '-' + EffectiveDate.day + '-' + EffectiveDate.year
    //   );
    // }

    this.formValue = this.form.value;
    if ( !this.app.getAppData( 'formNewRecord' ) ) {
      let entityItm = this.app.getAppData( 'formEntity' )

      let entityAbbr = this.app.getAppData( 'formEntityAbbr' );
      if ( this.app.getAppData( 'sidebarFormShown' ) ) {
        entityAbbr = this.app.getAppData( 'sidebarFormEntityAbbr' );
      }
      let idValue = entityItm[ this.app.getEntityPk( entityAbbr ) ];
      if ( undefined !== idValue ) {
        this.formValue[ this.app.getEntityPk( entityAbbr ) ] = idValue;
      }
    }

    if ( !this.app.getAppData( 'sidebarFormShown' ) ) {
      this._saveCurrentEntity();
    } else {
      this._saveCurrentEntity( this.app.getAppData( 'sidebarFormEntityAbbr' ) );
    }
  }

  private _saveCurrentEntity( entityAbbr?: string ) {

    this.app.saveOne( this.formValue, entityAbbr ).then( ( result: any ) => {

      if ( this.app.getAppData( 'formEntityAbbr' ) !== 'FIC' ) {
        if ( this.app.associatedEntityIsManyToMany( this.app.getAppData( 'sidebarFormEntityAbbr' ) ) ) {

          let parentPk = this.app.getEntityPk( this.app.getAppData( 'formEntityAbbr' ) );
          let childPk  = this.app.getEntityPk( this.app.getAppData( 'sidebarFormEntityAbbr' ) );

          let parentPkValue = this.app.getAppData( 'formEntity' )[ parentPk ];
          let childPkValue  = result[ childPk ];
          if ( this.app.dev_mode === 'jit' ) {
            childPkValue = result[ 'id' ];
          }

          let manyToManyEntity         = {};
          manyToManyEntity[ parentPk ] = parentPkValue;
          manyToManyEntity[ childPk ]  = childPkValue;

          this.app.saveOne(
            manyToManyEntity,
            this.app.getAssociatedEntityManyToManyFromChildEntityAbbr( this.app.getAppData( 'sidebarFormEntityAbbr' ) ) )
            .then( ( ManyToManySaveResult: any ) => {
              console.log( 'ManyToManySaveResult - ' + JSON.stringify( ManyToManySaveResult ) );
              this._savedCurrentEntity();
            } );
        } else {
          this._savedCurrentEntity();
        }
      }
    } );
  }

  private _savedCurrentEntity() {
    this.submittedAndSaved = true;
    this.app.setAppData( 'formSubmittedAndSaved', true );
    this.app.formDataSavedSubject.next( true );
  }

  togglePanelCardEditMode( $event: MouseEvent ): void {
    // $event.preventDefault();
    // $event.stopPropagation();

    // .collapse('show')

    (this.data.panels.offer.edit_mode === 'view') ?
      this.data.panels.offer.edit_mode = 'edit'
      : this.data.panels.offer.edit_mode = 'view';

    this.app.setAppData( 'allPanelsToViewMode', false );

  }

  getPanelCardClass( panel_type: string, edit_mode: string ): boolean {
    return false;
    // return this.data.panels[ panel_type ].edit_mode === edit_mode;
  }

  getHasAsassociatedEntityDefined() {
    let formEntityAbbr = this.app.getAppData( 'formEntityAbbr' );

    return (
      undefined !== this.app.getAppData( 'entities' )[ formEntityAbbr ].associatedEntities
      && 0 !== Object.keys( this.app.getAppData( 'entities' )[ formEntityAbbr ].associatedEntities ).length
    );
  }

}
