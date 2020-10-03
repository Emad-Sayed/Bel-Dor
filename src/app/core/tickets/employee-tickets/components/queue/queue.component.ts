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
  pagesTotalRows: number;

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
        statusIds: [1, 2]
      }
      if (this.param.queueType === 'missed') {
        data['statusIds'] = [4];
      }

      this.updateQueue(data);
    });
  }

  updateQueue(data = {statusIds: [1], pageSize: 100}) {
    this._employeeService.getEmployeeDailyTickets(data)
    .subscribe(res => {
      this.ticketQueue = res['data'];
      this.pagesTotalRows = res['pagesTotalRows'];
      const servingTicketId = this.ticketQueue.findIndex(ticket => ticket.statusId === 2);

      if (servingTicketId !== -1) {
        this.queueActivated = true;
        this.ticketQueue.splice(0, 0, this.ticketQueue.splice(servingTicketId, 1)[0]);
      }
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
    .subscribe({complete: this.updateQueue.bind(this)});
  }

}
