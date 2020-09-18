import { Injectable, ViewContainerRef } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SpinnerService {
  spinnerViewContainerSubject= new Subject<ViewContainerRef>();
}