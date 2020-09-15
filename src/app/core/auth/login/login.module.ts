import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { AuthService } from '../service/auth.service';
import { AuthModule } from '../module/auth/auth.module';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
]

@NgModule({
  declarations: [LoginComponent],
  imports: [
    AuthModule,
    RouterModule.forChild(routes)
  ]
})

export class LoginModule {

}