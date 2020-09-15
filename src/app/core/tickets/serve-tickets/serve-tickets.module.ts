import { NgModule } from '@angular/core';
import { TicketsModule } from '../tickets.module';
import { RouterModule, Routes } from '@angular/router';
import { ServeTicketsComponent } from './serve-tickets.component';

const routes: Routes = [
  {
    path: '',
    component: ServeTicketsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    TicketsModule,
    RouterModule.forChild(routes)
  ]
})
export class ServeTicketsModule { }
