import { Component, OnInit } from '@angular/core';
import { TranslationsService } from 'src/app/shared/services/translations.service';
import { NavLink } from './models/nav-link';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { RealTimeCenterService } from 'src/app/shared/services/real-time-center.service';

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
      name: 'main',
      router: '/home',
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

  constructor(
    private realTimeCenter:RealTimeCenterService,
    public _transService: TranslationsService,
    public _userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.languageForm.valueChanges.subscribe(val => {
      this._transService.changeLanguage(val.language);
    });
  }

  logout() {
    this._userService.removeUser();
    this.router.navigateByUrl('/login');
  }

}
