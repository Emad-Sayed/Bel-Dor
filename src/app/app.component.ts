import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { TranslationsService } from './shared/services/translations.service';
import { ticketAnimation, contentAnimation } from './shared/animations/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    ticketAnimation,
    contentAnimation
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
}
