import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SpinnerDirective } from 'src/app/shared/components/spinner/directive/spinner.directive';
import { TranslationsService } from 'src/app/shared/services/translations.service';
import { VisitorTicketsService } from './visitor-tickets.service';
import { RealTimeCenterService } from 'src/app/shared/services/real-time-center.service';
import { notifyAnimation, slideBottomAnimation } from "../../../shared/animations/animations";

@Component({
  selector: 'app-visitor-tickets',
  templateUrl: './visitor-tickets.component.html',
  styleUrls: ['./visitor-tickets.component.scss'],
  animations: [
    notifyAnimation,
    slideBottomAnimation
  ]
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

  currentNumberUpdated = false;

  constructor(
    private realTimeCenter: RealTimeCenterService,
    private _visitorTicketsService: VisitorTicketsService,
    public _translationService: TranslationsService,
    private actRoute: ActivatedRoute
  ) {
    this.realTimeCenter.notifier.subscribe(
      (data: any) => {
        let selectedTicket = this.tickets.find(t => t['branchDepartementId'] == data.branchDepartementId);
        if (selectedTicket) {
          selectedTicket['currentNumber'] = data.ticketNumber;
          this.currentNumberUpdated = true;

          setTimeout(() => { this.currentNumberUpdated = false }, 1000);
        }
      }
    )
  }

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
              this.addMeToMyRealTimeGroups();
            });
        }
      );
  }
  addMeToMyRealTimeGroups() {
    this.tickets.forEach(element => {
      if (element.statusId == 1)
        this.realTimeCenter.addMeToGroup("V_" + element.branchDepartementId);
    });
  }
  showFeedbackDetails(id: string) {
    if (this.isFeedbackShown) {
      this.isFeedbackShown = false;
      return;
    }
console.log(id);
console.log(this.feedbackDetails['id']);
    if (id === this.feedbackDetails['id']) {
      this.isFeedbackShown = true;
      return;
    }

    this._visitorTicketsService.getClosedTicketInfo(id)
      .subscribe(res => {
        this.feedbackDetails = res['data'];
        this.isFeedbackShown = true;
      });
  }

}
