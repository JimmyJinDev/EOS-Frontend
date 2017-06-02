import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { AppService } from '../../service/app.service';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../../app-settings';

@Component( {
  selector:    'app-navbar',
  templateUrl: './app-navbar.component.html',
  providers:   []
} )
export class AppNavbarComponent implements OnInit {

  @Input() navbarId: string;

  isLoggedIn: Observable<boolean>;
  navCollapsed = true;

  constructor( public app: AppService,
               public authService: AuthService, ) {

    this.isLoggedIn = authService.isLoggedIn();
  }

  ngOnInit() {
    if ( this.navbarId === AppSettings.APP_NAVBAR_RESPONSIVE ) {
      this.navCollapsed = false;
    }
  }

  appSidebarToggle(): void {
    this.app.setAppData( 'sidebarData', { entityLink: false } );
    this.app.setAppData( 'sidebarData', { query: '' } );

    this.app.setAppData( 'sidebarShownQueued', true );
    this.app.sidebarShownQueuedSubject.next( true );
  }

  isResponsive() {
    if (
      this.navbarId === AppSettings.APP_NAVBAR_RESPONSIVE
    ) {
      return true;
    }
    return false;
  }

  nullMenu() {
    return false;
  }

}
