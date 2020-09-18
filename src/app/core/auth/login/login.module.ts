import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthModule } from '../module/auth/auth.module';
import { SpinnerModule } from 'src/app/shared/components/spinner/spinner.module';


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
    RouterModule.forChild(routes),
    
    SpinnerModule
  ]
})

export class LoginModule {

}