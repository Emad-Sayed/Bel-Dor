import { Component, OnInit, ViewChild } from '@angular/core';
import { SpinnerDirective } from 'src/app/shared/components/spinner/directive/spinner.directive';
import { TranslationsService } from 'src/app/shared/services/translations.service';
import { VisitorTicketsService } from '../visitor-tickets.service';

@Component({
  selector: 'app-ticket-history',
  templateUrl: './ticket-history.component.html',
  styleUrls: ['./ticket-history.component.scss']
})
export class TicketHistoryComponent implements OnInit {
  @ViewChild(SpinnerDirective, {static: true, read: SpinnerDirective}) spinnerPlaceholder: SpinnerDirective;

  slideConfig = {
    arrows: true,
    dot: false,
    infinite: false,
    focusOnSelect: false,
    slidesToShow: 1, 
    slidesToScroll: 1,
    rtl: !this._translationService.isEnglish
  };

  closedTickets = [];

  constructor(
    private _visitorTicketsService: VisitorTicketsService,
    public _translationService: TranslationsService
    ) { }

  ngOnInit(): void {
    this.spinnerPlaceholder.sendViewContainer();

    const data = {
      statusIds: [3],
      pageSize: 100
    };
    this._visitorTicketsService.getVisitorTickets(data)
    .subscribe(res => {
      this.closedTickets = res['data'];
    });
  }

}
