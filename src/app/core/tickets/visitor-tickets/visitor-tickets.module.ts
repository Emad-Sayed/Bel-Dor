import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisitorTicketsComponent } from './visitor-tickets.component';
import { GenerateTicketComponent } from './generate-ticket/generate-ticket.component';


const routes: Routes = [
  {
    path: '',
    component: VisitorTicketsComponent
  },
  {
    path: 'generate',
    component: GenerateTicketComponent
  }
];

@NgModule({
  declarations: [VisitorTicketsComponent, GenerateTicketComponent],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class VisitorTicketsModule { }
