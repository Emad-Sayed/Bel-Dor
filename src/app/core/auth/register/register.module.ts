import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';


const routes: Routes = [
  {
    path: '',
    component: RegisterComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})

export class RegisterModule {

}