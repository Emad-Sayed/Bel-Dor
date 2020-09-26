import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../service/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { SpinnerDirective } from 'src/app/shared/components/spinner/directive/spinner.directive';

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
      [Validators.required, Validators.minLength(6), Validators.maxLength(25)]
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

  get usernameErrors() {
    const errors = this.getFormError('username');
    
    if (!errors) {
      return false;
    }
    if (errors['required']) {
      return 'Username is required!'
    } 
    else if (errors['maxlength'] || errors['minlength']) {
      return 'Username should be 6 - 25 characters!'
    }
  }

  get passwordErrors() {
    const errors = this.getFormError('password');
    
    if (!errors) {
      return false;
    }
    if (errors['required']) {
      return 'Password is required!'
    }
    else if (errors['minlength']) {
      return 'Password should be more than 6 characters!'
    }
  }

  getFormError(controlName: string) {
    return this.loginForm.get(controlName).errors;
  }

  loginVisitor() {
    // console.log(this.loginForm);
    if (this.loginForm.valid) {
      this.spinnerPlaceholder.sendViewContainer();

      this._authService.loginUser(this.loginForm.value)
      .subscribe(
        res => {
          this._userService.setUser(res['token']);

          this.router.navigateByUrl('/tickets');
        }
      );
    }
  }
}
