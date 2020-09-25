import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { VisitorTicketsComponent } from './visitor-tickets.component';
import { GenerateTicketComponent } from './generate-ticket/generate-ticket.component';
import { VisitorTicketsService } from './visitor-tickets.service';
import { SpinnerModule } from 'src/app/shared/components/spinner/spinner.module';
import { TicketHistoryComponent } from './ticket-history/ticket-history.component';
import { VisitorTicketsRoutingModule } from './visitor-tickets-routing.module';
import { TicketGraphicComponent } from 'src/app/shared/components/ticket-graphic/ticket-graphic.component';
import { MissedTicketsComponent } from './missed-tickets/missed-tickets.component';

@NgModule({
  declarations: [
    VisitorTicketsComponent,
    GenerateTicketComponent,
    TicketHistoryComponent,
    TicketGraphicComponent,
    MissedTicketsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VisitorTicketsRoutingModule,

    SpinnerModule,
  ],
  providers: [VisitorTicketsService],
})
export class VisitorTicketsModule {}
