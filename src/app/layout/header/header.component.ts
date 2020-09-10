import { Component, OnInit } from '@angular/core';
import { TranslationsService } from 'src/app/shared/services/translations.service';
import { NavLink } from './models/nav-link';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  languageForm: FormGroup = new FormGroup({
    language: new FormControl(this._transService.isEnglish? 'en': 'ar')
  });

  navLinks: NavLink[] = [
    {
      name: 'home',
      router: '/home',
      role: 'all'
    },
    {
      name: 'about us',
      router: '/about-us',
      role: 'all'
    },
    {
      name: 'contact',
      router: '/contact',
      role: 'all'
    },
    {
      name: 'login',
      router: '/login',
      role: 'all'
    },
  ];

  constructor(public _transService: TranslationsService) { }

  ngOnInit(): void {
    this.languageForm.valueChanges.subscribe(val => {
      this._transService.changeLanguage(val.language);
    });
  }

}
