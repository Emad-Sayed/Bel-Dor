import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { VisitorTicketsComponent } from './visitor-tickets.component';
import { GenerateTicketComponent } from './generate-ticket/generate-ticket.component';
import { VisitorTicketsService } from './visitor-tickets.service';
import { SpinnerModule } from 'src/app/shared/components/spinner/spinner.module';


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
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),

    SpinnerModule
  ],
  providers: [
    VisitorTicketsService
  ]
})
export class VisitorTicketsModule { }
