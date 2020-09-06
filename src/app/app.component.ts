import { Component } from '@angular/core';
import { TranslationsService } from './shared/services/translations.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
   title = 'bel-dor';
  constructor(private translation: TranslationsService) {
    this.getDefaultLang();
   }
  getDefaultLang() {
    let lang = localStorage.getItem('language') || 'en';
    this.translation.changeLanguage(lang);
  }
  // changeLang(){
  //   this.translation.isEnglish? this.translation.changeLanguage('ar'):this.translation.changeLanguage('en')
  // }
}
