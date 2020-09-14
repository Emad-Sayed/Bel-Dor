import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AuthService {

  constructor(private http$: HttpClient) { }

  loginUser(credential: {username: string, password: string, rememberMe: boolean}) {
    return this.http$.post(`${environment.baseUrl}/Auth`, credential);
  }

  registerUser(credential: {username: string, email: string, password: string}) {
    return this.http$.post(`${environment.baseUrl}/Auth`, credential);
  }
}
