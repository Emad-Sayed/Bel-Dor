import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeTicketsComponent } from './employee-tickets.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeTicketsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class EmployeeTicketsModule { }
