import { Directive, HostListener } from '@angular/core';

declare var $: any;

@Directive( {
  selector: '[scrollTracker]'
} )
export class ScrollTrackerDirective {

  lastScrollTop = 0;

  @HostListener( 'scroll', [ '$event' ] )
  private onScroll( $event: Event ): void {

    let st = $event.srcElement.scrollTop;
    if ( st > this.lastScrollTop ) {
      // downscroll code
      $('.d-inline-block.dropdown', '#navbar-app-navbar-responsive').removeClass('show');
      $('.d-inline-block button.dropdown-toggle', '#navbar-app-navbar-responsive').prop('aria-expanded', false);
      $( '#navbar-app-navbar-responsive' ).css( 'margin-top', '-170px' )
    } else {
      // upscroll code
      if ( this.lastScrollTop < 10 ) {
        $( '#navbar-app-navbar-responsive' ).css( 'margin-top', '0px' )
      }
    }
  };

  constructor() {
  }
}
