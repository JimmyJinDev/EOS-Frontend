import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';
import { OfferFormComponent } from './entity/offer/offer-form.component';
import { AppService } from './service/app.service';
import { AuthService } from './service/auth.service';
import { BaseService } from './service/base.service';
import { BudgetFormComponent } from './entity/budget/budget-form.component';
import { FilterConditionFormService } from './entity/filterCondition/filterCondition-form.service';
import { FilterConditionFormComponent } from './entity/filterCondition/filterCondition-form.component';

declare var $: any;

@Component( {
  selector:    'my-app',
  templateUrl: './app.component.html',
  providers:   [ BaseService ]
} )
export class AppComponent implements AfterViewInit {

  @ViewChild( 'search' ) search: ElementRef;

  title: string;
  isLoggedIn: Observable<boolean>;
  data: any                    = {};
  public formSubmittedAndSaved = false;

  routeEntityLoaded = false;

  public constructor( private titleService: Title,
                      private router: Router,
                      public authService: AuthService,
                      public app: AppService,
                      private _changeDetectionRef: ChangeDetectorRef ) {
    this.isLoggedIn = authService.isLoggedIn();

    app.loadData();
  }

  ngOnInit() {
    this._setEOAAssociatedEntityFormComponentValues();

    this.router.events.subscribe( ( event ) => {
      if ( event instanceof NavigationEnd ) {
        this.title = this._getDeepestTitle( this.router.routerState.snapshot.root );
        this.setTitle( this.title );
        this.app.setAppData( 'sidebarShown', false );
        this.app.setAppData( 'sidebarFormShown', false );
      }
    } );

    // Observable.fromEvent(this.search.nativeElement, 'keyup')
    //   .subscribe((data: KeyboardEvent) => console.log(data.key));

    /**
     * Observe sidebarShownQueued message
     * entityLink-aware
     */
    this.app.allPanelsToViewModeObserve().subscribe( ( val: boolean ) => {
      if ( val ) {
        this.allPanelsToViewMode();
      }
    } );

    /**
     * Observe formDataSavedSubject message
     */
    this.app.formDataSavedObserve().subscribe( ( val: boolean ) => {
      if ( val ) {
        this.formDataSaved();
      }
    } );

    let event = new CustomEvent( 'angular-ready' );
    document.dispatchEvent( event );
  }

  _setEOAAssociatedEntityFormComponentValues() {
    let entity_details                     = this.app.getAppData( 'entities' );
    entity_details[ 'OFF' ].form_component = OfferFormComponent;
    entity_details[ 'BUD' ].form_component = BudgetFormComponent;
    entity_details[ 'FIC' ].form_component = FilterConditionFormComponent;
    this.app.setAppData( 'entities', entity_details );
  }

  ngAfterViewInit(): void {
    // this._changeDetectionRef.detectChanges();
  }

  public EOA_entityLoaded( state: string ) {
    console.log( 'state ' + state );
    this.routeEntityLoaded = true;
  }

  overlayShown( val?: boolean ): boolean {
    return (undefined === val) ?
      (!!this.app.getAppData( 'sidebarShown' ) || !!this.app.getAppData( 'sidebarFormShown' ))
      : val;
  }

  formDataSaved() {
    this.formSubmittedAndSaved = true;
    this.app.EOA_NavigateTo( 'current_entity_list' );
  }

  hideOverlays() {
    this.app.setAppData( 'sidebarShown', false );
    this.app.setAppData( 'sidebarFormShown', false );
  }

  public setTitle( newTitle: string ) {
    this.titleService.setTitle( newTitle );
  }

  private _getDeepestTitle( routeSnapshot: ActivatedRouteSnapshot ) {
    let title = routeSnapshot.data ? routeSnapshot.data[ 'title' ] : '';
    if ( routeSnapshot.firstChild ) {
      title = this._getDeepestTitle( routeSnapshot.firstChild ) || title;
    }
    return title;
  }

  togglePanels( $event: MouseEvent ) {
    // console.log('$event.toElement ' + $event.toElement.className);
    switch ( $event.toElement.className ) {
      case 'layout-table':
      case 'panel-title':
        return;
    }
    if ( $( $event.toElement ).closest( '.panel-default' ).length !== 0 ) {
      return;
    }

    this.app.setAppData( 'allPanelsToViewMode', true );
    this.app.allPanelsToViewModeSubject.next( true );
  }

  allPanelsToViewMode() {
    return;
    // console.log('gaga');
    // $('.panel-card.display-mode-edit').removeClass('display-mode-edit').addClass('display-mode-view');
    // this.app.setAppData('allPanelsToViewMode', true);
  }
}


