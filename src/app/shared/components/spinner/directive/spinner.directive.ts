import { Directive, ViewContainerRef } from '@angular/core';
import { SpinnerService } from '../service/spinner.service';

@Directive({
  selector: '[appSpinnerPlaceholder]',
})
export class SpinnerDirective {
  
  constructor(
    public viewContainerRef: ViewContainerRef,
    private _spinnerService: SpinnerService
  ) {
  }

  sendViewContainer() {
    return this._spinnerService.spinnerViewContainerSubject.next(
      this.viewContainerRef
    );
  }
}
