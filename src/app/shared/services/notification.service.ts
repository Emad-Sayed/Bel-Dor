import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslationsService } from './translations.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastrService: ToastrService, private translationService: TranslationsService) {
  }

  showSuccess(message?: string, title = this.translationService.isEnglish? 'Success': 'نجاح') {
    this.toastrService
      .success(message, title, { enableHtml: true });
  }

  showWarning(message?: string) {
    this.toastrService.warning(message);
  }

  showError(message?: string, title = this.translationService.isEnglish? 'An error occurred!': 'حدث مشكله!') {
    this.toastrService.error(message, title, { enableHtml: true });
  }
}
