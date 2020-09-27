import { NgModule } from '@angular/core';
import { VisitorTicketsComponent } from './visitor-tickets.component';
import { GenerateTicketComponent } from './generate-ticket/generate-ticket.component';
import { VisitorTicketsService } from './visitor-tickets.service';
import { TicketHistoryComponent } from './ticket-history/ticket-history.component';
import { VisitorTicketsRoutingModule } from './visitor-tickets-routing.module';
import { TicketGraphicComponent } from 'src/app/shared/components/ticket-graphic/ticket-graphic.component';
import { MissedTicketsComponent } from './missed-tickets/missed-tickets.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';

@NgModule({
  declarations: [
    VisitorTicketsComponent,
    GenerateTicketComponent,
    TicketHistoryComponent,
    TicketGraphicComponent,
    MissedTicketsComponent,
  ],
  imports: [
    VisitorTicketsRoutingModule,
    SlickCarouselModule,
    SharedModule,
  ],
  providers: [VisitorTicketsService],
})
export class VisitorTicketsModule {}
