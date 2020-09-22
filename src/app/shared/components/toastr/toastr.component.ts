import { Component } from '@angular/core';
import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';

import { toastAnimation } from "../../animations/animations";

@Component({
  selector: '[app-toastr]',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss'],
  animations: [
    toastAnimation
  ],
  preserveWhitespaces: false
})
export class ToastrComponent  extends Toast {

  constructor(
    protected toastrService: ToastrService,
    public toastPackage: ToastPackage
    ) {
    super(toastrService, toastPackage);
  }

}
