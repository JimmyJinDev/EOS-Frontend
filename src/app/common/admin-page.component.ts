import { Component, OnInit } from '@angular/core';
import { FakeDataService } from '../service/fake-data.service';
import { AdvertiserService } from '../entity/advertiser/advertiser.service';
import { OfferService } from '../entity/offer/offer.service';
import { BudgetService } from '../entity/budget/budget.service';
import { AppService } from '../service/app.service';

@Component( {
  selector:    'admin-page',
  templateUrl: './admin-page.component.html',
  // providers:     [ BudgetFormService ],
} )
export class AdminPageComponent implements OnInit {
  public data: any                  = {};
         submittedAndSaved: boolean = false;

  constructor( public fakeData: FakeDataService,
               public advertiserService: AdvertiserService,
               public offerService: OfferService,
               public budgetService: BudgetService,
               public app: AppService, ) {
  }

  ngOnInit(): void {
    this.data = {};
  }

  exportFakeADV() {
    this.submittedAndSaved = false;

    for ( let i = 1; i < 30; i++ ) {
      let entityItm = this.fakeData.getFakeAdvertiser();
      delete entityItm.AdvertiserId;

      this.advertiserService.saveOne( entityItm ).then(
        ( result ) => this._afterSave( result )
      );
    }
  }

  exportFakeOFF() {
    this.submittedAndSaved = false;


    for ( let i = 1; i < 30; i++ ) {
      let entityItm = this.fakeData.getFakeOffer();
      delete entityItm.OfferId;
      this.offerService.saveOne( entityItm ).then(
        ( result ) => this._afterSave( result )
      );
    }
  }

  exportFakeBUD() {
    this.submittedAndSaved = false;
    for ( let i = 1; i < 30; i++ ) {
      let entityItm = this.fakeData.getFakeBudget();
      delete entityItm.BudgetId;
      this.budgetService.saveOne( entityItm ).then(
        ( result ) => this._afterSave( result )
      );
    }
  }

  exportFakeADS() {
    this.submittedAndSaved = false;
    for ( let i = 1; i < 30; i++ ) {
      let entityItm = this._pruneEntity( this.fakeData.getFakeAd(), 'ADS' );

      this.app.saveOne( entityItm, 'ADS' ).then(
        ( result ) => this._afterSave( result )
      );
    }
  }

  _pruneEntity( entityItm: any, entityAbbr: string ): any {
    let prunnedEntity = entityItm;

    switch ( entityAbbr ) {
      case 'ADS':
        delete prunnedEntity.AdId;
        break;
      case 'BUD':
        delete entityItm.BudgetId;
        break;
    }

    if ( this.app.dev_mode !== 'jit' ) {
      // Get proper StatusReasonID
      let statusReasonId         = this.app._getRandomArbitrary( 1, this.app.getAppData( 'appDataTypes' ).statusReason.length );
      prunnedEntity.StatusReasonId = statusReasonId;
    }

    return prunnedEntity;
  }

  _afterSave( result: any ) {
    if ( undefined === result ) {
      return;
    }
    if ( 'Success' !== result ) {
      return;
    }
    this.data.entitySingle = result;
    this.submittedAndSaved = true;
  }
}
