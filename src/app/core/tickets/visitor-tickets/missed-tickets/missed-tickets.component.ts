import { Component, OnInit, ViewChild } from '@angular/core';
import { SpinnerDirective } from 'src/app/shared/components/spinner/directive/spinner.directive';
import { TranslationsService } from 'src/app/shared/services/translations.service';
import { VisitorTicketsService } from '../visitor-tickets.service';

@Component({
  selector: 'app-missed-tickets',
  templateUrl: './missed-tickets.component.html',
  styleUrls: ['./missed-tickets.component.scss']
})
export class MissedTicketsComponent implements OnInit {
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

  missedTickets = [];

  constructor(
    private _visitorTicketsService: VisitorTicketsService,
    public _translationService: TranslationsService
    ) { }

  ngOnInit(): void {
    this.spinnerPlaceholder.sendViewContainer();

    const data = {
      statusIds: [4],
      pageSize: 100
    };
    this._visitorTicketsService.getVisitorTickets(data)
    .subscribe(res => {
      this.missedTickets = res['data'];
    });
  }

}
