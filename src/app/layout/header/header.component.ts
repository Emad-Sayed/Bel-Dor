import { Component, OnInit } from '@angular/core';
import { TranslationsService } from 'src/app/shared/services/translations.service';
import { NavLink } from './models/nav-link';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { RealTimeCenterService } from 'src/app/shared/services/real-time-center.service';
import { setting } from 'src/settings/settings.visitor';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  visitorDomain = setting.isVisitor;
  languageForm: FormGroup = new FormGroup({
    language: new FormControl(this._transService.isEnglish? 'en': 'ar')
  });

  navLinks: NavLink[] = [
    {
      name: 'main',
      router: '/',
    },
    {
      name: 'about-us',
      router: '/about-us',
    },
    {
      name: 'contact',
      router: '/contact',
    }
  ];

  responsiveMenuOpened = true;

  constructor(
    private realTimeCenter:RealTimeCenterService,
    public _transService: TranslationsService,
    public _userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.languageForm.valueChanges.subscribe(val => {
      this._transService.changeLanguage(val.language);
    });

    this.router.events.subscribe(() => {
      this.responsiveMenuOpened = false;
    });
  }

  logout() {
    this._userService.removeUser();
    this.router.navigateByUrl('/login');
  }

}
