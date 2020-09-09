import { DOCUMENT } from '@angular/common';
import { Injectable, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationsService {
  isEnglish: boolean;
  constructor(@Inject(DOCUMENT) private document: Document, private translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }
  changeLanguage(value: string): void {
    this.setIsEnglish(value);
    localStorage.setItem('language', value);
    this.translate.setDefaultLang(value);
    this.document.dir = value === 'en' ? 'ltr' : 'rtl';
  }
  setIsEnglish(value: string): void{
    if (value === 'en') {
      this.isEnglish = true;
    }
    else {
      this.isEnglish = false;
  }
  }
}
