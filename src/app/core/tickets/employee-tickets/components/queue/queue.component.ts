import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { asyncScheduler } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
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

  ticketSearch: FormGroup;

  constructor(
    private actRoute: ActivatedRoute,
    public _translationService: TranslationsService,
    private _employeeService: EmployeeService,
    private router: Router
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
        this.ticketQueue = [];

        this.ticketSearch = new FormGroup({
          ticketNumber: new FormControl('', Validators.required)
        });

        this.ticketSearch.get('ticketNumber').valueChanges
        .pipe(debounceTime(1000, asyncScheduler))
        .subscribe(val => {
          console.log(val);
          if (val) {
            data['statusIds'] = [4];
            data['ticketNumbers'] = [val];
            this.updateQueue(data);
          }
        });
        return;
      }

      this.updateQueue(data);
    });
  }

  updateQueue(data = {statusIds: [1]}) {
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

  setAsMissed() {
    this.queueActivated = false;

    this._employeeService.setTicketAsMissed()
    .subscribe({complete: this.updateQueue.bind(this)});
  }

  serveMissedTicket(id: string) {
    this._employeeService.serveMissedTicket(id)
    .subscribe(() => {
      this.router.navigateByUrl('/queue');
    });
  }

}
