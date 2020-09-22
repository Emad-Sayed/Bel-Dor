import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponseBase,
} from '@angular/common/http';
import {
  ViewContainerRef,
  ComponentFactory,
  Injectable,
  ComponentFactoryResolver,
  Injector,
} from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SpinnerService } from '../components/spinner/service/spinner.service';
import { SpinnerComponent } from '../components/spinner/spinner.component';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  requestCounter: number = 0;

  spinnerRef: ViewContainerRef;
  spinnerFactory: ComponentFactory<SpinnerComponent>;

  constructor(
    private injector: Injector,
    private componentFactory: ComponentFactoryResolver
  ) {
    this.spinnerFactory = this.componentFactory.resolveComponentFactory(
      SpinnerComponent
    );
  }

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.requestCounter++;

    const subject = this.injector.get(SpinnerService);
    subject.spinnerViewContainerSubject.subscribe((ref) => {
      this.spinnerRef = ref;
      this.spinnerRef.clear();
    });

    if (this.spinnerRef) {
      this.spinnerRef.createComponent(this.spinnerFactory);
    }

    return next.handle(httpRequest).pipe(
      catchError(
        res => {
          console.log(res);
          this.requestCounter--;
          if (this.requestCounter == 0 && this.spinnerRef)
            this.spinnerRef.clear();
          return throwError(res);
        }
      ),
      tap((req) => {
        if (req instanceof HttpResponseBase) {
          this.requestCounter--;
          if (this.requestCounter == 0 && this.spinnerRef)
            this.spinnerRef.clear();
        }
      })
    );
  }
}
