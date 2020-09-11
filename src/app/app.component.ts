import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { TranslationsService } from './shared/services/translations.service';
import { ticketAnimation } from './shared/animations/ticket-animation';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    ticketAnimation
  ]
})
export class AppComponent implements AfterViewInit {
  showPageContent = false;

  constructor(
    private translation: TranslationsService,
    private cdr: ChangeDetectorRef) {
    this.getDefaultLang();
  }
  ngAfterViewInit() {
    this.showPageContent = true;
    this.cdr.detectChanges();
  }
  getDefaultLang() {
    let lang = localStorage.getItem('language') || 'en';
    this.translation.changeLanguage(lang);
  }
  
  // prepareRoute(outlet: RouterOutlet) {
  //   return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  // }
}
