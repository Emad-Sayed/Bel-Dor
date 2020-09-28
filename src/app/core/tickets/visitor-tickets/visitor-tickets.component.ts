import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SpinnerDirective } from 'src/app/shared/components/spinner/directive/spinner.directive';
import { TranslationsService } from 'src/app/shared/services/translations.service';
import { VisitorTicketsService } from './visitor-tickets.service';

@Component({
  selector: 'app-visitor-tickets',
  templateUrl: './visitor-tickets.component.html',
  styleUrls: ['./visitor-tickets.component.scss']
})
export class VisitorTicketsComponent implements OnInit {
  @ViewChild(SpinnerDirective, { static: true, read: SpinnerDirective }) spinnerPlaceholder: SpinnerDirective;

  slideConfig = {
    arrows: true,
    dot: false,
    infinite: false,
    focusOnSelect: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: !this._translationService.isEnglish
  };

  tickets = [];

  param: Params;

  feedbackDetails = {};
  isFeedbackShown = false;

  constructor(
    private _visitorTicketsService: VisitorTicketsService,
    public _translationService: TranslationsService,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.spinnerPlaceholder.sendViewContainer();


    this.actRoute.queryParams
    .subscribe(
      param => {
        console.log(param);
        this.param = param;

        const requestParams = {
          statusIds: [1],
          pageSize: 100
        };
        if (param.ticketType === 'missed') {
          requestParams['statusIds'] = [4];
        }
        else if (param.ticketType === 'closed') {
          requestParams['statusIds'] = [3];
        }

        this._visitorTicketsService.getVisitorTickets(requestParams)
        .subscribe(res => {
          this.tickets = res['data'];
        });
      }
    );
  }

  showFeedbackDetails(id: string) {
    this._visitorTicketsService.getClosedTicketInfo(id)
    .subscribe(res => {
      console.log(res);
      this.feedbackDetails = res['data'];
      this.isFeedbackShown = true;      

    });
  }

}
