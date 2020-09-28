import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenerateTicketComponent } from './generate-ticket/generate-ticket.component';
import { VisitorTicketsComponent } from './visitor-tickets.component';

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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitorTicketsRoutingModule {}
