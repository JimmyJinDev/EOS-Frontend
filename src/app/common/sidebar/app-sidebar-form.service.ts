import { Injectable } from '@angular/core';
import { DropdownComponent } from '../../form/components/component-dropdown';
import { TextboxComponent } from '../../form/components/component-textbox';
import { FormControlBase } from '../../form/form-control-base';
import { FormControlService } from '../../form/form-control.service';

@Injectable()
export class AppSidebarFormService extends FormControlService {

  /**
   * Sidebar Fields that mimic their counterparts in the Entity Forms.
   * The sidebar will throw an error if there's no such related fields created.
   *
   * @ TODO: Get these dynamically from the -form.service.ts files
   *
   */
  getFormFields() {
    let formFields = {

      // Sidebar
      freeTextSearch: new TextboxComponent( {
        key:   'freeTextSearch',
        label: 'Free Text Search',
        type:  'text',
        order: 10
      } ),
      AppEntities:    new DropdownComponent( {
        key:     'AppEntities',
        label:   'Type',
        options: this._getSearchableAppEntities(),
        order:   160
      } ),

      // Ad
      Name: new TextboxComponent( {
        key:   'Name',
        label: 'Name',
        type:  'text',
      } ),
      AdType: new DropdownComponent( {
        key:     'AdType',
        label:   'Type',
        options: this.data.adType,
        type:    'text',
      } ),

      // FilterAssociation
      // Name:        new TextboxComponent( {
      //   key:   'Name',
      //   label: 'Name',
      //   type:  'text',
      // } ),
      Description: new TextboxComponent( {
        key:   'Description',
        label: 'Name',
        type:  'text',
      } ),

      // FilterCondition
      FilterConditionGroup: new DropdownComponent( {
        key:      'FilterConditionGroup',
        label:    'Type',
        options:  this.data.filterConditionGroup,
        required: true,
      } ),
      FilterConditionType:  new DropdownComponent( {
        key:     'FilterConditionType',
        label:   'Type',
        options: this.data.filterConditionType,
      } ),
      FilterConditionValue: new TextboxComponent( {
        key:   'FilterConditionValue',
        label: 'Name',
        type:  'text',
      } ),

      // Advertiser
      PrimaryCity:    new TextboxComponent( {
        key:   'PrimaryCity',
        label: 'City',
        type:  'text',
      } ),
      PrimaryState:   new DropdownComponent( {
        key:     'PrimaryState',
        label:   'State',
        options: this.data.states,
        order:   140
      } ),
      PrimaryCountry: new DropdownComponent( {
        key:     'PrimaryCountry',
        label:   'Country',
        options: this.data.countries,
        order:   140
      } ),

      // Offer
      OfferType: new DropdownComponent( {
        key:     'OfferType',
        label:   'Type',
        options: this.data.offerType,
      } ),

      // Other
      // AddressState:      new DropdownComponent({
      //   key:     'AddressState',
      //   label:   'State',
      //   options: this.data.states,
      //   order:   140
      // }),
      // AddressPostalCode: new TextboxComponent({
      //   key:   'AddressPostalCode',
      //   label: 'Postal Code',
      //   type:  'text',
      //   order: 150
      // }),
      // AddressCountry:    new DropdownComponent({
      //   key:     'AddressCountry',
      //   label:   'Country',
      //   options: this.data.countries,
      //   order:   160
      // }),

    };
    return formFields;
  }

  private _getSearchableAppEntities(): any {
    let searchableEntities = [];
    for ( let entityId in this.data.appEntities ) {
      if ( this.data.appEntities.hasOwnProperty( entityId ) ) {
        let entityItm = this.data.appEntities[ entityId ];
        if ( this.app.getAppData( 'entities' )[ entityItm.key ].appSidebarSearchable !== false ) {
          searchableEntities.push( entityItm );
        }
      }
    }
    return searchableEntities;
  }
}
