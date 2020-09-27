import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LoadingInterceptor } from '../../services/loading-interceptor.service';
import { SpinnerDirective } from './directive/spinner.directive';
import { SpinnerComponent } from './spinner.component';



@NgModule({
  declarations: [
    SpinnerComponent,
    SpinnerDirective
  ],
  exports: [
    SpinnerDirective
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ]
})
export class SpinnerModule { }
