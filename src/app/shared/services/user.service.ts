import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string;
  userData: any;
  isLogged$ = new BehaviorSubject(false);

  constructor(private jwtHelper: JwtHelperService) {
    this.userData = this.jwtHelper.decodeToken(this.token);
    this.updateUser();
  }

  public setUser(userToken: string) {
    localStorage.setItem('token', userToken);
    // this.userData = this.jwtHelper.decodeToken(this.token);
    this.updateUser();
    localStorage.setItem('userCode', this.userData.Id);
  }

  updateUser() {
    this.userData = this.jwtHelper.decodeToken(this.token);
    this.isLogged$.next(!!this.userData);
  }

  removeUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('userCode');
    this.updateUser();
  }
  
}
