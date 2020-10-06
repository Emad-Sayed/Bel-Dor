import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../service/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { SpinnerDirective } from 'src/app/shared/components/spinner/directive/spinner.directive';
import { Credentials } from '../models/credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild(SpinnerDirective) spinnerPlaceholder: SpinnerDirective;
  
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(
      '', 
      [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]
      ),
    password: new FormControl(
      '', 
      [Validators.required, Validators.minLength(6)]
      ),
    rememberMe: new FormControl(false)
  });

  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  get emailErrors() {
    const errors = this.getFormError('username');
    
    if (!errors) {
      return false;
    }
    if (errors['required']) {
      return 'email-required'
    } 
    else if (errors['maxlength'] || errors['minlength']) {
      return 'email-validation'
    }
  }

  get passwordErrors() {
    const errors = this.getFormError('password');
    
    if (!errors) {
      return false;
    }
    if (errors['required']) {
      return 'password-required'
    }
    else if (errors['minlength']) {
      return 'password-validation'
    }
  }

  getFormError(controlName: string) {
    return this.loginForm.get(controlName).errors;
  }

  loginVisitor() {
    if (this.loginForm.valid) {
      this.spinnerPlaceholder.sendViewContainer();
      const credential: Credentials = this.loginForm.value;

      this._authService.loginUser(credential)
      .subscribe(
        res => {
          this._userService.setUser(res['token'], res['roles'][0]);
          
          const role = localStorage.getItem('role');
          if (role==='EMPLOYEE') {
            this.router.navigateByUrl('/queue');
          } else {
            this.router.navigateByUrl('/tickets');
          }
        }
      );
    }
  }
}
