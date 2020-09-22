import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastrService: ToastrService) {
  }

  showSuccess(message?: string, title = 'Success') {
    this.toastrService
      .success(message, title, { enableHtml: true });
  }

  showWarning(message?: string) {
    this.toastrService.warning(message);
  }

  showError(message?: string, title = 'An error occurred!') {
    this.toastrService.error(message, title);
  }
}
