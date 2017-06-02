import { Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[formInline]'
})
export class FormInlineDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}