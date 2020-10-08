import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TranslationsService } from 'src/app/shared/services/translations.service';
import { Credentials } from '../models/credentials';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    username: new FormControl(
      '', 
      [Validators.required, Validators.minLength(6), Validators.maxLength(25)]
      ),
    email: new FormControl(
      '', 
      [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
      ),
    password: new FormControl(
      '', 
      [Validators.required, Validators.minLength(6)]
      )
  });

  constructor(
    private _authService: AuthService,
    public _translationService: TranslationsService,
    private _notifyService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  get usernameErrors() {
    const errors = this.getFormError('username');
    
    if (!errors) {
      return false;
    }
    if (errors['required']) {
      return 'username-required'
    } 
    else if (errors['maxlength'] || errors['minlength']) {
      return 'username-validation'
    }
  }

  get emailErrors() {
    const errors = this.getFormError('email');
    
    if (!errors) {
      return false;
    }
    if (errors['required']) {
      return 'email-required'
    }
    if (errors['pattern']) {
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
    return this.registerForm.get(controlName).errors;
  }

  registerVisitor() {
    if (this.registerForm.valid) {
      const credentials: Credentials = this.registerForm.value;

      let registeredMessage: string;

      this._authService.registerUser(credentials)
      .subscribe(() => {
        this.registerForm.reset();

        registeredMessage = this._translationService.isEnglish? 
        'You have been registered successfully! You can now login.' :
        'تم تسجيلك بنجاح! يمكنك الان تسجيل الدخول.';

        
        this._notifyService.showSuccess(registeredMessage);
        this.router.navigateByUrl('/login');
      },
      (err) => {
        this.registerForm.reset();

        registeredMessage = this._translationService.isEnglish? 
        err.error.error_EN: err.error.error_AR;

        this._notifyService.showError(registeredMessage);
      }
      );
    }
  }

}
