import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class CoreService {

    constructor(private title: Title, private toastrService: ToastrService) {
    }

    public handleError(error: any) {
        return throwError(error);
    }

    public changeTabTitle(title: string) {
      this.title.setTitle(title);
    }

    showSuccess(message?: string) {
      this.toastrService.success(message);
    }

    showWarning(message?: string) {
      this.toastrService.warning(message);
    }

    showError(message?: string) {
      this.toastrService.error(message);
    }
}
