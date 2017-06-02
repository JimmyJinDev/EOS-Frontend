import { Directive, ElementRef, EventEmitter, Inject, Input, OnInit, Renderer, Renderer2 } from '@angular/core';

@Directive({
  selector: '[formFieldfocus]'
})
export class FormFieldFocusDirective implements OnInit {
  @Input('formFieldfocus') focusEvent: EventEmitter<boolean>;

  constructor(@Inject(ElementRef) private element: ElementRef, private renderer: Renderer) {
  }

  ngOnInit() {
    this.focusEvent.subscribe((event: any) => {
      this.renderer.invokeElementMethod(this.element.nativeElement, 'focus', []);
    });
  }
}