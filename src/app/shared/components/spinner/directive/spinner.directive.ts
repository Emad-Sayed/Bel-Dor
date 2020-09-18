import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appSpinnerPlaceholder]'
})
export class SpinnerDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }

}
