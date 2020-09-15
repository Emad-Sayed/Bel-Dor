import { NgModule } from '@angular/core';
import { TicketsModule } from '../tickets.module';
import { Routes, RouterModule } from '@angular/router';
import { MyTicketsComponent } from './my-tickets.component';


const routes: Routes = [
  {
    path: '',
    component: MyTicketsComponent
  }
];

@NgModule({
  declarations: [MyTicketsComponent],
  imports: [
    TicketsModule,
    RouterModule.forChild(routes)
  ]
})
export class MyTicketsModule { }
