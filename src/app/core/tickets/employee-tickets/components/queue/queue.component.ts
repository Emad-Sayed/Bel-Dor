import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { asyncScheduler } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { SpinnerDirective } from 'src/app/shared/components/spinner/directive/spinner.directive';
import { TranslationsService } from 'src/app/shared/services/translations.service';
import { EmployeeService } from '../../services/employee.service';
import { RealTimeCenterService } from 'src/app/shared/services/real-time-center.service';
import { UserService } from 'src/app/shared/services/user.service';
import { slideBottomAnimation } from "../../../../../shared/animations/animations";

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss'],
  animations: [
    slideBottomAnimation
  ]
})
export class QueueComponent implements OnInit {
  @ViewChild(SpinnerDirective, { static: true, read: SpinnerDirective }) spinnerPlaceholder: SpinnerDirective;

  ticketQueue = [];
  pagesTotalRows: number;
  servingTicket: any;
  param: Params;

  queueActivated = false;

  ticketSearch: FormGroup;

  ticketInfoForm: FormGroup = new FormGroup({
    ticketInfoControl: new FormControl('')
  });;
  provideInfo = false;

  constructor(
    private realTimeCenter: RealTimeCenterService,
    private actRoute: ActivatedRoute,
    public _translationService: TranslationsService,
    private _employeeService: EmployeeService,
    private router: Router,
    private userService: UserService

  ) {
    this.realTimeCenter.notifier.subscribe(
      (data: any) => {
        if (userService.getLoggedUserId() != data['updatedById'])
          this.ticketQueue = this.ticketQueue.filter(t => t.id != data.id);
      }
    )
  }

  ngOnInit(): void {
    this.actRoute.queryParams
    .subscribe(param => {
      this.spinnerPlaceholder.sendViewContainer();
      this.param = param;
      const data = {
        statusIds: [1]
      }
      if (this.param.queueType === 'missed') {
        this.ticketQueue = [];

        this.ticketSearch = new FormGroup({
          ticketNumber: new FormControl('', Validators.required)
        });

        this.ticketSearch.get('ticketNumber').valueChanges
        .pipe(debounceTime(700, asyncScheduler))
        .subscribe(val => {
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

  updateQueue(data = { statusIds: [1] }) {
    /** 
     * check if there is a serving ticket @if exist
     *  make queue activated and insert serving ticket in the first 
     * */

    const servingTicket = async () => {
      this._employeeService.getServingTicket()
        .subscribe(res => {
          if (res['data']) {
            this.queueActivated = true;
            this.servingTicket = res['data'][0];
          }
        });
      await this.servingTicket;
    }

    servingTicket().then(() => {
      this._employeeService.getEmployeeDailyTickets(data)
        .subscribe(res => {
          this.pagesTotalRows = res['pagesTotalRows'];

          if (this.servingTicket) {
            this.ticketQueue = [this.servingTicket, ...res['data']];
            this.pagesTotalRows += 1;
            return;
          }
          this.ticketQueue = res['data'];
          this.addMeToMyRealTimeGroups();

          this.provideInfo = false;
          this.ticketInfoForm.reset();
        });
    });
  }

  nextInQueue() {
    this.queueActivated = true;

    this._employeeService.serveTicket()
      .subscribe();
  }

  removeFromQueue() {

    const infoValue = this.ticketInfoForm.get('ticketInfoControl').value;

    if (this.provideInfo) {
      this.queueActivated = false;
      this._employeeService.closeServedTicket({Information: infoValue})
      .subscribe({complete: this.updateQueue.bind(this)});
    }
    
    this.provideInfo = true;
  }

  setAsMissed() {
    this.queueActivated = false;

    this._employeeService.setTicketAsMissed()
      .subscribe({ complete: this.updateQueue.bind(this) });
  }

  serveMissedTicket(id: string) {
    this._employeeService.serveMissedTicket(id)
      .subscribe(() => {
        this.router.navigateByUrl('/queue');
      });
  }
  addMeToMyRealTimeGroups() {
    this.realTimeCenter.addMeToGroup("E_NewServe" + this.userService.getEmployeeBranchDepartement());
  }
}
