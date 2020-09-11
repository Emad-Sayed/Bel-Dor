import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';


const routes: Routes = [
  {
    path: '',
    component: RegisterComponent
  }
]

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})

export class RegisterModule {

}