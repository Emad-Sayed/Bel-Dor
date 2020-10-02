import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor() { }

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
    console.log(this.registerForm);
    if (this.registerForm.valid) {
      //TODO: register api
    }
  }

}
