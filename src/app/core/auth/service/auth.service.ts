import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Credentials } from '../models/credentials';

@Injectable()
export class AuthService {

  constructor(private http$: HttpClient) { }

  loginUser(credential: Credentials) {
    return this.http$.post(`${environment.baseUrl}Auth`, credential);
  }

  registerUser(credential: Credentials) {
    return this.http$.post(`${environment.baseUrl}User/CreateVisistor`, credential);
  }
}
