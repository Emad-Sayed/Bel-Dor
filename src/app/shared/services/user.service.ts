import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLogged$ = new BehaviorSubject(false);

  constructor(private jwtHelper: JwtHelperService) {
    this.updateUser();
  }

  public setUser(userToken: string) {
    localStorage.setItem('token', userToken);
    const userData = this.jwtHelper.decodeToken(userToken);
    localStorage.setItem('userCode', userData.Id);
    this.updateUser();
  }

  updateUser() {
    this.isLogged$.next(!!localStorage.getItem('token'));
  }

  removeUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('userCode');
    this.updateUser();
  }

}
