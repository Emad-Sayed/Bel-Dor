import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SpinnerDirective } from 'src/app/shared/components/spinner/directive/spinner.directive';
import { TranslationsService } from 'src/app/shared/services/translations.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {
  @ViewChild(SpinnerDirective, {static: true, read: SpinnerDirective}) spinnerPlaceholder: SpinnerDirective;

  ticketQueue = [];

  param: Params;

  queueActivated = false;

  constructor(
    private actRoute: ActivatedRoute,
    public _translationService: TranslationsService,
    private _employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.actRoute.queryParams
    .subscribe(param => {
      this.spinnerPlaceholder.sendViewContainer();
      this.param = param;
      const data = {
        statusIds: [1],
        pageSize: 100
      }
      if (this.param.queueType === 'missed') {
        data['statusIds'] = [4];
      }

      this.updateQueue(data);
    });
  }

  updateQueue(data: {statusIds: any, pageSize: any}) {
    this._employeeService.getEmployeeDailyTickets(data)
      .subscribe(res => {
        console.log(res);
        this.ticketQueue = res['data'];
      });
  }

  nextInQueue() {
    this.queueActivated = true;

    this._employeeService.serveTicket()
    .subscribe();
  }

  removeFromQueue() {
    this.queueActivated = false;

    this._employeeService.closeServedTicket()
    .subscribe(() => {
      this.updateQueue({statusIds: [1], pageSize: 100})
    });
  }

}
